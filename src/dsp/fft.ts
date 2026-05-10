import FFT from "fft.js";

export function runFFT(samples: Float32Array) {
  const size = 2048;

  const fft = new FFT(size);

  const out = fft.createComplexArray();

  const input = new Array(size).fill(0);

  for (let i = 0; i < size; i++) {
    input[i] = samples[i] || 0;
  }

  fft.realTransform(out, input);

  return out;
}
