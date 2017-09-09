import MersenneTwister from 'mersenne-twister';

const DECAY_TARGET = .01;
function logrithmic(i, frameCount) {
  return Math.exp(i * Math.log(DECAY_TARGET) / frameCount);
}

const DEFAULT_OPTIONS = {
  duration: 1,
  envelopeFunction: logrithmic,
  seed: 1,
};

export default function(context, _options = {}) {
  const options = Object.assign({}, DEFAULT_OPTIONS, _options);

  const convolver = context.createConvolver();
  const frameCount = context.sampleRate * options.duration;
  const convolverBuffer = context.createBuffer(2, frameCount, context.sampleRate);
  const channelData = [convolverBuffer.getChannelData(0), convolverBuffer.getChannelData(1)];
  const generator = new MersenneTwister(123);
  
  let i;
  for (i = 0; i < frameCount; i++) {
    const envelope = options.envelopeFunction(i, frameCount);
    channelData[0][i] = (Math.random() * 2 - 1) * envelope;
    channelData[1][i] = (Math.random() * 2 - 1) * envelope;
  }
  convolver.buffer = convolverBuffer;

  return convolver;
}