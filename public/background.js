let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

const ports = new Set();

chrome.runtime.onConnect.addListener((port) => {
  ports.add(port);

  port.onDisconnect.addListener(() => {
    ports.delete(port);
  });
});

chrome.debugger.onDetach.addListener((source, reason) => {
  ports.forEach((port) => {
    port.postMessage({ action: "updateCheckbox", checked: false });
  });
});
