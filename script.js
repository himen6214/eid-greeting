const words = [
  'khushiyan jo barh jaayein',
  'ghar mein meetha sa sukoon',
  'duaein jo qabool ho jaayein',
  'yaadein jo hamesha muskurayein',
  'roshni jo sab tak pahuche'
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;
let typeInterval;

const typeTarget = document.getElementById('typewriter');
const cursor = document.querySelector('.cursor');

function typeLoop() {
  if (!typeTarget) return;

  const current = words[wordIndex];
  const visible = current.slice(0, charIndex);
  typeTarget.textContent = visible;

  if (!deleting) {
    if (charIndex < current.length) {
      charIndex += 1;
    } else {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    if (charIndex > 0) {
      charIndex -= 1;
    } else {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  const delay = deleting ? 50 : 85;
  typeInterval = setTimeout(typeLoop, delay);
}

function buildStars(count = 60) {
  const container = document.querySelector('.stars');
  if (!container) return;

  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.animationDuration = `${10 + Math.random() * 10}s`;
    frag.appendChild(star);
  }
  container.appendChild(frag);
}

const duaList = [
  'Allah aapko sehat, khushi aur barkat ata farmaaye.',
  'Allah aapke ghar ko sukoon aur rehmat se bhar de.',
  'Aapki har dua qubool ho aur zindagi mein kamiyabi mile.',
  'Allah aapko aur aapke parivaar ko hamesha mehfooz rakhe.',
  'Allah aapko dil ka sukoon aur rozi mein barkat de.'
];

function randomDua() {
  const idx = Math.floor(Math.random() * duaList.length);
  return duaList[idx];
}

function spawnSparkles(container) {
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    container.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }
}

function handleDuaGenerator() {
  const btn = document.getElementById('dua-btn');
  const result = document.getElementById('dua-result');
  const sparkles = document.getElementById('sparkles');
  if (!btn || !result) return;

  btn.addEventListener('click', () => {
    result.textContent = randomDua();
    spawnSparkles(sparkles);
  });
}

function handleWhatsAppButtons() {
  const mainBtn = document.getElementById('wh-send');
  const buttons = document.querySelectorAll('[data-wh-target]');

  function openWhatsApp(value) {
    if (!value.trim()) {
      alert('Please type a short Eid message pehle.');
      return;
    }
    const encoded = encodeURIComponent(value.trim());
    window.open(`https://wa.me/917977345572?text=${encoded}`, '_blank');
  }

  if (mainBtn) {
    mainBtn.addEventListener('click', () => {
      const input = document.getElementById('wh-msg');
      openWhatsApp(input ? input.value : '');
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-wh-target');
      const area = document.getElementById(targetId);
      openWhatsApp(area ? area.value : '');
    });
  });
}

function handleHeaderShrink() {
  const header = document.querySelector('.topbar');
  if (!header) return;

  let ticking = false;
  const update = () => {
    const shouldShrink = window.scrollY > 24;
    header.classList.toggle('shrink', shouldShrink);
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function handleIntroScreen() {
  const intro = document.querySelector('.intro-screen');
  if (!intro) return;
  setTimeout(() => {
    intro.style.pointerEvents = 'none';
    intro.style.opacity = '0';
    intro.style.visibility = 'hidden';
  }, 3000);
}

function handleIntroSound() {
  const audio = document.getElementById('intro-audio');
  if (!audio) return;
  audio.volume = 0.25;
  audio.loop = false;
  const stop = () => {
    audio.pause();
    audio.currentTime = 0;
  };
  audio.play().then(() => {
    setTimeout(stop, 4000);
  }).catch(() => {
    // Autoplay may be blocked; no action needed.
  });
}

window.addEventListener('DOMContentLoaded', () => {
  buildStars();
  typeLoop();
  handleDuaGenerator();
  handleWhatsAppButtons();
  handleHeaderShrink();
  handleIntroScreen();
  handleIntroSound();
  handleGiftSound();
});

function handleGiftSound() {
  const audio = document.getElementById('gift-audio');
  if (!audio) return;
  audio.volume = 0.2;
  audio.loop = false;
  const buttons = Array.from(document.querySelectorAll('a, button')).filter((el) =>
    el.textContent && el.textContent.trim().startsWith('Open Your Eid Gift')
  );
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    });
  });
}
