import React from 'react';
import { hydrate } from 'react-dom';
import App from '../src/app.jsx';
import $ from 'jquery';

export default App;

if (typeof window !== 'undefined') {
  $.ajax({
    url: 'http://13.57.205.164:3004/api/restaurants/'+ 29358 +'/nearby',
    method: 'GET',
    success: (data) => {
      hydrate(React.createElement(App, ), document.getElementById('nearby-app'));  
    },
    error: (err) => {
      console.log('GET Error: ', err);
    },
  });
}
