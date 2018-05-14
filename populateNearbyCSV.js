const fs = require('fs');

const { generateNearbyCSV } = require('./populateData.js');

generateNearbyCSV(10000000, fs.createWriteStream('nearby10.csv'), 'utf8', () => {
  console.log('done');
});
