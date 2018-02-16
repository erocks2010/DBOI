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
global.DEBUG = true

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url);
/**
 * client.hearbeat.incoming and outgoing.I think this has to do with timings mentioned in question
 */
client.debug = function (msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {
  var sub=client.subscribe('/fx/prices', function (data) {
  console.log('Data recieved', data);
}, {
    priority: 9,
    id: 'sub - 0',
    destination: '/fx/prices'
  });
  console.log('Step 1 :: Connection established with Stomp Server');
  document.getElementById('stomp-status').innerHTML = "It has now successfully connected to a stomp server serving price updates for some foreign exchange currency pairs."
}

client.connect({}, connectCallback, function (error) {
  console.log('Error encountered .Something went wrong with Stomp connection');
  alert(error.headers.message)
})


// client.ws.onmessage=function(data){
//   console.log(data);
// }
// client.on('onmessage',function(data){
//   console.log('Data recieved',data);
// })
const exampleSparkline = document.getElementById('example-sparkline')
Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3])