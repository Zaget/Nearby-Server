const db = require('../db/mongodb.js');
const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost/apateez-nearby';

mongoose.connect(mongoUrl);

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

const mongoQuery = (req, res) => {
  console.log('using mongo')
  const placeId = parseInt(req.params.id, 10);
  const results = [];
  db.findOne(placeId, (err, data) => {
    if (err) {
      res.status(500);
      console.log(err);
    } else {
      const nearbyArr = data[0].nearby;
      results.push(data[0]);
      db.findMany(nearbyArr, (error, nearby) => {
        if (err) {
          res.status(500);
          console.log(error);
        } else {
          results.push(nearby);
          res.send(results);
        }
      });
    }
  });
};

module.exports = mongoQuery;
