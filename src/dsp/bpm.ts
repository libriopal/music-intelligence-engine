export function estimateBPM(
  samples: Float32Array,
  sampleRate: number
): number {
  const windowSize = 1024;
  const energy: number[] = [];

  for (let i = 0; i < samples.length; i += windowSize) {
    let sum = 0;

    for (
      let j = 0;
      j < windowSize && i + j < samples.length;
      j++
    ) {
      const s = samples[i + j];
      sum += s * s;
    }

    energy.push(Math.sqrt(sum / windowSize));
  }

  const peaks: number[] = [];

  for (let i = 1; i < energy.length - 1; i++) {
    if (
      energy[i] > energy[i - 1] &&
      energy[i] > energy[i + 1] &&
      energy[i] > 0.05
    ) {
      peaks.push(i);
    }
  }

  if (peaks.length < 2) return 0;

  const intervals: number[] = [];

  for (let i = 1; i < peaks.length; i++) {
    intervals.push(peaks[i] - peaks[i - 1]);
  }

  const avgInterval =
    intervals.reduce((a, b) => a + b, 0) /
    intervals.length;

  const secondsPerBeat =
    (avgInterval * windowSize) / sampleRate;

  const bpm = 60 / secondsPerBeat;

  return Math.round(bpm);
}

