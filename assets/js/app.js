/* global document */
/* global window */

import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import ChipContainer from './ChipContainer';
import Application from './app/Application';

import TestComponent from './react/TestComponent';

// import greet from './greet';
import '../css/app.scss';

console.log('Webpack Encore loaded...');

/** JQUERTY TEST */

// $(document).ready(function() {
//   $('body').prepend('<h1>' + greet('Patrik') + '</h1>');
// });

ReactDOM.render(<TestComponent />, document.getElementById('root'));

/** jQuery components init */

const container = new ChipContainer();
const application = new Application(container);
application.processQueue(window.chip.queue);
