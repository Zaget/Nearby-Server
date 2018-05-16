import React from 'react';
import { hydrate } from 'react-dom';
import App from '../src/app.jsx';

export default App;

if (typeof window !== 'undefined') {
  const fillerData = {name:'', google_rating: 0, zagat_rating: 0, photos:[], neighborhood:'', price_level:1, types: ''}
  hydrate(React.createElement(App, {currentRestaurant:fillerData, nearbyRestaurants:[fillerData, fillerData, fillerData, fillerData, fillerData, fillerData]}), document.getElementById('nearby-app'));
}
