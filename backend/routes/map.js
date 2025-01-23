// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// router.get('/api/map', async(req,res) => {
//     const {lat, lng} = req.query;

//     // if(!lat || !lng){
//     //     return res.status(400).json({error: 'Latitude and Longitude are required.'});
//     // }

//     try {
//         const response = await axios.get(
//             `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=19.223493,73.162685&radius=45000&keyword=zero+waste+store&key=${process.env.GOOGLE_MAP}`
//         );
        
//         const locations = response.data.results.map((place) => ({
//             name: place.name,
//             location: place.geometry.location,
//             address: place.vicinity,
//             rating: place.rating || 'No rating',
//         }));
//         console.log(locations);
//         res.json(locations);
//     } catch (error) {
//         console.error('Error fetching locations:', error.message);
//         res.status(500).json({ error: 'Failed to fetch nearby locations.' });
//     }
// })

// module.exports = router

const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/api/map', async (req, res) => {
    const { lat, lng, radius = 45000, keywords = '' } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and Longitude are required.' });
    }

    const googleMapsApiKey = process.env.GOOGLE_MAP;
    if (!googleMapsApiKey) {
        return res.status(500).json({ error: 'Google Maps API key is not configured.' });
    }

    const defaultKeywords = ['zero waste store', 'sustainable store', 'eco-friendly market'];
    const searchKeywords = keywords ? keywords.split(',') : defaultKeywords;

    try {
        // Generate requests for all keywords
        const requests = searchKeywords.map((keyword) =>
            axios.get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${encodeURIComponent(keyword)}&key=${googleMapsApiKey}`
            )
        );

        // Await all API responses
        const responses = await Promise.all(requests);

        // Flatten results and map to required format
        const allLocations = await Promise.all(
            responses.flatMap(async (response) => {
                const placesWithImages = await Promise.all(
                    response.data.results.map(async (place) => {
                        let imageUrl = null;
                        if (place.photos && place.photos.length > 0) {
                            // Make a request to fetch the photo using the photo reference
                            const photoReference = place.photos[0].photo_reference;
                            imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${googleMapsApiKey}`;
                        }

                        return {
                            name: place.name,
                            location: place.geometry.location,
                            address: place.vicinity,
                            rating: place.rating || 'No rating',
                            types: place.types?.join(', ') || 'No types',
                            image: imageUrl,  // Add image URL to the location data
                        };
                    })
                );
                return placesWithImages;
            })
        );

        // Flatten the array of locations
        const uniqueLocations = Object.values(
            allLocations.flat().reduce((acc, loc) => {
                acc[loc.name] = loc; // Use the place name as the key
                return acc;
            }, {})
        );

        res.json(uniqueLocations);
    } catch (error) {
        console.error('Error fetching locations:', error.message, error.response?.data || '');
        res.status(500).json({ error: 'Failed to fetch nearby locations.' });
    }
});

module.exports = router;
