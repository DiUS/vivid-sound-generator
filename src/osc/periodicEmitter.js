var OscEmitter = require('osc-emitter')
  , emitter = new OscEmitter();

emitter.add('localhost', 8081);

setInterval(function () {
  const bpm = 100 + Math.floor(Math.random() * 5);
  console.info('Pulse', bpm);
  emitter.emit('/pulse', 60, bpm);
}, 1500);