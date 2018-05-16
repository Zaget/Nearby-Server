import React from 'react';
import { hydrate } from 'react-dom';
import App from '../src/app.jsx';

export default App;

if (typeof window !== 'undefined') {
  hydrate(React.createElement(App, {currentRestaurant:{}, nearbyRestaurants:[{}, {}, {}, {}, {}, {}]}), document.getElementById('nearby-app'));
}
