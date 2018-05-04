const generateData = require('../populateData.js').generateData;

const generateEntry = require('../populateData.js').generateEntry;

const fs = require('fs');

let data;

describe('generates a data entry', () => {
  let entry;
  beforeEach(() => {
    entry = generateEntry(0);
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

describe('generates a data entry', () => {
  beforeEach(() => {
    generateData(100, fs.createWriteStream('./tests/generatedData3.json'), 'utf8', () => {
      console.log('done');
    });
  });
  data = require('./generatedData3.json');
  test('should write 100 entries', () => {
    expect(data.length).toBe(100);
  });
});
