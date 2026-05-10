export const sharedBuffer =
  new SharedArrayBuffer(
    Float32Array.BYTES_PER_ELEMENT * 44100
  );

export const sharedSamples =
  new Float32Array(sharedBuffer);
