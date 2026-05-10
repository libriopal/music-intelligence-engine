self.onmessage = (e) => {
  console.log("WORKER RECEIVED:", e.data);

  self.postMessage({
    status: "WORKER_OK",
    received: e.data,
    timestamp: Date.now(),
  });
};
