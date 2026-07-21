const stage = document.querySelector("#flexStage");
const buttons = [...document.querySelectorAll(".choice")];
const currentValue = document.querySelector("#currentValue");
const codeValue = document.querySelector(".code-value");
const explanation = document.querySelector("#explanation");
const copyButton = document.querySelector("#copyButton");
const guideLabel = document.querySelector("#guideLabel");

const descriptions = {
  "flex-start": "สมาชิกทุกกล่องจะชิดด้านบนของ container",
  "flex-end": "สมาชิกทุกกล่องจะชิดด้านล่างของ container",
  center: "สมาชิกทุกกล่องจะอยู่กึ่งกลางตามแนวตั้ง",
  stretch: "สมาชิกที่ไม่กำหนดความสูงจะยืดเต็มแนวตั้งของ container",
  baseline: "สมาชิกจะขยับให้เส้นฐานของตัวอักษรอยู่ในระดับเดียวกัน",
};

const guideLabels = {
  "flex-start": "เส้นเริ่มต้น (start)",
  "flex-end": "เส้นสิ้นสุด (end)",
  center: "เส้นกึ่งกลาง (center)",
  stretch: "ยืดจาก start ถึง end",
  baseline: "เส้นฐานตัวอักษร (baseline)",
};

function selectAlign(value) {
  stage.style.alignItems = value;
  stage.dataset.align = value;
  currentValue.textContent = value;
  codeValue.textContent = value;
  guideLabel.textContent = guideLabels[value];
  explanation.innerHTML = `<span aria-hidden="true">🌷</span> ${descriptions[value]}`;

  buttons.forEach((button) => {
    const selected = button.dataset.value === value;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-checked", String(selected));
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => selectAlign(button.dataset.value));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = buttons.indexOf(button);
    const direction = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
    const nextButton = buttons[(currentIndex + direction + buttons.length) % buttons.length];
    nextButton.focus();
    selectAlign(nextButton.dataset.value);
  });
});

copyButton.addEventListener("click", async () => {
  const css = `.container {\n  display: flex;\n  align-items: ${currentValue.textContent};\n}`;
  try {
    await navigator.clipboard.writeText(css);
    copyButton.textContent = "✓ คัดลอกแล้ว";
    window.setTimeout(() => (copyButton.textContent = "📋 คัดลอก"), 1400);
  } catch {
    copyButton.textContent = "คัดลอกไม่ได้";
  }
});

selectAlign("flex-start");
