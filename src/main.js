import { noteToFreq } from './keyboard';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

function createOsc(freq) {
  const osc = context.createOscillator();
  osc.frequency.value = freq;
  osc.type = 'sine';

  return osc;
}


// Oscillators
const all = [
  createOsc(noteToFreq('D2')),
  createOsc(noteToFreq('A3')),
  // createOsc(noteToFreq('C#3')),
  createOsc(noteToFreq('F#3')),
  // createOsc(noteToFreq('D3')),
];

// Gains
const pulseGainNode = context.createGain();
pulseGainNode.gain.value = 0;

const ambientGainNode = context.createGain();
ambientGainNode.gain.value = 0;

// Convolver
const convolverNode = context.createConvolver();
const frameCount = context.sampleRate * 3;

const convolverBuffer = context.createBuffer(2, frameCount, context.sampleRate);
const channelData = [convolverBuffer.getChannelData(0), convolverBuffer.getChannelData(1)];

const TARGET = .01;
const LAMBDA = -Math.log(TARGET) / frameCount;
for (var i = 0; i < frameCount; i++) {
  var envelope = Math.exp(-LAMBDA * i);
  channelData[0][i] = (Math.random() * 2 - 1) * envelope;
  channelData[1][i] = (Math.random() * 2 - 1) * envelope;
}
convolverNode.buffer = convolverBuffer;
convolverNode.normalize = false;

// Network
all.forEach(oscN => {
  oscN.connect(pulseGainNode);
  oscN.connect(ambientGainNode);
});
ambientGainNode.connect(convolverNode);
pulseGainNode.connect(context.destination);
pulseGainNode.connect(convolverNode);
convolverNode.connect(context.destination);

// Start
all.forEach(oscN => oscN.start());

// const

const TIME_CONSTANT = 0.01;
const DECAY_CONSTANT = 0.1;
const DURATION = 0.01;

function playBeat() {
  pulseGainNode.gain.setTargetAtTime(.2, context.currentTime, TIME_CONSTANT);
  pulseGainNode.gain.setTargetAtTime(0, context.currentTime + DURATION, DECAY_CONSTANT);
}

// playBeat();
// setInterval(playBeat, 1500);
