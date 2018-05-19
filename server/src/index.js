const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const query = require('./psqlQuery.js');
const { renderToString } = require('react-dom/server');
const App = require('../../client/dist/bundle.js').default;
const React = require('react');
const html = require('./template.js')

const app = express();

const fillerData = {
  name: '', google_rating: 0, zagat_rating: 0, photos: [], neighborhood: '', price_level: 1, types: '',
};

const info = {
  currentRestaurant: fillerData,
  nearbyRestaurants: [fillerData, fillerData, fillerData, fillerData, fillerData, fillerData],
};

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/restaurants', express.static(path.join(__dirname, '/../../client/dist')));

app.get('/api/restaurants/:id/nearby', query);

app.get('/restaurants/:id', (req, res) => {
  const markup = renderToString(React.createElement(App, info));
  res.send(html(markup));
});

module.exports = app;
