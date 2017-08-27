const AudioContext = require('web-audio-api').AudioContext;
const context = new AudioContext();

context.outStream = process.stdout;
