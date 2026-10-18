/**
 * 霞鹜文楷 for Gemini & ChatGPT - Content Script v2.1.0
 * 仅在 gemini.google.com、chatgpt.com、chat.openai.com 运行
 */
(() => {
  const ALLOWED_HOSTS = new Set([
    "gemini.google.com",
    "chatgpt.com",
    "chat.openai.com"
  ]);

  const currentHost = window.location.hostname;
  if (!ALLOWED_HOSTS.has(currentHost)) {
    return;
  }

  const isGemini = currentHost === "gemini.google.com";
  const isChatGPT = currentHost === "chatgpt.com" || currentHost === "chat.openai.com";

  const DEFAULT_SETTINGS = {
    enableGemini: true,
    enableChatGPT: true,
    enableCodeMono: true,
    boldMode: "standard" // "standard" (0.35px 描边增强) | "strong" (0.55px 强力增强) | "native" (仅系统合成粗体)
  };

  let currentSettings = { ...DEFAULT_SETTINGS };

  function syncAttributes() {
    const root = document.documentElement;
    if (!root) return;

    const shouldEnable =
      (isGemini && currentSettings.enableGemini) ||
      (isChatGPT && currentSettings.enableChatGPT);

    const expectedDisabled = shouldEnable ? null : "true";
    const expectedCode = currentSettings.enableCodeMono ? "true" : "false";
    const expectedBold = currentSettings.boldMode || "standard";

    if (expectedDisabled === "true") {
      if (root.getAttribute("data-lxgw-disabled") !== "true") {
        root.setAttribute("data-lxgw-disabled", "true");
      }
    } else {
      if (root.hasAttribute("data-lxgw-disabled")) {
        root.removeAttribute("data-lxgw-disabled");
      }
    }

    if (root.getAttribute("data-lxgw-code") !== expectedCode) {
      root.setAttribute("data-lxgw-code", expectedCode);
    }

    if (root.getAttribute("data-lxgw-bold") !== expectedBold) {
      root.setAttribute("data-lxgw-bold", expectedBold);
    }
  }

  // 初始立即同步
  syncAttributes();

  // 监听 <html> 属性变化，防止 ChatGPT (Next.js/React 水合) 重置 <html> 属性导致失效
  const observer = new MutationObserver(() => {
    syncAttributes();
  });

  if (document.documentElement) {
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-lxgw-disabled", "data-lxgw-code", "data-lxgw-bold", "class", "style"]
    });
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      syncAttributes();
      if (document.documentElement) {
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-lxgw-disabled", "data-lxgw-code", "data-lxgw-bold", "class", "style"]
        });
      }
    }, { once: true });
  }

  // 读取并监听用户持久化的开关设置
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (stored) => {
      currentSettings = { ...DEFAULT_SETTINGS, ...stored };
      syncAttributes();
    });

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === "sync") {
        chrome.storage.sync.get(DEFAULT_SETTINGS, (stored) => {
          currentSettings = { ...DEFAULT_SETTINGS, ...stored };
          syncAttributes();
        });
      }
    });
  }
})();
