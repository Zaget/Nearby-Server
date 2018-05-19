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

app.get('/loaderio-84648857ff0fc5a3011e32bc5bd1b98f', (req, res) => {
  res.send('loaderio-84648857ff0fc5a3011e32bc5bd1b98f');
});

app.get('/loaderio-e6df56c0defeaa0ae25c31e7837f4457', (req, res) => {
  res.send('loaderio-e6df56c0defeaa0ae25c31e7837f4457');
});

app.get('/loaderio-5ffdd3c75207ad296d4d88f7fbcb92ca', (req, res) => {
  res.send('loaderio-5ffdd3c75207ad296d4d88f7fbcb92ca');
});

app.get('/loaderio-44e46f07198225a48ab48ed5165ea832', (req, res) => {
  res.send('loaderio-44e46f07198225a48ab48ed5165ea832');
});

app.get('/loaderio-23424ee6559aac53337e3d93500838f6', (req, res) => {
  res.send('loaderio-23424ee6559aac53337e3d93500838f6');
});

app.get('/loaderio-09e9734e71fc5f4cd23b0acdd6142942', (req, res) => {
  res.send('loaderio-09e9734e71fc5f4cd23b0acdd6142942');
});

app.get('/restaurants/:id', (req, res) => {
  const markup = renderToString(React.createElement(App, info));
  res.send(html(markup));
});

module.exports = app;
