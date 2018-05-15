const fs = require('fs');

const { generateNearbyCSV } = require('./populateData.js');

generateNearbyCSV(3000000, fs.createWriteStream('nearby3.csv'), 'utf8', () => {
  console.log('done');
});
