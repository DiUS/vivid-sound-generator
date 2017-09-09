var OscReceiver = require('osc-receiver')
  , receiver = new OscReceiver();

receiver.bind(9337);

receiver.on('/foo', function(a, b, c) {
  console.log('foo');
});

receiver.on('/bar', function(x, y) {
  console.log('bar');
});

// receiver.on('/GULLIVER_SENSOR_KINECT_ScreenToVirtualMap/center', function() {
//   console.log(arguments);
// });

receiver.on('message', function() {
  // handle all messages
  var address = arguments[0];
  var args = Array.prototype.slice.call(arguments, 1);
  console.log(arguments)
});

