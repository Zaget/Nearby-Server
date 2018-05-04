const fs = require('fs');

const generateData = require('./populateData.js').generateData;

generateData(100, fs.createWriteStream('generatedData3.json'), 'utf8', () => {
  console.log('done');
});