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
];

// Gains
const pulseGainNode = context.createGain();
pulseGainNode.gain.value = 0;

const ambientGainNode = context.createGain();
ambientGainNode.gain.value = 0.2;

// Convolver
const convolverNode = context.createConvolver();
const frameCount = context.sampleRate * 1.0;

const convolverBuffer = context.createBuffer(2, frameCount, context.sampleRate);
const channelData = [convolverBuffer.getChannelData(0), convolverBuffer.getChannelData(1)];
for (var i = 0; i < frameCount; i++) {
  channelData[0][i] = Math.random() * 2 - 1;
  channelData[1][i] = Math.random() * 2 - 1;
}
convolverNode.buffer = convolverBuffer;

// Network
all.forEach(oscN => {
  oscN.connect(pulseGainNode);
  oscN.connect(ambientGainNode);
});
ambientGainNode.connect(convolverNode);
pulseGainNode.connect(context.destination);
convolverNode.connect(context.destination);

// Start
all.forEach(oscN => oscN.start());

// const

setInterval(() => {
  pulseGainNode.gain.setTargetAtTime(0.2, context.currentTime, 0.001);
  pulseGainNode.gain.setTargetAtTime(0, context.currentTime + .01, 0.5);
}, 1500);
