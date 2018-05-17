const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const query = require('./psqlQuery.js');
const { renderToString } = require('react-dom/server');
const App = require('../../client/dist/bundle.js').default;

const app = express();

const React = require('react');
const markup = renderToString(React.createElement(App));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/restaurants', express.static(path.join(__dirname, '/../../client/dist')));

app.get('/api/restaurants/:id/nearby', query);

app.get('/loaderio-6982d222b8d1cd8a25ba56448c7b375d', (req, res) => {
  res.send('loaderio-6982d222b8d1cd8a25ba56448c7b375d');
})

app.get('/restaurants/:id', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Apateez Recommendations</title>
        <link rel="icon" href="https://s3-us-west-1.amazonaws.com/apateezassets/apateez-logo-small-red.jpeg" type="image/x-icon">
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
        <link rel="stylesheet" href="http://52.53.193.160:3004/restaurants/styles.css">
      </head>
      <body>
        <div id="nearby-app">${markup}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `);
});

module.exports = app;
