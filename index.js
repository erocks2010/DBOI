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

client.debug = function (msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {
  var sub = client.subscribe('/fx/prices', function (data) {
    let currentCurrenyInfo = JSON.parse(data.body);
    if (currenciesInOrder.map((currencyInfo) => currencyInfo[0]).indexOf(currentCurrenyInfo.name) == -1) {
      let _currentCurrencyInfo = objectToArray(currentCurrenyInfo);
      currenciesInOrder.push(_currentCurrencyInfo);
      sortTable();
      drawTable();
    }
    else {
      sortTable(currentCurrenyInfo);
      drawTable();
    }
  }, headers);
}

client.connect({}, connectCallback, function (error) {
  alert(error.headers.message)
})

function drawTable() {
  let table = document.getElementById('marketprice-container');
  for (let i = 1; i <= currenciesInOrder.length; i++) {
    let row = table.getElementsByTagName("tr")[i];
    if (row == undefined) row = table.insertRow(i);
    for (let j = 0; j < 8; j++) {
      let cell = row.getElementsByTagName("td")[j];
      if (cell == undefined) cell = row.insertCell(j);
      if (j == 7) {
        cell.innerHTML = '';
        let sparkElement = document.createElement('span');
        let sparkline = new Sparkline(sparkElement,
          {
            lineColor: "#666",
            startColor: "orange",
            endColor: "blue",
            maxColor: "red",
            minColor: "green",
            dotRadius: 3,
            tooltip: function (value, index, array) {
              return value + ' ' + (30 - (index + 1)) + ' seconds ago';
            }
          });
        sparkline.draw(currenciesInOrder[i - 1][j]);
        cell.appendChild(sparkElement);
      }
      else {
        cell.innerHTML = currenciesInOrder[i - 1][j];
      }
    }
  }
}

function sortTable(updateCurrency) {
  if (updateCurrency) {
    let indexToUpdate = currenciesInOrder.map((currency) => currency[0]).indexOf(updateCurrency.name);
    let sparklineData = currenciesInOrder[indexToUpdate][7];
    let _updateCurreny = objectToArray(updateCurrency);
    _updateCurreny.push(sparklineData);
    currenciesInOrder.splice(indexToUpdate, 1, _updateCurreny);
  }
  currenciesInOrder
    .sort(function (a, b) {
      if (a[6] < b[6]) return -1;
      else return 1;
    })
  addSparklineDataToSortedTable();
}

function addSparklineDataToSortedTable() {
  currenciesInOrder.forEach(function (currencyInfo) {
    if (currencyInfo[7] == undefined) currencyInfo[7] = []
    if (currencyInfo[7].length == 30) {
      currencyInfo[7].shift();
    }
    currencyInfo[7].push((currencyInfo[1] + currencyInfo[2]) / 2);
  })
}

function objectToArray(object) {
  let arr = [];
  for (key of Object.keys(object)) {
    if (object.hasOwnProperty(key)) arr.push(object[key]);
  }
  return arr;
}