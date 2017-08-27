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
  createOsc(noteToFreq('C4')),
  createOsc(noteToFreq('E4')),
  createOsc(noteToFreq('G4')),
];

// Gains
const gainNode = context.createGain();
gainNode.gain.value = 0;''

// Network
all.forEach(oscN => oscN.connect(gainNode));
gainNode.connect(context.destination);

// Start
all.forEach(oscN => oscN.start());

// const

setInterval(() => {
  // gainNode.gain.exponentialRampToValueAtTime(0.2, context.currentTime + 0.5);
  // gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1);
  // gainNode.gain.setValueAtTime(0, context.currentTime + 1);
  gainNode.gain.setTargetAtTime(0.2, context.currentTime, 0.001);
  gainNode.gain.setTargetAtTime(0, context.currentTime + .01, 0.5);
}, 1500);