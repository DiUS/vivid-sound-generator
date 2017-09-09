import Pulser from './instruments/Pulser'

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

const pulser = new Pulser(context);
pulser.connect(context.destination);

var i = 0;

window.addEventListener('keydown', () => pulser.play());
