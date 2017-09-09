var OscEmitter = require('osc-emitter')
  , emitter = new OscEmitter();

emitter.add('localhost', 9337);

emitter.emit('/foo', 1, 2, 3);
emitter.emit('/bar', 'hello', 'world');