import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';

import TestComponent from './components/TestComponent';

// import greet from './greet';
import '../css/app.scss';

console.log('Webpack Encore loaded...');

/** JQUERTY TEST */

// $(document).ready(function() {
//   $('body').prepend('<h1>' + greet('Patrik') + '</h1>');
// });

ReactDOM.render(<TestComponent />, document.getElementById('root'));
