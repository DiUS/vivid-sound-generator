import { noteToFreq } from '../keyboard';

function createOsc(context, freq) {
  const osc = context.createOscillator();
  osc.frequency.value = freq;
  osc.type = 'sine';
  return osc;
}

const TIME_CONSTANT = 0.01;
const DECAY_CONSTANT = 0.1;
const DURATION = 0.1;

export default class Pulse {
  constructor(context) {
    this.context = context;
    this.oscillators = [
      createOsc(this.context, noteToFreq('D2')),
      createOsc(this.context, noteToFreq('A3')),
      createOsc(this.context, noteToFreq('F#3')),
    ];

    this.maxGain = 1 / (this.oscillators.length + 1);
    this.outputGain = this.context.createGain();
    this.outputGain.gain.value = 0;
    this.oscillators.forEach(o => {
      o.start();
      o.connect(this.outputGain);
    });
  }

  start(velocity = 1) {
    this.outputGain.gain.setTargetAtTime(Math.min(1, velocity) * this.maxGain, this.context.currentTime, TIME_CONSTANT);
  }

  stop() {
    this.outputGain.gain.setTargetAtTime(0, this.context.currentTime, DECAY_CONSTANT);
  }

  play(velocity = 1) {
    this.outputGain.gain.setTargetAtTime(Math.min(1, velocity) * this.maxGain, this.context.currentTime, TIME_CONSTANT);
    this.outputGain.gain.setTargetAtTime(0, this.context.currentTime + DURATION, DECAY_CONSTANT);
  }

  connect(destination) {
    this.outputGain.connect(destination);
  }
}
