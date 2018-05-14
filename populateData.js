const faker = require('faker');

const _ = require('underscore');

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

const generateNearby = (numEnt) => {
  let nearbyArr = [];
  for (let i = 0; i < 15; i += 1) {
    const randomIndex = generateRandomInt(1, numEnt);
    nearbyArr.push(randomIndex);
  }
  nearbyArr = _.uniq(nearbyArr);
  if (nearbyArr.length < 6) {
    for (let i = 0; i < 15; i += 1) {
      const randomIndex = generateRandomInt(1, numEnt);
      nearbyArr.push(randomIndex);
    }
    nearbyArr = _.uniq(nearbyArr);
  }
  nearbyArr = nearbyArr.slice(0, 6);
  return nearbyArr;
};

const generateEntry = (i, numEnt) => {
  const photosArr = generatePhotos();
  const nearby = generateNearby(numEnt);
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

const generateRestaurantEntry = (i) => {
  const photosArr = generatePhotos();
  const business = {
    place_id: i,
    name: faker.fake('{{name.lastName}}'),
    google_rating: round(randomNum(0, 5), 1),
    zagat_rating: round(randomNum(0, 5), 1),
    photos: photosArr,
    neighborhood: faker.fake('{{address.city}}'),
    price_level: round(randomNum(1, 4), 0),
    types: faker.fake('{{name.lastName}}'),
  };
  return business;
};

const generateDataJSON = (numEnt, writer, encoding, callback) => {
  let i = numEnt;
  writer.write('[', encoding);
  function write() {
    let ok = true;
    do {
      i -= 1;
      let stringData = JSON.stringify(generateEntry(i, numEnt));
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

const generateRestaurantsCSV = (numEnt, writer, encoding, callback) => {
  let i = numEnt;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const restaurant = generateRestaurantEntry(i);
      const line = `${restaurant.place_id},${restaurant.name},${restaurant.google_rating},${restaurant.zagat_rating},"[${(restaurant.photos)}]",${restaurant.neighborhood},${restaurant.price_level},${restaurant.types}\n`;
      if (i === 0) {
        writer.write(line, encoding, callback);
      } else {
        ok = writer.write(line, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

const generateNearbyCSV = (numEnt, writer, encoding, callback) => {
  let i = numEnt;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const nearby = generateNearby(numEnt);
      const line = `${i},${nearby[0]},${nearby[1]},${nearby[2]},${nearby[3]},${nearby[4]},${nearby[5]}\n`;
      if (i === 0) {
        writer.write(line, encoding, callback);
      } else {
        ok = writer.write(line, encoding);
      }
    } while (i > numEnt - 1000000 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

module.exports.generateDataJSON = generateDataJSON;
module.exports.generateNearbyCSV = generateNearbyCSV;
module.exports.generateRestaurantsCSV = generateRestaurantsCSV;
module.exports.generateEntry = generateEntry;
