const fs = require('fs');

const { generateDataJSON } = require('./populateData.js');

generateDataJSON(10000000, fs.createWriteStream('generatedData.json'), 'utf8', () => {
  console.log('done');
});
