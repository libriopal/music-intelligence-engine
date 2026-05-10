import { MPEGDecoder } from "mpg123-decoder";
import { runFFT } from "../dsp/fft";
import { estimateBPM } from "../dsp/bpm";

const decoder = new MPEGDecoder();

self.onmessage = async (e) => {
  const { type, payload } = e.data;

  if (type !== "PROCESS_AUDIO") return;

  try {
    await decoder.ready;

    const audioBytes = new Uint8Array(payload);

    const decoded = decoder.decode(audioBytes);

    const samples = decoded.channelData[0];

    const fftData = runFFT(samples);

    const bpm = estimateBPM(
      samples,
      decoded.sampleRate
    );

    self.postMessage({
      type: "ANALYSIS_COMPLETE",
      payload: {
        sampleRate: decoded.sampleRate,
        samplesLength: samples.length,
        bpm,
        fftData,
      },
    });
  } catch (err) {
    self.postMessage({
      type: "ERROR",
      payload: String(err),
    });
  }
};
