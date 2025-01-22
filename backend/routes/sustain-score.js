const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/api/sustain-score', async (req, res) => {
    const { products } = req.body;
    const API_KEY = 'AIzaSyBXu68Np4CFGjFK50NpsVrjuMdjBInysVQ';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

    const sanitizedProducts = products.map(product => ({
        ...product,
        name: product.name.replace(/Opens in a new tab/g, '').trim(),
    }));

    const prompt = `
    Give me sustainability score for the following products out of 100 (only the scores as the response):
    ${JSON.stringify(sanitizedProducts.map(p => p.name))}
    `;

    try {
        const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
            contents: [{
                parts: [{
                    text: prompt,
                }]
            }]
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });


        const rawScores = response.data.candidates[0]?.content?.parts[0]?.text || '';
        console.log('Raw Scores:', rawScores);

       
        const scores = rawScores
            .split('\n') 
            .map(score => score.trim()) 
            .filter(score => !isNaN(parseInt(score, 10))); 

        // Attach scores to the sanitized products
        const scoredProducts = sanitizedProducts.map((product, index) => ({
            ...product,
            score: scores[index] || 'N/A', 
        }));

        console.log('Scored Products:', scoredProducts);
        res.status(200).json({ scoredProducts });

    } catch (error) {
        console.error('Error fetching scores:', error.message);
        res.status(500).json({ error: 'Failed to fetch sustainability scores' });
    }
});

module.exports = router;
