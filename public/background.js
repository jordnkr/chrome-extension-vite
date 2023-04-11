let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.debugger.onDetach.addListener((source, reason) => {
  chrome.runtime.sendMessage({ action: "updateCheckbox", checked: false });
});

