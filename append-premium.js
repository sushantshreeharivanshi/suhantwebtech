/**
 * One-time generator for premium-extra.css utilities.
 * Do not run twice — it appends to the file. Edit premium-extra.css directly instead.
 */
const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "..", "css", "premium-extra.css");
if (!fs.existsSync(p)) {
  console.error("Missing premium-extra.css");
  process.exit(1);
}
let a = fs.readFileSync(p, "utf8");
if (a.includes("shadow-depth-121")) {
  console.log("Utilities already present; skip.");
  process.exit(0);
}
a += "\n\n/* ---- Extended breakpoints ---- */\n";
const bp = [320, 375, 414, 480, 640, 768, 900, 1024, 1280, 1440, 1536];
bp.forEach(function (w) {
  a +=
    "@media (min-width:" +
    w +
    "px){.min-" +
    w +
    "-px-6{padding-left:1.5rem!important;padding-right:1.5rem!important}}\n";
});
for (let i = 1; i <= 120; i++) {
  a +=
    ".hover-lift-" +
    i +
    "{transition:transform .3s cubic-bezier(0.16,1,0.3,1)}\n.hover-lift-" +
    i +
    ":hover{transform:translateY(" +
    -Math.min(i, 14) +
    "px)}\n";
}
for (let i = 121; i <= 280; i++) {
  a +=
    ".shadow-depth-" +
    i +
    "{box-shadow:0 " +
    (4 + (i % 20)) +
    "px " +
    (20 + (i % 40)) +
    "px rgba(0,0,0," +
    (0.25 + (i % 15) / 100).toFixed(2) +
    ")}\n";
}
fs.writeFileSync(p, a);
console.log("Done, lines:", a.split("\n").length);
