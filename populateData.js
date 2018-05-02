const faker = require('faker');
const fs = require('fs');
const _ = require('underscore');

var data = [];

var round = (number, precision) => {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

var randomNum = (min, max) => {
  return Math.random() * (max - min) + min;
}

var generatePhotos = () => { 
  var numberOfPhotos = Math.floor(randomNum(3, 10));
  var photosArr = [];
  for (var i = 0; i < numberOfPhotos; i++) {
    var randomIndex = Math.floor(randomNum(1, 100));
    photosArr.push(randomIndex)
  }
  return photosArr;
}

var generateNearby = () => {
  var nearbyArr = [];
  for (var i = 0; i < 20; i++) {
    var randomIndex = Math.floor(randomNum(1, 10000000));
    nearbyArr.push(randomIndex)
  }
  var nearbyArr = _.uniq(nearbyArr, );
  var nearbyArr = nearbyArr.slice(0, 6)
  return nearbyArr;
}

var generateFakeData = () => {
  for (var i = 9000000; i < 10000000; i++) {
    var photosArr = generatePhotos();
    var nearby = generateNearby();
    var business = {
      place_id: i, 
      name:faker.fake("{{name.lastName}}"),
      google_rating: round(randomNum(0, 5), 1),
      zagat_rating: round(randomNum(0, 5), 1),
      photos: photosArr,
      neighborhood: faker.fake("{{address.city}}"),
      price_level: round(randomNum(1, 4), 0),
      types: faker.fake("{{name.lastName}}"),
      nearby: nearby
    }
    data.push(business);
    if (i === 10000000 - 1) {
      fs.appendFileSync('generatedData.json', JSON.stringify(business) + ']', (err) => {
          if (err) {
              throw err;
          } else {
              console.log('File Saved');
          }
      });
    } else {
      fs.appendFileSync('generatedData.json', JSON.stringify(business) + ',', (err) => {
          if (err) {
              throw err;
          } else {
              console.log('File Save Ongoing');
          }
      });
    }
  }
}

generateFakeData();
console.log(data.length);
