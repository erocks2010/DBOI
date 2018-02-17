/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

// if you want to use es6, you can do something like
//     require('./es6/myEs6code')
// here to load the myEs6code.js file, and it will be automatically transpiled.

// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp";
const headers = { priority: 9, id: 'sub - 0', destination: '/fx/prices' };
const client = Stomp.client(url);
let currenciesInOrder = [];
let counter = 1;

const helper = require('./helper');

client.debug = function (msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {
  var sub = client.subscribe('/fx/prices', function (data) {
    helper.initiateUpdateTable(currenciesInOrder,data);
  }, headers);
}

client.connect({}, connectCallback, function (error) {
  alert(error.headers.message)
})




