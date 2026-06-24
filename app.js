function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "index.html";
  }
}

function showToast(message) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1900);
}

function playNotificationTest() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(820, context.currentTime);
    oscillator.frequency.setValueAtTime(980, context.currentTime + 0.13);

    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.16, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.34);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.35);

    showToast("Suara notifikasi berhasil dites");
  } catch (error) {
    showToast("Browser belum mengizinkan suara notifikasi");
  }
}

function bindTabs() {
  document.querySelectorAll("[data-tab-group]").forEach((group) => {
    const buttons = group.querySelectorAll(".tab-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((item) => item.classList.remove("active"));
        btn.classList.add("active");

        const target = btn.dataset.target;
        if (!target) return;

        document.querySelectorAll(`[data-panel-group="${group.dataset.tabGroup}"]`).forEach((panel) => {
          panel.classList.toggle("hidden", panel.id !== target);
        });
      });
    });
  });
}

function bindPressEffect() {
  document.querySelectorAll("a, button, .select-box").forEach((el) => {
    el.addEventListener("touchstart", () => el.classList.add("is-pressed"), { passive: true });
    el.addEventListener("touchend", () => el.classList.remove("is-pressed"), { passive: true });
    el.addEventListener("mouseleave", () => el.classList.remove("is-pressed"));
  });
}

function bindProfileActions() {
  document.querySelectorAll(".toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("off");
      const active = !toggle.classList.contains("off");
      showToast(active ? "Notifikasi jadwal kuliah aktif" : "Notifikasi jadwal kuliah nonaktif");
    });
  });

  const soundBtn = document.querySelector("[data-test-sound]");
  if (soundBtn) soundBtn.addEventListener("click", playNotificationTest);

  const logout = document.querySelector("[data-logout]");
  if (logout) {
    logout.addEventListener("click", () => showToast("Fitur keluar siap disambungkan ke sistem login"));
  }

  const chat = document.querySelector("[data-chat]");
  if (chat) {
    chat.addEventListener("click", () => showToast("Fitur chat dosen pembimbing siap disambungkan"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-back]").forEach((btn) => btn.addEventListener("click", goBack));
  document.querySelectorAll("[data-toast]").forEach((el) => {
    el.addEventListener("click", () => showToast(el.dataset.toast));
  });
  bindTabs();
  bindPressEffect();
  bindProfileActions();
});
