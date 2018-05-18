const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const query = require('./psqlQuery.js');
const { renderToString } = require('react-dom/server');
const App = require('../../client/dist/bundle.js').default;
const cors = require('cors');
const React = require('react');

const app = express();

const fillerData = {name:'', google_rating: 0, zagat_rating: 0, photos:[], neighborhood:'', price_level:1, types: ''};

const info = {currentRestaurant:fillerData, nearbyRestaurants:[fillerData, fillerData, fillerData, fillerData, fillerData, fillerData]}; 

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/restaurants', express.static(path.join(__dirname, '/../../client/dist')));

app.get('/api/restaurants/:id/nearby', query);

app.get('/loaderio-84648857ff0fc5a3011e32bc5bd1b98f', (req, res) => {
  res.send('loaderio-84648857ff0fc5a3011e32bc5bd1b98f');
})

app.get('/restaurants/:id', (req, res) => {
  const markup = renderToString(React.createElement(App, info));
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Apateez Recommendations</title>
        <link rel="icon" href="https://s3-us-west-1.amazonaws.com/apateezassets/apateez-logo-small-red.jpeg" type="image/x-icon">
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <div id="nearby-app">${markup}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `);
});

module.exports = app;
