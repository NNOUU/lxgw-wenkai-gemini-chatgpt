const DEFAULT_SETTINGS = {
  enableGemini: true,
  enableChatGPT: true,
  enableCodeMono: true,
  boldMode: "standard"
};

const CANDIDATE_FONTS = [
  { name: "LXGW WenKai GB Screen", label: "霞鹜文楷 GB 屏幕阅读版 (LXGW WenKai GB Screen)" },
  { name: "霞鹜文楷 GB 屏幕阅读版", label: "霞鹜文楷 GB 屏幕阅读版" },
  { name: "LXGW WenKai Screen", label: "霞鹜文楷屏幕阅读版 (LXGW WenKai Screen)" },
  { name: "霞鹜文楷 屏幕阅读版", label: "霞鹜文楷 屏幕阅读版" },
  { name: "LXGW WenKai GB Screen R", label: "霞鹜文楷 GB 屏幕阅读版 R" },
  { name: "LXGW WenKai Screen R", label: "霞鹜文楷屏幕阅读版 R" },
  { name: "LXGW WenKai", label: "霞鹜文楷原版 (LXGW WenKai)" },
  { name: "霞鹜文楷", label: "霞鹜文楷 (系统中文名)" },
  { name: "LXGW WenKai GB", label: "霞鹜文楷 GB (LXGW WenKai GB)" },
  { name: "霞鹜文楷 GB", label: "霞鹜文楷 GB" }
];

function isFontInstalled(fontName) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const testText = "霞鹜文楷测试文本WiLl1234567890";
  const baseFonts = ["monospace", "sans-serif", "serif"];
  const baseWidths = {};

  baseFonts.forEach((base) => {
    ctx.font = `72px ${base}`;
    baseWidths[base] = ctx.measureText(testText).width;
  });

  return baseFonts.some((base) => {
    ctx.font = `72px "${fontName}", ${base}`;
    return ctx.measureText(testText).width !== baseWidths[base];
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const statusEl = document.getElementById("fontStatus");
  const detected = CANDIDATE_FONTS.filter((f) => isFontInstalled(f.name));

  if (detected.length > 0) {
    statusEl.className = "status-box status-ok";
    statusEl.textContent = `✅ 已识别到本地字体：${detected[0].label}`;
  } else {
    statusEl.className = "status-box status-warn";
    statusEl.innerHTML =
      "⚠️ 浏览器暂未识别到本地「霞鹜文楷」字体。<br/>请右键 TTF 文件选择<b>「为所有用户安装」</b>，并在地址栏输入 <code>chrome://restart</code> 重启浏览器。";
  }

  chrome.storage.sync.get(DEFAULT_SETTINGS, (stored) => {
    ["enableGemini", "enableChatGPT", "enableCodeMono"].forEach((key) => {
      const checkbox = document.getElementById(key);
      if (checkbox) {
        checkbox.checked = Boolean(stored[key]);
        checkbox.addEventListener("change", () => {
          chrome.storage.sync.set({ [key]: checkbox.checked });
        });
      }
    });

    const boldSelect = document.getElementById("boldMode");
    if (boldSelect) {
      boldSelect.value = stored.boldMode || "standard";
      boldSelect.addEventListener("change", () => {
        chrome.storage.sync.set({ boldMode: boldSelect.value });
      });
    }
  });
});
