import Pulser from './instruments/Pulser'
import RandomConvolver from './convolvers/RandomConvolver'

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

const pulser = new Pulser(context);
const convolver = new RandomConvolver(context, { duration: 2, seed: 1 });

pulser.connect(context.destination);
pulser.connect(convolver);
convolver.connect(context.destination);

// window.addEventListener('keydown', () => pulser.start());
// window.addEventListener('keyup', () => pulser.stop());
// window.addEventListener('blur', () => pulser.stop());

pulser.play();
setInterval(() => pulser.play(), 1500);