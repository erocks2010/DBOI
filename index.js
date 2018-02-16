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
/**
 * client.hearbeat.incoming and outgoing.I think this has to do with timings mentioned in question
 */
client.debug = function (msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {
  console.log('Step 1 :: Connection established with Stomp Server');
  var sub = client.subscribe('/fx/prices', function (data) {
    let currencyInfo = JSON.parse(data.body);
    console.log(currenciesInOrder);
    if (currenciesInOrder.indexOf(currencyInfo.name) == -1) {
      currenciesInOrder.push(currencyInfo.name);
      insertRowInTable(currenciesInOrder.length, currencyInfo);
    }
    // console.log(Date.now())
    // if (refreshAfter30Seconds()) {
    //   console.log('pass data to view')
    // }
    // else {
    //   console.log('do not pass data to view');
    // }
    console.log(refreshAfter30Seconds())

  }, headers);
}

client.connect({}, connectCallback, function (error) {
  console.log('Error encountered .Something went wrong with Stomp connection');
  alert(error.headers.message)
})

function refreshAfter30Seconds() {
  if (counter == 10) {
    console.log('To')
    counter = 1;
    return counter;
  }
  else {
    counter++;
    return counter;
  }
}

function insertRowInTable(rowIndex, currencyInfo) {
  let table = document.getElementById('marketprice-container');
  let row = table.insertRow(rowIndex);
  for (let i = 0; i < 7; i++) {
    let cell = row.insertCell(i);
    cell.innerHTML = currencyInfo[Object.keys(currencyInfo)[i]];
  }
}

function updateRowInTable(){
  
}


const exampleSparkline = document.getElementById('example-sparkline')
Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3])