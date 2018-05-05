const generateDataJSON = require('../populateData.js').generateDataJSON;

const generateNearbyCSV = require('../populateData.js').generateNearbyCSV;

const generateRestaurantsCSV = require('../populateData.js').generateRestaurantsCSV;

const generateEntry = require('../populateData.js').generateEntry;

var csvparse = require('csv-parse')

const fs = require('fs');

const path = require('path')

describe('generates a data entry', () => {
  let entry;
  beforeAll(() => {
    entry = generateEntry(0, 100);
  });
  test('should have property place_id', () => {
    expect(entry.place_id).toBe(0);
  });
  test('should have property name', () => {
    expect(typeof entry.name).toBe('string');
  });
  test('should have property google_rating', () => {
    expect((entry.google_rating) <= 5 && (entry.google_rating >= 0)).toBe(true);
  });
  test('should have property zagat_rating', () => {
    expect((entry.zagat_rating <= 5) && (entry.google_rating >= 0)).toBe(true);
  });
  test('should have property photos equal to array', () => {
    expect(Array.isArray(entry.photos)).toBe(true);
  });
  test('each photo item in photo should be between 0 and 100', () => {
    let correctId = true;
    entry.photos.forEach((item) => {
      if ((item < 0) && (item > 100)) {
        correctId = false;
      }
    });
    expect(correctId).toBe(true);
  });
  test('should have property neighborhood', () => {
    expect(typeof entry.neighborhood).toBe('string');
  });
  test('should have property price_level', () => {
    expect((entry.price_level >= 1) && (entry.price_level <= 4)).toBe(true);
  });
  test('should have property type', () => {
    expect(typeof entry.types).toBe('string');
  });
});

describe('generates data entries in a JSON file', () => {
  let data;
  beforeAll((done) => {
    generateDataJSON(100, fs.createWriteStream('./tests/generatedData.json'), 'utf8', () => {
      done();
    });
  });
  test('should write 100 entries', () => {
    data = require('./generatedData.json');
    expect(data.length).toBe(100);
  });
});

describe('generates nearby data restaurants in a CSV file', () => {
  let csvData;
  let firstEntry;
  beforeAll((done) => {
    generateRestaurantsCSV(100, fs.createWriteStream('./tests/restaurants.csv'), 'utf8', () => {
      done();
    });
  });
  beforeAll((done) => {
    fs.readFile(path.join(__dirname, './restaurants.csv'), 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        csvparse(data, (err, csv) => {
          csvData = csv;
          firstEntry = csvData[0]
          done();
        })
      }
    })
  });
  test('should write 100 entries', () => {
    expect(csvData.length).toBe(100);
  });
  test('each entry should have 8 columns', () => {
    expect(firstEntry.length).toBe(8);
  });
  test('entry should be place_id', () => {
    expect(parseInt(firstEntry[0])).toBe(99);
  });
  test('entry should be name', () => {
    expect(typeof firstEntry[1]).toBe('string');
  });
  test('entry should be google_rating', () => {
    expect((firstEntry[2] >= 0) && (firstEntry[2] <= 5)).toBe(true);
  });
  test('entry should be zagat_rating', () => {
    expect((firstEntry[3] >= 0) && (firstEntry[3] <= 5)).toBe(true);
  });
  test('entry should be photos', () => {
    expect(JSON.parse(firstEntry[4]).length).toBe(5);
  });
  test('entry should be neighborhood', () => {
    expect(typeof firstEntry[5]).toBe('string');
  });
  test('entry should be price_level', () => {
    expect((firstEntry[6] >= 1) && (firstEntry[6] <= 4)).toBe(true);
  });
  test('entry should be types', () => {
    expect(typeof firstEntry[7]).toBe('string');
  });
});

describe('generates nearby data restaurants in a CSV file', () => {
  let csvData;
  let firstEntry;
  beforeAll((done) => {
    generateNearbyCSV(100, fs.createWriteStream('./tests/nearby.csv'), 'utf8', () => {
      done();
    });
  });
  beforeEach((done) => {
    fs.readFile(path.join(__dirname, './nearby.csv'), 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        csvparse(data, (err, csv) => {
          csvData = csv;
          firstEntry = csvData[0]
          // console.log(firstEntry)
          done();
        })
      }
    })
  });
  test('should write 100 entries', () => {
    expect(csvData.length).toBe(100);
  });
  test('each entry should have 2 columns', () => {
    expect(firstEntry.length).toBe(7);
  });
  test('entry should be place_id', () => {
    expect(parseInt(firstEntry[0])).toBe(99);
  });
});