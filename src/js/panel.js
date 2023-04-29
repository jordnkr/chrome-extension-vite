import "../css/extension.css";
import Color from "color";

let tabId;

if (!window.__testmode) {
  chrome.devtools.panels.create(
    "Demo Panel",
    null,
    "index.html",
    function (panel) {}
  );

  loadTab();
} else {
  // Get the current tab
  chrome.tabs.query({ active: true, currentWindow: true }, (currentTabs) => {
    const currentTab = currentTabs[0];
    console.log("current:" + currentTab.id)

    // Query all the tabs
    chrome.tabs.query({}, (tabs) => {
      console.log('all: ' + tabs)
      // Extract the tab IDs into an array, excluding the current tab ID
      const tabIds = tabs
        .filter((tab) => tab.id !== currentTab.id)
        .map((tab) => tab.id);

      tabId = tabIds[0];
      console.log("tested:" + tabId);
    });
  });
}

async function loadTab() {
  const tab = await chrome.tabs.get(chrome.devtools.inspectedWindow.tabId);
  tabId = tab.id;
}

const color = Color("#632169");
const heading = document.getElementById("myHeading");
const result = document.getElementById("result");
heading.style.background = color.hex();

document.getElementById("clickme").addEventListener("click", () => {
  result.textContent = 1 + parseInt(result.textContent);
});

document.getElementById("protanopiaBtn").addEventListener("click", async () => {
  const debuggeeId = { tabId };
  chrome.debugger.attach(debuggeeId, "1.3", () => {
    if (chrome.runtime.lastError) {
      console.log(
        "runtime.lastError",
        tabId,
        chrome.runtime.lastError.message
      );
      return;
    }
    chrome.debugger.sendCommand(
      debuggeeId,
      "Emulation.setEmulatedVisionDeficiency",
      {
        type: "protanopia",
      },
      (result) => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message);
        }
        console.log("Command sent:", JSON.stringify(result));
      }
    );
  });
});
