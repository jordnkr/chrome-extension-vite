import "../css/extension.css";
import Color from "color";

chrome.devtools.panels.create(
  "Demo Panel",
  null,
  "index.html",
  function (panel) {}
);

// const color = Color("#632169");
// const heading = document.getElementById("myHeading");
// heading.style.background = color.hex();

const protanopiaCheckbox = document.getElementById("protanopiaCheckbox");

protanopiaCheckbox.addEventListener("change", toggleProtanopia);

async function toggleProtanopia(event) {
  const tab = await chrome.tabs.get(chrome.devtools.inspectedWindow.tabId);
  const tabId = tab.id;
  const debuggeeId = { tabId };

  if (event.target.checked) {
    chrome.debugger.attach(debuggeeId, "1.3", () => {
      if (chrome.runtime.lastError) {
        console.log("runtime.lastError", tab.id, chrome.runtime.lastError.message);
        return;
      }
      chrome.debugger.sendCommand(
        debuggeeId,
        "Emulation.setEmulatedVisionDeficiency",
        { type: "protanopia" },
        (result) => {
          if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
          }
          console.log("Command sent:", JSON.stringify(result));
        }
      );
    });
  } else {
    chrome.debugger.detach(debuggeeId);
  }
}

const port = chrome.runtime.connect({ name: "devtools" });

port.onMessage.addListener((message) => {
  if (message.action === "updateCheckbox") {
    protanopiaCheckbox.removeEventListener("change", toggleProtanopia);
    protanopiaCheckbox.checked = message.checked;
    protanopiaCheckbox.addEventListener("change", toggleProtanopia);
  }
});



// chrome.tabs.onActivated.addListener(function(closedTabId, removeInfo) {
//       chrome.debugger.detach({tabId: tabId}, function() {
//         console.log('Tab closed. Debugger detached.');
//       });
//   });

// Listen for tab change and page reload events
// chrome.tabs.onRemoved.addListener(function(closedTabId, removeInfo) {
//   if (closedTabId === tabId) {
//     chrome.debugger.detach({tabId: tabId}, function() {
//       console.log('Tab closed. Debugger detached.');
//     });
//   }
// });
