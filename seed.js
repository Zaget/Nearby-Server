var AllData = require('./195-Zagat-AllData.json')
var data = require('./generatedData.json')
var db = require('./db/mongodb.js');
var mongoose = require('mongoose');
var faker = require('faker');

var mongoUrlDocker = 'mongodb://database/apateez-nearby';
var mongoUrl = 'mongodb://localhost/apateez-nearby';

mongoose.connect(mongoUrl);
// mongoose.connect(mongoUrlDocker);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open')
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
  mongoose.connect(mongoUrlDocker)
});

var seedDb = (array) => {
  let counter = 0
  console.log(array.length);
  var createList = () => {
    // var photoArr = array[counter].result.photos.map((photo) => {
    //   return photo.photo_reference
    // });

    // // 6 random restaurants for near by suggestion of each restaurant;
    // var nearbyArr = [];
    // for (var i = 0; i < 6; i ++) {
    //   nearbyArr.push(array[Math.floor(Math.random()*100)].result.place_id)
    // }

    var obj = {
      name: array[counter].name,
      place_id: array[counter].place_id,
      google_rating: array[counter].google_rating,
      zagat_rating: array[counter].zagat_rating,
      photos: array[counter].photos,
      neighborhood: array[counter].neighborhood,
      price_level: array[counter].price_level,
      types: array[counter].types,
      nearby: array[counter].nearby
    }

    // console.log('Restaurant OBJ: ', obj)

    db.insertOne(obj, (err, content) => {
      if (err) {
        console.log("ERROR IS", err)
      } else {
        // console.log('CONTENT is ', content)
        counter++;
        if (counter < 1000) {
          createList()
        } else {
          console.log('Saved 100 Data into DB!')
          mongoose.disconnect();
        }
      }
    })
  }

  db.clearDb(() => createList())
}

seedDb(data);