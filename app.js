// ========= Cursor Glow =========
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', e => {
  if(cursorGlow){
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  }
});

// ========= Scroll Reveal =========
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) el.classList.add('in');
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========= Split Slider =========
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.split-wrap').forEach(wrap => {
    const handle = wrap.querySelector('.handle');
    const right = wrap.querySelector('.right-layer');

    if (!handle || !right) return;

    let dragging = false;

    // Helper: update clip exactly with handle (horizontal)
    const updateClip = (x) => {
      const width = wrap.offsetWidth;
      const percent = (x / width) * 99.5;
      handle.style.left = `${percent}%`;
      right.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
    };

    // Mouse events
    handle.addEventListener('mousedown', () => dragging = true);
    window.addEventListener('mouseup', () => dragging = false);
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      const rect = wrap.getBoundingClientRect();
      let x = e.clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      updateClip(x);
    });

    // Touch events
    handle.addEventListener('touchstart', (e) => { dragging = true; e.preventDefault(); });
    window.addEventListener('touchend', () => dragging = false);
    window.addEventListener('touchmove', (e) => {
      if (!dragging) return;
      const touch = e.touches[0];
      const rect = wrap.getBoundingClientRect();
      let x = touch.clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      updateClip(x);
      e.preventDefault();
    });

    // Initialize handle in the middle
    updateClip(wrap.offsetWidth / 2);
  });
});

// ========= Footer Year =========
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// Set the current year
document.getElementById("year").textContent = new Date().getFullYear();

// Real-time Baghdad clock
function updateClock() {
    const now = new Date();
    // Adjust for UTC+3 (Baghdad)
    const baghdadOffset = 3 * 60; // in minutes
    const localOffset = now.getTimezoneOffset(); // in minutes
    const baghdadTime = new Date(now.getTime() + (baghdadOffset + localOffset) * 60 * 1000);

    const hours = String(baghdadTime.getHours()).padStart(2, '0');
    const minutes = String(baghdadTime.getMinutes()).padStart(2, '0');
    const seconds = String(baghdadTime.getSeconds()).padStart(2, '0');
    const ms = String(baghdadTime.getMilliseconds()).padStart(3, '0');

    document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}.${ms}`;
}

// Update every 10ms for smooth milliseconds
setInterval(updateClock, 10);

// Initialize immediately
updateClock();