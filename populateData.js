const faker = require('faker');

const _ = require('underscore');

let numEntries;

const round = (number, precision) => {
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
};

const randomNum = (min, max) => ((Math.random() * (max - min)) + min);

const generateRandomInt = (min, max) => (Math.floor(randomNum(min, max)));

const generatePhotos = () => {
  const photosArr = [];
  for (let i = 0; i < 5; i += 1) {
    const randomIndex = generateRandomInt(0, 100);
    photosArr.push(randomIndex);
  }
  return photosArr;
};

const generateNearby = () => {
  let nearbyArr = [];
  for (let i = 0; i < 10; i += 1) {
    const randomIndex = generateRandomInt(1, numEntries);
    nearbyArr.push(randomIndex);
  }
  nearbyArr = _.uniq(nearbyArr);
  nearbyArr = nearbyArr.slice(0, 6);
  return nearbyArr;
};

const generateEntry = (i) => {
  const photosArr = generatePhotos();
  const nearby = generateNearby();
  const business = {
    place_id: i,
    name: faker.fake('{{name.lastName}}'),
    google_rating: round(randomNum(0, 5), 1),
    zagat_rating: round(randomNum(0, 5), 1),
    photos: photosArr,
    neighborhood: faker.fake('{{address.city}}'),
    price_level: round(randomNum(1, 4), 0),
    types: faker.fake('{{name.lastName}}'),
    nearby,
  };
  return business;
};

const generateData = (numEnt, writer, encoding, callback) => {
  numEntries = numEnt;
  let i = numEntries;
  writer.write('[', encoding);
  function write() {
    let ok = true;
    do {
      i -= 1;
      let stringData = JSON.stringify(generateEntry(i));
      if (i === 0) {
        stringData += ']';
        writer.write(stringData, encoding, callback);
      } else {
        ok = writer.write(`${stringData},`, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

module.exports.generateData = generateData;
module.exports.generateEntry = generateEntry;
