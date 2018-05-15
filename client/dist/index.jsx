import React from 'react';
import { hydrate } from 'react-dom';
import App from '../src/app.jsx';
import axios from 'axios';

export default App;

if (typeof window !== 'undefined') {
  axios.get(`http://13.57.205.164:3004/api/restaurants/${window.location.href.split('/')[4]}/nearby`)
  .then(data => {
    let info = {currentRestaurant:data[0], nearbyRestaurants:data[1], id:window.location.href.split('/')[4]}
    hydrate(React.createElement(App, info), document.getElementById('nearby-app'));
  }
}
