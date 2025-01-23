const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

function isEcoFriendly(product) {
  if (!product.name) return false;
  
  const name = product.name.toLowerCase();
  const category = (product.sub_category || '').toLowerCase();

  // Material based checks - broad matching
  const ecoMaterials = [
    'cotton', 'bamboo', 'jute', 'wood', 'natural',
    'steel', 'copper', 'glass', 'metal', 'clay'
  ];

  // Production method - broad matching
  const ecoProduction = [
    'handmade', 'organic', 'recycled', 'eco',
    'traditional', 'pure', 'natural'
  ];

  // Sustainable features - broad matching
  const ecoFeatures = [
    'rechargeable', 'portable', 'reusable',
    'multi-use', 'durable', 'long lasting'
  ];

  // Category specific - broad matching
  const categoryFilters = {
    'furnishing': ['cotton', 'natural', 'traditional'],
    'personal care': ['steel', 'natural', 'rechargeable'],
    'household': ['steel', 'storage', 'container'],
    'toy': ['wooden', 'educational', 'learning'],
    'snack': ['healthy', 'natural', 'dry fruits']
  };

  // Check matches
  const hasSustainableMaterial = ecoMaterials.some(mat => name.includes(mat));
  const hasEcoProduction = ecoProduction.some(method => name.includes(method));
  const hasEcoFeature = ecoFeatures.some(feature => name.includes(feature));

  const categoryKeywords = Object.keys(categoryFilters).find(key => category.includes(key));
  const hasCategoryMatch = categoryKeywords ? 
    categoryFilters[categoryKeywords].some(keyword => name.includes(keyword)) : 
    false;

  // Need only 1 match to be considered eco-friendly
  return [hasSustainableMaterial, hasEcoProduction, hasEcoFeature, hasCategoryMatch]
    .filter(Boolean).length >= 2;
}

// Setup directories
const inputDir = './product-data';
const outputDir = './output';
const ecoFriendlyProducts = [];

// Create output directory if needed
if (!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir);
}

// Process files
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const csvFiles = files.filter(file => file.endsWith('.csv'));
  let processedFiles = 0;

  csvFiles.forEach(file => {
    fs.createReadStream(path.join(inputDir, file))
      .pipe(csv())
      .on('data', (row) => {
        if (isEcoFriendly(row)) {
          row.source_file = file;
          ecoFriendlyProducts.push(row);
        }
      })
      .on('end', () => {
        processedFiles++;
        console.log(`Processed ${file} - Found ${ecoFriendlyProducts.length} eco products so far`);
        
        if (processedFiles === csvFiles.length) {
          fs.writeFileSync(
            path.join(outputDir, 'eco_friendly_products.json'),
            JSON.stringify(ecoFriendlyProducts, null, 2)
          );
          console.log(`\nTotal eco-friendly products found: ${ecoFriendlyProducts.length}`);
        }
      })
      .on('error', (error) => {
        console.error(`Error processing ${file}:`, error);
      });
  });
});