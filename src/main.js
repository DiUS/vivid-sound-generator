const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

const oscNode = context.createOscillator();
oscNode.frequency.value = 0;
oscNode.type = 'triangle';

const gainNode = context.createGain();
gainNode.gain.value = 0;

// Network
oscNode.connect(gainNode);
gainNode.connect(context.destination);

oscillator.start();
