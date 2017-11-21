require('jquery');
require('angular'); // AngularJS include.
require('angular-animate');
require('angular-route');

require('./src/app'); // Main AngularJS landing point.
require('./src/app/home/home');
require('./src/services/cart-service');
require('./src/services/user-service');
require('./src/app/home/history');
require('./src/app/client/client');

// ANGULAR BUSINESS LOGIC FILES
require('./src/directives/navbar/navbar');