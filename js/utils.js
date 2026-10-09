/* ==========================================================================
   TravelGo - Utilities & UI Helpers
   ========================================================================== */

const TG_UTILS = {
  // Format currency
  formatPrice(amount) {
    return '$' + Number(amount).toLocaleString('en-US');
  },

  // Toast Notification
  showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconName = 'info';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'error') iconName = 'alert-triangle';

    toast.innerHTML = `
      <i data-lucide="${iconName}"></i>
      <span style="flex: 1;">${message}</span>
    `;

    container.appendChild(toast);
    TG_UTILS.refreshIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // Refresh Lucide icons safely
  refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  },

  // Update dynamic device status time (e.g. "9:41")
  updateStatusTime() {
    const el = document.getElementById('device-time');
    if (!el) return;
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    el.textContent = `${hours}:${minutes}`;
  },

  // Copy text to clipboard simulation
  copyToClipboard(text, successMsg = 'Copied to clipboard!') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        TG_UTILS.showToast(successMsg, 'success');
      }).catch(() => {
        TG_UTILS.fallbackCopy(text, successMsg);
      });
    } else {
      TG_UTILS.fallbackCopy(text, successMsg);
    }
  },

  fallbackCopy(text, successMsg) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      TG_UTILS.showToast(successMsg, 'success');
    } catch (err) {
      TG_UTILS.showToast('Copied: ' + text, 'info');
    }
    document.body.removeChild(textArea);
  }
};
