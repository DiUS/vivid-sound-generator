'use strict';

const OscReceiver = require('osc-receiver');
const receiver = new OscReceiver();
const WebSocket = require('ws');

const PORT = 8080;

function doLog(type) {
  const args = Array.prototype.slice.call(arguments, 1);
  args.unshift('[OSC Receiver]');
  console[type].apply(console, args);
}

const log = ['trace', 'debug', 'info', 'warn', 'error'].reduce(function (sum, value) {
  sum[value] = doLog.bind(null, value);
  return sum;
}, {});

const wsServer = new WebSocket.Server({ port: PORT });

wsServer.on('listening', function () {
  log.info('Server is now listening on port', PORT);
});

let wsConnection;
wsServer.on('connection', function (ws) {
  wsConnection = ws;
});

receiver.bind(8081);
receiver.on('/pulse', function (bpm, volume) {
  log.info(bpm + ',' + volume);
  if (wsConnection) {
    wsConnection.send(bpm + ',' + volume);
  }
});
