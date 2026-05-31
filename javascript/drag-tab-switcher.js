/**
 * Drag Tab Switcher - Stable Diffusion WebUI Extension
 * 画像をドラッグしてタブボタンにホバーすると自動的にタブが切り替わる
 */

(function () {
  "use strict";

  const CONFIG = {
    targets: [
      { tabText: "img2img" },
      { tabText: "PNG Info" },
    ],
    // ホバー開始から切り替えるまでの遅延 (ms) — 0 で即時
    hoverDelay: 0,
    debug: false,
  };

  function log(...args) {
    if (CONFIG.debug) console.log("[DragTabSwitcher]", ...args);
  }

  function getTabButton(tabText) {
    const buttons = document.querySelectorAll(
      "#tabs .tab-nav button, .tab-nav button"
    );
    for (const btn of buttons) {
      if (btn.textContent.trim() === tabText) return btn;
    }
    return null;
  }

  function switchToTab(tabText) {
    const btn = getTabButton(tabText);
    if (btn) {
      log("Switching to tab:", tabText);
      btn.click();
      return true;
    }
    return false;
  }

  function setTabHighlight(btn, active) {
    if (active) {
      btn.style.outline = "2px solid #ff9800";
      btn.style.outlineOffset = "2px";
      btn.style.borderRadius = "4px";
    } else {
      btn.style.outline = "";
      btn.style.outlineOffset = "";
      btn.style.borderRadius = "";
    }
  }

  // ---- ドラッグ状態 ----
  let dragging = false;
  // ホバー切り替えタイマー (tabText → timerId)
  const hoverTimers = {};

  // ---- タブボタンへのリスナー (初回のみ登録) ----
  // リスナー自体は1回だけ登録し、dragging フラグで制御する
  function attachTabListeners() {
    CONFIG.targets.forEach((target) => {
      const btn = getTabButton(target.tabText);
      if (!btn || btn.__dtsAttached) return;
      btn.__dtsAttached = true;

      btn.addEventListener("dragenter", (e) => {
        if (!dragging) return;
        e.preventDefault();
        setTabHighlight(btn, true);
        log("dragenter on tab:", target.tabText);

        clearTimeout(hoverTimers[target.tabText]);
        hoverTimers[target.tabText] = setTimeout(() => {
          switchToTab(target.tabText);
        }, CONFIG.hoverDelay);
      });

      btn.addEventListener("dragover", (e) => {
        if (!dragging) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      });

      btn.addEventListener("dragleave", () => {
        clearTimeout(hoverTimers[target.tabText]);
        setTabHighlight(btn, false);
      });
    });
  }

  function clearAllHighlights() {
    CONFIG.targets.forEach((t) => {
      clearTimeout(hoverTimers[t.tabText]);
      const btn = getTabButton(t.tabText);
      if (btn) setTabHighlight(btn, false);
    });
  }

  // ---- グローバルドラッグ状態 ----
  // ページ内要素のドラッグ
  document.addEventListener("dragstart", () => {
    dragging = true;
    log("dragstart");
    attachTabListeners(); // DOM が再構築された場合に備えて毎回チェック
  }, true);

  document.addEventListener("dragend", () => {
    dragging = false;
    log("dragend");
    clearAllHighlights();
  }, true);

  // ファイルマネージャーなどブラウザ外からのドラッグ
  document.addEventListener("dragenter", (e) => {
    if (e.dataTransfer && e.dataTransfer.types.includes("Files")) {
      dragging = true;
      log("dragenter (external file)");
      attachTabListeners();
    }
  }, true);

  document.addEventListener("drop", () => {
    dragging = false;
    clearAllHighlights();
  }, true);

  // dragleave でウィンドウ外に出た場合もリセット
  document.addEventListener("dragleave", (e) => {
    if (e.relatedTarget === null) {
      dragging = false;
      clearAllHighlights();
    }
  }, true);

  // ---- 初期化 ----
  function init() {
    attachTabListeners();
    log("Initialized");
  }

  if (typeof onUiLoaded === "function") {
    onUiLoaded(init);
  } else {
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", init)
      : init();
  }
})();
