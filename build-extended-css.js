const fs = require("fs");
const path = require("path");
const outPath = path.join(__dirname, "..", "css", "extended.css");

let o = `/* ======================================================================
   Sushant Shree Harivanshi — Extended UI layer (utilities + sections)
   Load after styles.css
   ====================================================================== */

:root {
  --ex-radius: 20px;
  --ex-ease: cubic-bezier(0.16, 1, 0.3, 1);
  --ex-glow: 0 0 60px rgba(124, 58, 237, 0.22);
}

`;

for (let i = 1; i <= 60; i++) {
  o += `.u-mt-${i} { margin-top: ${i * 4}px !important; }\n`;
  o += `.u-mb-${i} { margin-bottom: ${i * 4}px !important; }\n`;
  o += `.u-py-${i} { padding-top: ${i * 6}px !important; padding-bottom: ${i * 6}px !important; }\n`;
}
for (let i = 1; i <= 40; i++) {
  o += `.u-gap-${i} { gap: ${i * 4}px !important; }\n`;
}

o += `
/* ---- Stats strip ---- */
.stats-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto;
}
.stat-box {
  text-align: center;
  padding: 1.35rem 1rem;
  border-radius: var(--ex-radius);
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(16, 12, 32, 0.45);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: transform 0.35s var(--ex-ease), box-shadow 0.35s ease, border-color 0.35s;
}
.stat-box:hover {
  transform: translateY(-6px);
  border-color: rgba(167, 139, 250, 0.35);
  box-shadow: var(--ex-glow);
}
.stat-box__num {
  font-family: var(--font-display, system-ui);
  font-size: 1.85rem;
  font-weight: 800;
  background: linear-gradient(105deg, #e9d5ff, #38bdf8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.stat-box__lbl {
  font-size: 0.78rem;
  color: var(--muted, #9b95b0);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 0.35rem;
}
@media (max-width: 768px) {
  .stats-strip {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ---- Tech stack pills ---- */
.tech-strip {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem;
  max-width: 920px;
  margin: 0 auto;
}
.tech-pill {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.45rem 0.95rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: var(--muted, #9b95b0);
  transition: all 0.25s ease;
}
.tech-pill:hover {
  color: #f8f7fc;
  border-color: rgba(167, 139, 250, 0.4);
  transform: translateY(-2px);
}

/* ---- Comparison ---- */
.compare-wrap {
  overflow-x: auto;
  border-radius: var(--ex-radius);
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(8, 6, 18, 0.55);
}
.compare-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 520px;
}
.compare-table th,
.compare-table td {
  padding: 1rem 1.15rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.92rem;
}
.compare-table th {
  background: rgba(124, 58, 237, 0.12);
  font-weight: 700;
  color: #e9d5ff;
}
.compare-table tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}
.compare-table .tick {
  color: #34d399;
  font-weight: 700;
}
.compare-table .cross {
  color: #f87171;
}

/* ---- FAQ ---- */
.faq {
  max-width: 760px;
  margin: 0 auto;
}
.faq__item {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  margin-bottom: 0.75rem;
  background: rgba(16, 12, 32, 0.4);
  overflow: hidden;
  transition: border-color 0.25s ease;
}
.faq__item.is-open {
  border-color: rgba(167, 139, 250, 0.35);
}
.faq__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  background: transparent;
  border: none;
  color: inherit;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}
.faq__trigger:hover {
  background: rgba(255, 255, 255, 0.03);
}
.faq__icon {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  position: relative;
  transition: transform 0.35s var(--ex-ease);
}
.faq__icon::before,
.faq__icon::after {
  content: "";
  position: absolute;
  background: currentColor;
  border-radius: 2px;
}
.faq__icon::before {
  width: 14px;
  height: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.faq__icon::after {
  width: 2px;
  height: 14px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.faq__item.is-open .faq__icon {
  transform: rotate(45deg);
}
.faq__panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s var(--ex-ease);
}
.faq__body {
  padding: 0 1.25rem 1.15rem;
  color: var(--muted, #9b95b0);
  font-size: 0.9rem;
  line-height: 1.65;
}

/* ---- Marquee ---- */
.marquee {
  display: flex;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
}

.marquee__track {
  display: flex;
  gap: 3rem;
  animation: marquee-scroll 28s linear infinite;
  white-space: nowrap;
}
@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
  }
}

/* ---- Bento ---- */
.bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
@media (max-width: 900px) {
  .bento {
    grid-template-columns: 1fr;
  }
}
.bento__cell {
  padding: 1.5rem;
  border-radius: var(--ex-radius);
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(16, 12, 32, 0.35);
  transition: transform 0.35s var(--ex-ease);
}
.bento__cell:hover {
  transform: translateY(-4px);
}

`;

for (let n = 1; n <= 40; n++) {
  o += `@keyframes ex-float-${n} {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(${-3 - (n % 6)}px);
  }
}\n`;
}
for (let n = 1; n <= 25; n++) {
  o += `@keyframes ex-pulse-${n} {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 1;
  }
}\n`;
}
for (let i = 1; i <= 60; i++) {
  o += `.ex-delay-${i} { animation-delay: ${(i * 0.04).toFixed(2)}s !important; }\n`;
}

o += `
/* ---- Hero device mockup row ---- */
.hero-devices {
  display: grid;
  grid-template-columns: 1fr 140px;
  gap: 1rem;
  align-items: end;
}
@media (max-width: 1024px) {
  .hero-devices {
    grid-template-columns: 1fr;
    max-width: 420px;
    margin-inline: auto;
  }
}
.hero-phone {
  border-radius: 28px;
  border: 3px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  aspect-ratio: 9/19;
  max-height: 320px;
}
.hero-phone img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ---- Focus / print / a11y ---- */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid rgba(167, 139, 250, 0.85);
  outline-offset: 3px;
}

@media print {
  .mesh,
  .noise,
  .gradient-orb,
  .cursor-glow,
  .chatbot,
  .hero__ring {
    display: none !important;
  }
  body {
    background: #fff;
    color: #000;
  }
}
`;

fs.writeFileSync(outPath, o);
console.log("Wrote", outPath, "lines:", o.split("\n").length);
