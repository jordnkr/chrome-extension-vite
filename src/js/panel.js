import "../css/extension.css";
import Color from "color";

if (!__testmode) {
  chrome.devtools.panels.create(
    "Demo Panel",
    null,
    "index.html",
    function (panel) {}
  );
}

const color = Color("#632169");
const heading = document.getElementById("myHeading");
const result = document.getElementById("result");
heading.style.background = color.hex();

document.getElementById("clickme").addEventListener("click", () => {
  result.textContent = 1 + parseInt(result.textContent);
})

document.getElementById("protanopiaBtn").addEventListener("click", async () => {
  const tab = await chrome.tabs.get(chrome.devtools.inspectedWindow.tabId);
  const tabId = tab.id;
  const debuggeeId = { tabId };
  chrome.debugger.attach(debuggeeId, "1.3", () => {
    if (chrome.runtime.lastError) {
      console.log(
        "runtime.lastError",
        tab.id,
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
