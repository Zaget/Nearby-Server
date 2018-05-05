const fs = require('fs');

const { generateRestaurantsCSV } = require('./populateData.js');

generateRestaurantsCSV(10000000, fs.createWriteStream('restaurants.csv'), 'utf8', () => {
  console.log('done');
});
