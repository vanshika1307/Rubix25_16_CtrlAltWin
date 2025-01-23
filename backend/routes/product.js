const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

// Function to clean Amazon image URLs
const cleanImageUrl = (url) => {
  if (!url) return null;
  // Remove problematic segments from Amazon URLs
  return url.replace('/IMAGERENDERING_521856-T1', '')
            .replace('/_AC_UL320_', '')
            .replace(/\?.*$/, ''); // Remove query parameters
};

router.get('/', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../output/eco_friendly_products.json');
    const rawData = await fs.readFile(filePath, 'utf8');
    let products = JSON.parse(rawData);
    
    // Clean and validate products
    products = products
      .filter(product => product.image && product.name) // Filter out products without images
      .map(product => ({
        ...product,
        image: cleanImageUrl(product.image)
      }))
      .slice(0, 50); // Limit to 50 products for better performance

    res.setHeader('Content-Type', 'application/json');
    res.json(products);
  } catch (error) {
    console.error('Error reading products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;