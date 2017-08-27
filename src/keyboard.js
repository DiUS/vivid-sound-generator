export function piano(n) {
  return 440 * Math.pow(2, (n - 49) / 12);
}

const NOTE_TO_FREQ = {};
for (let i = 1, l = 0; i <= 88; i++) {
  const freq = piano(i);
  const tone = Math.floor((i + 8) / 12);
  if (l % 2 > 0) {
    NOTE_TO_FREQ[String.fromCharCode(65 + Math.floor((l % 14) / 2)) + '#' + tone] = freq;
    NOTE_TO_FREQ[String.fromCharCode(65 + Math.floor((l + 2) % 14 / 2)) + 'b' + tone] = freq;
  } else {
    NOTE_TO_FREQ[String.fromCharCode(65 + Math.floor((l % 14) / 2)) + tone] = freq;
  }

  if (l % 14 == 2 || l % 14 == 8) l += 2;
  else l += 1;
}

export function noteToFreq(note) {
  return NOTE_TO_FREQ[note];
}
