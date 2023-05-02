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
    console.log("current:" + currentTab.id);

    // Query all the tabs
    chrome.tabs.query({}, (tabs) => {
      for (let i = 0; i < tabs.length; i++) {
        console.log(tabs[i]);
      }
      // Extract the tab IDs into an array, excluding the current tab ID
      const tabIds = tabs
        .filter(
          (tab) =>
            tab.url !== "about:blank" &&
            !tab.url.includes("chrome-extension://")
        )
        .map((tab) => tab.id);

      console.log(`tabs: ${tabIds}`);
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
      console.log("runtime.lastError", tabId, chrome.runtime.lastError.message);
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

document.getElementById("tab1").addEventListener("click", () => switchTab(1));
document.getElementById("tab2").addEventListener("click", () => switchTab(2));
document.getElementById("submit-button").addEventListener("click", submitForm);

function switchTab(tabId) {
  let i;
  for (i = 1; i <= 2; i++) {
    document.getElementById(`tab${i}`).classList.remove("active");
    document.getElementById(`view${i}`).style.display = "none";
  }
  document.getElementById(`tab${tabId}`).classList.add("active");
  document.getElementById(`view${tabId}`).style.display = "block";
}

function submitForm() {
  const field1 = document.getElementById("name-field").value;
  const field2 = document.getElementById("phone-field").value;
  const field3 = document.getElementById("address-field").value;
  const output = document.getElementById("output");
  output.innerHTML = `Name: ${field1}<br>Phone: ${field2}<br>Address: ${field3}`;
}
