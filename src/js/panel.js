import '../css/extension.css';
import Color from 'color';

chrome.devtools.panels.create(
  "Demo Panel",
  null,
  "index.html",
  function (panel) {}
)

const color = Color('#632169');
const heading = document.getElementById("myHeading");
heading.style.background = color.hex();