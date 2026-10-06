/* ========================================================
   OUR SWEET JOURNEY - SCRIPT & ANIMATIONS
   Modern Cute Green Theme (Matcha & Sage)
   Upgraded: Auth Gatekeeper (28 09 2026), Kiss FX,
   WA Chat Messenger, Sweet Music Lounge, &
   Unlimited Photo / Video Gallery (IndexedDB)
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi Partikel Daun / Hati Melayang di Background
  initFloatingLeaves();

  // 2. Sparkle Trail saat Kursor / Layar Disentuh
  initSparkleTrail();

  // 3. Auth / Gatekeeper Tanggal Jadian (28 09 2026)
  initAuthGatekeeper();

  // 4. Efek Ciuman Interaktif (Kiss FX & Counter)
  initKissEffectSystem();

  // 5. Penghitung Hari Bersama (Default: 28 September 2026)
  initLoveCounter();

  // 6. Amplop Surat Cinta Interaktif & Typewriter
  initLoveLetter();

  // 7. "Open When..." Toples Pesan
  initOpenWhenCapsules();

  // 8. Mini Game Tombol Kabur ("Gak Mau") & Jawaban "Iya"
  initRunawayButtonGame();

  // 9. Sweet Music Lounge (Preset, Cari Audio URL, Upload MP3 Sendiri)
  initSweetMusicLounge();

  // 10. Efek 3D Tilt Sederhana untuk Polaroid
  initPolaroidTilt();

  // 11. Photo / Video Lightbox Modal & Like Counter
  initPhotoLightbox();

  // 12. Hero Photo Interactivity
  initHeroPhotoEffect();

  // 13. Bucin Meter Interaktif (999% Overload)
  initBucinMeter();

  // 14. Kupon Cinta Bucin (Kupon Ciuman & Custom Kupon dari Fauzi)
  initLoveCoupons();

  // 15. Flip Card Alasan Sayang Dea
  initReasonCardsFlip();

  // 16. Galeri Foto & Video Tanpa Batas (IndexedDB & Video Canvas)
  initMemoriesAndVideoGallery();

  // 17. Bucin WhatsApp Messenger (Kabar-kabaran Seperti WA)
  initWhatsAppMessenger();

  // 18. Mobile Bottom Navigation Navigation Helper
  initMobileBottomNav();
});

/* ========================================================
   1. FLOATING LEAVES & HEARTS (BACKGROUND)
   ======================================================== */
function initFloatingLeaves() {
  const container = document.getElementById('ambientBg');
  if (!container) return;

  const emojis = ['🍀', '🍃', '🌿', '🌱', '💚', '✨', '🌸'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    createLeaf(container, emojis);
  }
}

function createLeaf(container, emojis) {
  const leaf = document.createElement('div');
  leaf.className = 'floating-leaf';
  leaf.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  
  const leftPos = Math.random() * 95;
  const animDuration = 10 + Math.random() * 14;
  const animDelay = Math.random() * 12;
  const fontSize = 16 + Math.random() * 20;

  leaf.style.left = `${leftPos}vw`;
  leaf.style.fontSize = `${fontSize}px`;
  leaf.style.animationDuration = `${animDuration}s`;
  leaf.style.animationDelay = `${animDelay}s`;

  container.appendChild(leaf);
}

/* ========================================================
   2. SPARKLE TRAIL EFFECT ON MOUSEMOVE & TOUCH
   ======================================================== */
function initSparkleTrail() {
  const sparkleSymbols = ['✨', '🍃', '💚', '🌸', '💋', '⭐'];
  let throttleTimer = false;

  const spawnSparkle = (x, y) => {
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => { throttleTimer = false; }, 40);

    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle-particle';
    sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 800);
  };

  window.addEventListener('mousemove', (e) => {
    spawnSparkle(e.clientX, e.clientY);
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      spawnSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });
}

/* ========================================================
   3. AUTH / GATEKEEPER SYSTEM (TANGGAL JADIAN: 28 09 2026)
   ======================================================== */
function initAuthGatekeeper() {
  const overlay = document.getElementById('authGateOverlay');
  const dayInput = document.getElementById('authDay');
  const monthInput = document.getElementById('authMonth');
  const yearInput = document.getElementById('authYear');
  const unlockBtn = document.getElementById('btnUnlockAuth');
  const feedbackEl = document.getElementById('authFeedback');
  const userPills = document.querySelectorAll('.user-pill-btn');
  const switchUserBtn = document.getElementById('btnSwitchUser');
  const activeUserAvatar = document.getElementById('activeUserAvatar');
  const activeUserName = document.getElementById('activeUserName');

  if (!overlay) return;

  // Status User & Login
  let activeUser = localStorage.getItem('bucin_active_user') || 'Dea';
  let isUnlocked = localStorage.getItem('bucin_auth_unlocked') === 'true';

  function updateActiveUserDisplay(user) {
    activeUser = user;
    localStorage.setItem('bucin_active_user', user);
    if (activeUserName) activeUserName.textContent = user === 'Dea' ? 'Dea Cantik' : 'Fauzi Pangeran';
    if (activeUserAvatar) activeUserAvatar.textContent = user === 'Dea' ? '👧' : '👦';

    // Update WhatsApp Header juga
    const waHeaderName = document.getElementById('waHeaderName');
    const waHeaderAvatar = document.getElementById('waHeaderAvatar');
    const waSenderLabel = document.getElementById('waActiveSenderLabel');
    if (waHeaderName) waHeaderName.textContent = user === 'Dea' ? 'Fauzi Gilang Raihan 🤴' : 'Dea Khitibul Umam 💚';
    if (waHeaderAvatar) waHeaderAvatar.textContent = user === 'Dea' ? '👦' : '👧';
    if (waSenderLabel) waSenderLabel.textContent = user === 'Dea' ? '👧 Dea' : '👦 Fauzi';
  }

  // Cek apakah sudah pernah login
  if (isUnlocked) {
    overlay.classList.add('unlocked');
    updateActiveUserDisplay(activeUser);
  } else {
    overlay.classList.remove('unlocked');
    updateActiveUserDisplay(activeUser);
  }

  // Pilih siapa yang login
  userPills.forEach(pill => {
    pill.addEventListener('click', () => {
      userPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const user = pill.getAttribute('data-user');
      updateActiveUserDisplay(user);
    });
  });

  // Auto focus jump antar kotak input tanggal
  if (dayInput && monthInput && yearInput) {
    dayInput.addEventListener('input', () => {
      if (dayInput.value.length >= 2) monthInput.focus();
    });
    monthInput.addEventListener('input', () => {
      if (monthInput.value.length >= 2) yearInput.focus();
    });

    [dayInput, monthInput, yearInput].forEach(inp => {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkPasscode();
      });
    });
  }

  function checkPasscode() {
    const day = (dayInput?.value || '').trim();
    const month = (monthInput?.value || '').trim();
    const year = (yearInput?.value || '').trim();

    // Syarat sah: 28 09 2026
    const isCorrectDay = day === '28';
    const isCorrectMonth = month === '09' || month === '9';
    const isCorrectYear = year === '2026';

    if (isCorrectDay && isCorrectMonth && isCorrectYear) {
      // Sukses!
      if (feedbackEl) {
        feedbackEl.className = 'auth-feedback success';
        feedbackEl.textContent = `Yeay! Tanggal jadian kita benar! Selamat datang ${activeUser} sayang! 🥰🎉`;
      }

      playChimeAudio(true);
      triggerConfetti(1.2);

      setTimeout(() => {
        overlay.classList.add('unlocked');
        localStorage.setItem('bucin_auth_unlocked', 'true');
        triggerConfetti(0.8);
      }, 700);

    } else {
      // Salah input!
      if (feedbackEl) {
        feedbackEl.className = 'auth-feedback error';
        feedbackEl.textContent = 'Ihhh salah! Masa lupa tanggal jadian kita 28-09-2026 sih yang? Coba lagi dong 🥺💔';
      }
      playChimeAudio(false);

      const card = overlay.querySelector('.auth-card');
      if (card) {
        card.style.animation = 'none';
        card.offsetHeight; // trigger reflow
        card.style.animation = 'shake 0.4s ease-in-out';
      }
    }
  }

  if (unlockBtn) unlockBtn.addEventListener('click', checkPasscode);

  // Tombol Kunci / Ganti Profil
  if (switchUserBtn) {
    switchUserBtn.addEventListener('click', () => {
      localStorage.removeItem('bucin_auth_unlocked');
      overlay.classList.remove('unlocked');
      if (feedbackEl) {
        feedbackEl.textContent = '';
        feedbackEl.className = 'auth-feedback';
      }
      if (dayInput) {
        dayInput.value = '';
        dayInput.focus();
      }
      if (monthInput) monthInput.value = '';
      if (yearInput) yearInput.value = '';
    });
  }
}

/* Web Audio Tone Helper untuk Feedback Auth */
function playChimeAudio(isSuccess) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();

    if (isSuccess) {
      // Sweet Success Chime (C5 -> E5 -> G5)
      const freqs = [523.25, 659.25, 783.99];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.45);
      });
    } else {
      // Cute gentle boop for error
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {
    console.log('Audio Feedback Error', e);
  }
}

/* ========================================================
   4. INTERACTIVE KISS EFFECT SYSTEM (DARI KUPON CINTA)
   ======================================================== */
function initKissEffectSystem() {
  const overlay = document.getElementById('kissFxOverlay');
  let kissCount = parseInt(localStorage.getItem('bucin_kiss_count') || '0', 10);

  window.triggerKissShower = function (count = 24, customMsg = null) {
    kissCount += 1;
    localStorage.setItem('bucin_kiss_count', kissCount);

    // Bunyi Muach / Kiss Pop via Web Audio
    playKissSound();

    // Tampilkan Toast Banner Manis
    const activeUser = localStorage.getItem('bucin_active_user') || 'Dea';
    const partner = activeUser === 'Dea' ? 'Fauzi' : 'Dea';
    const msg = customMsg || `Muachhh! ${partner} ngirim ciuman manis bertubi-tubi buat ${activeUser}! 💋😚`;

    const existingToast = document.querySelector('.kiss-toast-banner');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'kiss-toast-banner';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2400);

    // Hamburan Bibir & Hati Melayang
    if (overlay) {
      const kissIcons = ['💋', '😘', '💖', '👄', '✨', '💐', '🥰'];
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const item = document.createElement('div');
          item.className = 'kiss-particle-item';
          item.textContent = kissIcons[Math.floor(Math.random() * kissIcons.length)];
          
          const posX = 10 + Math.random() * 80;
          const posY = 30 + Math.random() * 50;
          const randX = (Math.random() - 0.5) * 80;

          item.style.left = `${posX}vw`;
          item.style.top = `${posY}vh`;
          item.style.setProperty('--rand-x', `${randX}px`);

          overlay.appendChild(item);
          setTimeout(() => item.remove(), 1400);
        }, i * 35);
      }
    }

    triggerConfetti(0.8);
  };
}

function playKissSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();

    // High pitch cute pop
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.22);
  } catch (e) {}
}

/* ========================================================
   5. LOVE COUNTER (HARI BERSAMA - 28 SEPTEMBER 2026)
   ======================================================== */
function initLoveCounter() {
  // Tanggal jadian resmi: 28 September 2026 (28 09 2026)
  // Pastikan migrasi mutlak ke 28 September 2026
  if (localStorage.getItem('loveStartDate_v28092026') !== '2026-09-28') {
    localStorage.setItem('loveStartDate', '2026-09-28');
    localStorage.setItem('loveStartDate_v28092026', '2026-09-28');
  }
  let startDateStr = localStorage.getItem('loveStartDate') || '2026-09-28';
  
  const daysEl = document.getElementById('daysCount');
  const hoursEl = document.getElementById('hoursCount');
  const minutesEl = document.getElementById('minutesCount');
  const secondsEl = document.getElementById('secondsCount');
  const startDateLabel = document.getElementById('startDateLabel');
  
  const editDateBtn = document.getElementById('editDateBtn');
  const dateModalOverlay = document.getElementById('dateModalOverlay');
  const dateModalClose = document.getElementById('dateModalClose');
  const dateInput = document.getElementById('dateInput');
  const saveDateBtn = document.getElementById('saveDateBtn');

  function updateLabel(dateStr) {
    if (!startDateLabel) return;
    try {
      const parts = dateStr.split('-');
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      startDateLabel.textContent = `Sejak: ${d.toLocaleDateString('id-ID', options)}`;
    } catch (e) {
      startDateLabel.textContent = `Sejak: ${dateStr}`;
    }
  }

  function updateTimer() {
    const start = new Date(startDateStr).getTime();
    const now = new Date().getTime();
    let diff = now - start;

    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateLabel(startDateStr);
  updateTimer();
  setInterval(updateTimer, 1000);

  // Edit Date Modal Handlers
  if (editDateBtn && dateModalOverlay) {
    editDateBtn.addEventListener('click', () => {
      dateInput.value = startDateStr;
      dateModalOverlay.classList.add('active');
    });

    dateModalClose.addEventListener('click', () => {
      dateModalOverlay.classList.remove('active');
    });

    dateModalOverlay.addEventListener('click', (e) => {
      if (e.target === dateModalOverlay) {
        dateModalOverlay.classList.remove('active');
      }
    });

    saveDateBtn.addEventListener('click', () => {
      if (dateInput.value) {
        startDateStr = dateInput.value;
        localStorage.setItem('loveStartDate', startDateStr);
        updateLabel(startDateStr);
        updateTimer();
        dateModalOverlay.classList.remove('active');
        triggerConfetti();
      }
    });
  }
}

/* ========================================================
   6. INTERACTIVE LOVE LETTER & TYPEWRITER EFFECT
   ======================================================== */
function initLoveLetter() {
  const envelope = document.getElementById('envelope');
  const letterBody = document.getElementById('letterTypedContent');
  const envelopeHint = document.getElementById('envelopeHint');
  
  if (!envelope || !letterBody) return;

  const letterMessage = `Setiap hari bersamamu, Dea Khitibul Umam, selalu terasa seperti secangkir matcha latte hangat—menenangkan, manis, dan bikin nyaman.\n\nFauzi bersyukur banget bisa punya bidadari seindah dan sebaik kamu di hidup Fauzi. Makasih ya Dea udah selalu ada, sabar, dan bikin dunia Fauzi penuh tawa.\n\nJangan lupa tersenyum hari ini ya sayang, karena senyummu itu alasan hidupku jadi selalu bahagia! 🍃💚`;

  let isTyping = false;
  let hasTyped = false;

  envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');

    if (envelope.classList.contains('open')) {
      if (envelopeHint) envelopeHint.textContent = "Sentuh lagi untuk menutup surat 🌿";
      triggerConfetti();

      if (!hasTyped && !isTyping) {
        isTyping = true;
        letterBody.textContent = '';
        let index = 0;

        const typingInterval = setInterval(() => {
          if (index < letterMessage.length) {
            letterBody.textContent += letterMessage.charAt(index);
            index++;
          } else {
            clearInterval(typingInterval);
            isTyping = false;
            hasTyped = true;
          }
        }, 30);
      }
    } else {
      if (envelopeHint) envelopeHint.innerHTML = `<i class="fa-regular fa-hand-pointer"></i> Sentuh amplop hijau ini untuk membuka!`;
    }
  });
}

/* ========================================================
   7. "OPEN WHEN..." CAPSULES & MODAL
   ======================================================== */
function initOpenWhenCapsules() {
  const buttons = document.querySelectorAll('.capsule-btn');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalBodyText = document.getElementById('modalBodyText');
  const modalIcon = document.getElementById('modalIcon');
  const modalActionBtn = document.getElementById('modalActionBtn');

  if (!modalOverlay) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const emoji = btn.querySelector('.capsule-emoji')?.textContent || '💌';
      const label = btn.querySelector('span:not(.capsule-emoji)')?.textContent || 'Pesan Rahasia';
      const message = btn.getAttribute('data-message');

      modalIcon.textContent = emoji;
      modalTitle.textContent = label;
      modalBodyText.textContent = message;

      modalOverlay.classList.add('active');
      triggerConfetti(0.4);
    });
  });

  const closeModal = () => modalOverlay.classList.remove('active');

  modalClose.addEventListener('click', closeModal);
  modalActionBtn.addEventListener('click', () => {
    triggerConfetti(0.8);
    closeModal();
  });
  
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

/* ========================================================
   8. RUNAWAY BUTTON MINI GAME
   ======================================================== */
function initRunawayButtonGame() {
  const btnNo = document.getElementById('btnNo');
  const btnYes = document.getElementById('btnYes');
  const container = document.getElementById('gameBtnContainer');
  const tipText = document.getElementById('gameTipText');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBodyText = document.getElementById('modalBodyText');
  const modalIcon = document.getElementById('modalIcon');

  if (!btnNo || !btnYes || !container) return;

  const escapePhrases = [
    "Eits gak kena! 😜",
    "Gak boleh nolak ya! 😝",
    "Hayo mau pencet apa? 🤭",
    "Tombol ini licin lho~ 🍃",
    "Coba lagi kalau bisa! 🏃💨"
  ];

  let phraseIndex = 0;

  const moveButton = () => {
    const containerRect = container.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    const maxLeft = containerRect.width - btnRect.width - 20;
    const maxTop = containerRect.height - btnRect.height - 10;

    const randomLeft = Math.max(10, Math.floor(Math.random() * maxLeft));
    const randomTop = Math.max(10, Math.floor(Math.random() * maxTop));

    btnNo.style.position = 'absolute';
    btnNo.style.left = `${randomLeft}px`;
    btnNo.style.top = `${randomTop}px`;

    if (tipText) {
      tipText.textContent = escapePhrases[phraseIndex % escapePhrases.length];
      tipText.style.color = '#e76f51';
      phraseIndex++;
    }
  };

  btnNo.addEventListener('mouseenter', moveButton);
  btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
  });

  btnYes.addEventListener('click', () => {
    if (modalOverlay && modalTitle && modalBodyText && modalIcon) {
      modalIcon.textContent = "🥰✨";
      modalTitle.textContent = "Yayyy! Dea Sayang Banget Sama Fauzi! 💚";
      modalBodyText.textContent = "Fauzi jauh lebih sayang banget sama Dea Khitibul Umam! Janji kita bakal terus sama-sama, makan enak bareng, dan bikin banyak momen indah lainnya! I love you to the moon and back, bidadariku! 🍀";
      modalOverlay.classList.add('active');
    }
    triggerConfetti(1.2);
    setTimeout(() => triggerConfetti(0.9), 400);
    setTimeout(() => triggerConfetti(0.7), 800);
  });
}

/* ========================================================
   9. SWEET MUSIC LOUNGE (BEBAS PILIH / UPLOAD LAGU SENDIRI)
   ======================================================== */
function initSweetMusicLounge() {
  const musicToggle = document.getElementById('musicToggle');
  const btnChangeSongPill = document.getElementById('btnChangeSongPill');
  const mobileNavMusicBtn = document.getElementById('mobileNavMusicBtn');
  const loungeModal = document.getElementById('musicLoungeModal');
  const loungeClose = document.getElementById('musicLoungeClose');
  const loungePlayToggle = document.getElementById('loungePlayToggle');
  const loungePlayIcon = document.getElementById('loungePlayIcon');
  const currentMusicTitle = document.getElementById('currentMusicTitle');
  const musicStatus = document.getElementById('musicStatus');
  const loungeTitle = document.getElementById('loungeCurrentSongTitle');
  const loungeStatus = document.getElementById('loungeCurrentSongStatus');
  const musicBox = document.querySelector('.music-now-playing-box');
  const tabBtns = document.querySelectorAll('.music-tab-btn');
  const tabPanes = document.querySelectorAll('.music-tab-pane');
  const presetItems = document.querySelectorAll('.preset-song-item');
  const customAudioUrlInput = document.getElementById('customAudioUrlInput');
  const btnPlayCustomUrl = document.getElementById('btnPlayCustomUrl');
  const customAudioFileInput = document.getElementById('customAudioFileInput');
  const musicFileDropArea = document.getElementById('musicFileDropArea');
  const dropMusicFileName = document.getElementById('dropMusicFileName');
  const uploadSongFeedback = document.getElementById('uploadSongFeedback');
  const volumeSlider = document.getElementById('musicVolumeSlider');

  let isPlaying = false;
  let activeSourceType = null; // null jika belum ada lagu yang dipilih, atau 'upload', 'lofi', 'piano', dll
  let chosenSongName = localStorage.getItem('bucin_chosen_song_name') || null;
  let audioCtx = null;
  let synthInterval = null;
  let masterGain = null;
  let html5Audio = new Audio();
  html5Audio.loop = true;

  // Frekuensi Notes untuk instrumen preset romantis
  const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, time, duration = 1.2, waveType = 'sine') {
    const ctx = getAudioContext();
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = waveType;
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.06, time + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(time);
      osc.stop(time + duration);
    } catch (e) {}
  }

  function startPresetMelody(type) {
    stopCurrentMusic();
    const ctx = getAudioContext();
    let step = 0;

    synthInterval = setInterval(() => {
      const now = ctx.currentTime;

      if (type === 'lofi') {
        const chord = [[0, 2, 4], [4, 6, 7], [1, 3, 5], [3, 5, 7]][step % 4];
        chord.forEach((n, i) => playTone(notes[n], now + (i * 0.22), 1.6, 'sine'));
        if (step % 2 === 0) playTone(notes[5 + (step % 3)], now + 0.6, 0.9, 'sine');
      } else if (type === 'piano') {
        const chord = [[0, 2, 4, 7], [1, 3, 5, 8], [4, 6, 7, 9]][step % 3];
        chord.forEach((n, i) => playTone(notes[n], now + (i * 0.16), 1.4, 'triangle'));
      } else if (type === 'musicbox') {
        const pattern = [5, 7, 9, 8, 7, 5][step % 6];
        playTone(notes[pattern], now, 0.9, 'sine');
        playTone(notes[pattern - 3], now + 0.3, 0.7, 'sine');
      } else if (type === 'sunset') {
        const chord = [[0, 4, 7], [3, 5, 8], [1, 5, 7]][step % 3];
        chord.forEach((n, i) => playTone(notes[n], now + (i * 0.28), 1.8, 'triangle'));
      }

      step++;
    }, type === 'musicbox' ? 700 : 1700);
  }

  function stopCurrentMusic() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
    if (html5Audio) {
      html5Audio.pause();
    }
  }

  function updatePlayingUI(title, status, active) {
    isPlaying = active;
    if (currentMusicTitle) currentMusicTitle.textContent = title;
    if (musicStatus) musicStatus.textContent = active ? 'Memutar Musik 🍃' : 'Musik Jeda ⏸️';
    if (loungeTitle) loungeTitle.textContent = title;
    if (loungeStatus) loungeStatus.textContent = active ? (status || 'Sedang Dimainkan 🎶') : 'Dijeda ⏸️';

    if (active) {
      musicBox?.classList.add('playing');
      musicToggle?.classList.add('playing');
      if (loungePlayIcon) loungePlayIcon.className = 'fa-solid fa-pause';
    } else {
      musicBox?.classList.remove('playing');
      musicToggle?.classList.remove('playing');
      if (loungePlayIcon) loungePlayIcon.className = 'fa-solid fa-play';
    }
  }

  // Tampilan inisial awal: jika belum pernah memilih lagu, jangan tentukan lagu sepihak
  if (chosenSongName) {
    if (currentMusicTitle) currentMusicTitle.textContent = chosenSongName;
    if (musicStatus) musicStatus.textContent = 'Klik untuk putar / ganti 🎵';
    if (loungeTitle) loungeTitle.textContent = chosenSongName;
    if (loungeStatus) loungeStatus.textContent = 'Lagu tersimpan • Siap diputar 🎶';
  } else {
    if (currentMusicTitle) currentMusicTitle.textContent = 'Pilih Musik Favorit 🎧';
    if (musicStatus) musicStatus.textContent = 'Klik untuk pilih lagu 🎵';
    if (loungeTitle) loungeTitle.textContent = 'Belum Ada Lagu Dipilih 🎧';
    if (loungeStatus) loungeStatus.textContent = 'Silakan pilih atau upload lagu di bawah 🎶';
  }

  // Buka Lounge Modal
  const openLounge = () => loungeModal?.classList.add('active');
  const closeLounge = () => loungeModal?.classList.remove('active');

  // Klik pada widget atas
  if (musicToggle) {
    musicToggle.addEventListener('click', (e) => {
      // Jika yang diklik adalah tombol ubah/setting di pill
      if (e.target.closest('#btnChangeSongPill')) {
        openLounge();
        return;
      }
      // Jika belum ada lagu yang aktif, buka lounge pemilih lagu
      if (!activeSourceType) {
        openLounge();
      } else {
        // Jika sudah ada lagu yang dipilih, klik widget memutar / menjeda
        if (!isPlaying) {
          resumeCurrentSource();
        } else {
          stopCurrentMusic();
          updatePlayingUI(currentMusicTitle.textContent, 'Dijeda', false);
        }
      }
    });
  }

  if (btnChangeSongPill) {
    btnChangeSongPill.addEventListener('click', (e) => {
      e.stopPropagation();
      openLounge();
    });
  }

  if (mobileNavMusicBtn) mobileNavMusicBtn.addEventListener('click', openLounge);
  if (loungeClose) loungeClose.addEventListener('click', closeLounge);
  loungeModal?.addEventListener('click', (e) => {
    if (e.target === loungeModal) closeLounge();
  });

  // Tab Switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      if (tabId === 'upload') document.getElementById('tabPaneUpload')?.classList.add('active');
      if (tabId === 'presets') document.getElementById('tabPanePresets')?.classList.add('active');
      if (tabId === 'url') document.getElementById('tabPaneUrl')?.classList.add('active');
    });
  });

  // Preset Selection
  presetItems.forEach(item => {
    item.addEventListener('click', () => {
      presetItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const melody = item.getAttribute('data-melody');
      activeSourceType = melody;
      const title = item.querySelector('h5')?.textContent || 'Lofi Melodi';
      localStorage.setItem('bucin_chosen_song_name', title);
      startPresetMelody(melody);
      updatePlayingUI(title, 'Memutar Melodi Manis 🎶', true);
      triggerConfetti(0.5);
    });
  });

  function resumeCurrentSource() {
    if (activeSourceType === 'html5') {
      html5Audio.play().then(() => {
        updatePlayingUI(currentMusicTitle.textContent, 'Memutar', true);
      }).catch(e => {
        openLounge();
      });
    } else if (['lofi', 'piano', 'musicbox', 'sunset'].includes(activeSourceType)) {
      startPresetMelody(activeSourceType);
      updatePlayingUI(currentMusicTitle.textContent, 'Memutar', true);
    } else {
      openLounge();
    }
  }

  // Play / Pause Toggle Button di Lounge
  if (loungePlayToggle) {
    loungePlayToggle.addEventListener('click', () => {
      if (!activeSourceType) {
        alert('Silakan pilih salah satu opsi lagu di tab bawah ya sayang! 🎵\nBisa upload MP3 dari HP atau klik salah satu melodi manis.');
        return;
      }
      if (!isPlaying) {
        resumeCurrentSource();
      } else {
        stopCurrentMusic();
        updatePlayingUI(loungeTitle.textContent, 'Dijeda', false);
      }
    });
  }

  // Play Custom URL
  if (btnPlayCustomUrl && customAudioUrlInput) {
    btnPlayCustomUrl.addEventListener('click', () => {
      const url = customAudioUrlInput.value.trim();
      if (!url) return alert('Silakan masukkan link URL lagu audio terlebih dahulu!');
      stopCurrentMusic();
      activeSourceType = 'html5';
      html5Audio.src = url;
      html5Audio.play().then(() => {
        const title = 'Lagu Pilihan Kita 🌐';
        localStorage.setItem('bucin_chosen_song_name', title);
        updatePlayingUI(title, 'Memutar URL Online 🎶', true);
        triggerConfetti(0.6);
      }).catch(err => {
        alert('Gagal memutar audio dari URL ini. Pastikan link langsung mengarah ke file mp3/audio!');
      });
    });
  }

  // Klik Drop Area membuka File Input
  if (musicFileDropArea && customAudioFileInput) {
    musicFileDropArea.addEventListener('click', () => {
      customAudioFileInput.click();
    });
  }

  // Play Uploaded MP3 File Bebas
  if (customAudioFileInput) {
    customAudioFileInput.addEventListener('change', () => {
      if (customAudioFileInput.files && customAudioFileInput.files[0]) {
        const file = customAudioFileInput.files[0];
        if (dropMusicFileName) {
          dropMusicFileName.textContent = `✅ Lagu Terpilih: ${file.name}`;
        }
        if (uploadSongFeedback) {
          uploadSongFeedback.style.display = 'block';
          uploadSongFeedback.textContent = `Yeay! "${file.name}" berhasil dipilih dan mulai diputar 💖`;
        }

        stopCurrentMusic();
        activeSourceType = 'html5';
        html5Audio.src = URL.createObjectURL(file);
        html5Audio.play().then(() => {
          const songTitle = `🎵 ${file.name.replace(/\.[^/.]+$/, '')}`;
          localStorage.setItem('bucin_chosen_song_name', songTitle);
          updatePlayingUI(songTitle, 'Memutar Lagu Pilihan Kita 💖', true);
          triggerConfetti(0.8);
        }).catch(e => {
          console.warn('Audio playback error:', e);
        });
      }
    });
  }

  // Volume Slider
  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      const vol = parseFloat(volumeSlider.value) / 100;
      if (masterGain && audioCtx) {
        masterGain.gain.setValueAtTime(vol * 0.12, audioCtx.currentTime);
      }
      if (html5Audio) {
        html5Audio.volume = vol;
      }
    });
  }
}

/* ========================================================
   10. POLAROID 3D TILT EFFECT
   ======================================================== */
function initPolaroidTilt() {
  const polaroids = document.querySelectorAll('.polaroid-card');

  polaroids.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ========================================================
   11. PHOTO / VIDEO LIGHTBOX MODAL & LIKE COUNTER
   ======================================================== */
function initPhotoLightbox() {
  const photoModalOverlay = document.getElementById('photoModalOverlay');
  const photoModalClose = document.getElementById('photoModalClose');
  const photoModalImg = document.getElementById('photoModalImg');
  const mediaWrapper = document.getElementById('photoModalMediaWrapper');
  const photoModalCaption = document.getElementById('photoModalCaption');
  const photoLoveBtn = document.getElementById('photoLoveBtn');
  const photoLoveCounter = document.getElementById('photoLoveCounter');

  if (!photoModalOverlay) return;
  let currentLikes = 0;

  window.openMediaLightbox = (src, caption, isVideo = false) => {
    if (mediaWrapper) {
      if (isVideo) {
        mediaWrapper.innerHTML = `
          <video src="${src}" controls autoplay loop style="width:100%; max-height:460px; border-radius:12px; display:block;"></video>
        `;
      } else {
        mediaWrapper.innerHTML = `
          <img src="${src}" alt="Foto Kenangan" class="photo-modal-img" style="width:100%; max-height:460px; object-fit:contain; border-radius:12px; display:block;">
        `;
      }
    }
    if (photoModalCaption) photoModalCaption.textContent = caption || 'Kenangan manis berdua 🌿';
    currentLikes = 0;
    if (photoLoveCounter) photoLoveCounter.textContent = currentLikes;

    photoModalOverlay.classList.add('active');
    triggerConfetti(0.4);
  };

  const cards = document.querySelectorAll('.polaroid-card[data-photo]');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const photoSrc = card.getAttribute('data-photo');
      const caption = card.getAttribute('data-caption');
      window.openMediaLightbox(photoSrc, caption, false);
    });
  });

  const closePhotoModal = () => photoModalOverlay.classList.remove('active');
  if (photoModalClose) photoModalClose.addEventListener('click', closePhotoModal);
  photoModalOverlay.addEventListener('click', (e) => {
    if (e.target === photoModalOverlay) closePhotoModal();
  });

  if (photoLoveBtn) {
    photoLoveBtn.addEventListener('click', () => {
      currentLikes++;
      if (photoLoveCounter) photoLoveCounter.textContent = currentLikes;
      triggerConfetti(0.7);
      if (typeof window.triggerKissShower === 'function') {
        window.triggerKissShower(8, 'Kirim cinta ke foto ini! 💖');
      }
    });
  }
}

/* ========================================================
   12. HERO PHOTO EFFECT
   ======================================================== */
function initHeroPhotoEffect() {
  const heroPhotoCard = document.getElementById('heroPhotoCard');
  if (!heroPhotoCard) return;

  heroPhotoCard.addEventListener('click', () => {
    triggerConfetti(1);
    heroPhotoCard.style.transform = 'scale(1.1) rotate(2deg)';
    setTimeout(() => {
      heroPhotoCard.style.transform = '';
    }, 400);
  });
}

/* ========================================================
   13. BUCIN METER LOGIC & OVERLOAD ANIMATION
   ======================================================== */
function initBucinMeter() {
  const btnRun = document.getElementById('btnRunMeter');
  const meterFill = document.getElementById('meterFill');
  const meterScore = document.getElementById('meterScore');
  const meterStatus = document.getElementById('meterStatus');
  const diagnosisText = document.getElementById('diagnosisText');

  if (!btnRun || !meterFill || !meterScore) return;

  let isAnalyzing = false;

  btnRun.addEventListener('click', () => {
    if (isAnalyzing) return;
    isAnalyzing = true;

    btnRun.disabled = true;
    btnRun.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Mendeteksi Getaran Cinta...`;

    meterStatus.textContent = 'Menganalisis detak jantung... 💓';
    meterStatus.style.color = '#52796f';

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        clearInterval(interval);
        meterFill.style.width = '100%';
        meterScore.textContent = '999,999%';
        meterScore.style.animation = 'heartPulse 0.5s infinite';
        meterStatus.textContent = '⚠️ STATUS: OVERLOAD BUCIN STADIUM AKHIR!';
        meterStatus.style.color = '#e63946';

        if (diagnosisText) {
          diagnosisText.innerHTML = `
            <strong>🚨 HASIL PEMERIKSAAN RESMI:</strong><br>
            • <strong>Tingkat Bucin:</strong> 999,999% (Melewati batas sistem komputer!)<br>
            • <strong>Gejala Pasien:</strong> Senyum-senyum sendiri tiap liat foto Dea, detak jantung lompat 300x lipat saat kamu panggil "sayang", dan gak bisa fokus karena selalu mikirin kamu.<br>
            • <strong>Resep Obat Dokter:</strong> Wajib diberi pelukan hangat, cium pipi, dan diajak jajan makanan enak sesegera mungkin! 🍵💚
          `;
        }

        triggerConfetti(1.5);
        if (typeof window.triggerKissShower === 'function') {
          window.triggerKissShower(16, 'Overload cinta terdeteksi! Muachhh! 💋');
        }

        btnRun.disabled = false;
        btnRun.innerHTML = `<i class="fa-solid fa-redo"></i> Uji Ulang (Pasti Tetap 999%)`;
        isAnalyzing = false;
      } else {
        meterFill.style.width = `${current}%`;
        meterScore.textContent = `${current}%`;
      }
    }, 60);
  });
}

/* ========================================================
   14. KUPON CINTA BUCIN (CUSTOM DARI FAUZI + KUPON CIUMAN)
   ======================================================== */
function initLoveCoupons() {
  const dynamicPlaceholder = document.getElementById('dynamicCouponsPlaceholder');
  const btnOpenAddCoupon = document.getElementById('btnOpenAddCouponModal');
  const addCouponModal = document.getElementById('addCouponModal');
  const addCouponClose = document.getElementById('addCouponClose');
  const btnCancelAddCoupon = document.getElementById('btnCancelAddCoupon');
  const btnSaveCoupon = document.getElementById('btnSaveCoupon');

  const couponTitleInput = document.getElementById('couponTitleInput');
  const couponEmojiSelect = document.getElementById('couponEmojiSelect');
  const couponTagSelect = document.getElementById('couponTagSelect');
  const couponDescInput = document.getElementById('couponDescInput');

  // Load custom coupons
  let customCoupons = [];
  try {
    customCoupons = JSON.parse(localStorage.getItem('bucin_custom_coupons') || '[]');
  } catch (e) {
    customCoupons = [];
  }

  function renderCustomCoupons() {
    if (!dynamicPlaceholder) return;
    dynamicPlaceholder.innerHTML = '';

    customCoupons.forEach((coupon, index) => {
      const card = document.createElement('div');
      card.className = `coupon-card ${coupon.claimed ? 'claimed' : ''}`;
      card.innerHTML = `
        <div class="coupon-left">
          <span class="coupon-tag">${coupon.tag || 'JANJI COWO'}</span>
          <span class="coupon-icon">${coupon.emoji || '🎁'}</span>
        </div>
        <div class="coupon-middle">
          <h4>${coupon.title}</h4>
          <p>${coupon.desc}</p>
        </div>
        <div class="coupon-right">
          <button class="coupon-claim-btn" data-custom-index="${index}" data-title="${coupon.title}">
            ${coupon.claimed ? 'Terklaim ✅' : 'Klaim Kupon'}
          </button>
        </div>
      `;
      dynamicPlaceholder.appendChild(card);
    });

    bindCouponClickEvents();
  }

  function bindCouponClickEvents() {
    const claimBtns = document.querySelectorAll('.coupon-claim-btn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalBodyText = document.getElementById('modalBodyText');
    const modalIcon = document.getElementById('modalIcon');
    const modalActionBtn = document.getElementById('modalActionBtn');

    claimBtns.forEach(btn => {
      // Hilangkan listener ganda
      btn.onclick = () => {
        const card = btn.closest('.coupon-card');
        const title = btn.getAttribute('data-title') || 'Kupon Manja';
        const isKiss = btn.getAttribute('data-type') === 'kiss';
        const customIdx = btn.getAttribute('data-custom-index');

        if (card.classList.contains('claimed')) {
          if (modalOverlay) {
            modalIcon.textContent = "🎟️";
            modalTitle.textContent = "Kupon Sudah Kamu Klaim!";
            modalBodyText.textContent = `Kamu sudah mengaktifkan kupon "${title}". Jangan lupa tagih langsung ke Fauzi ya! 😉`;
            modalOverlay.classList.add('active');
          }
          return;
        }

        // Tandai claimed
        card.classList.add('claimed');
        btn.textContent = 'Terklaim ✅';

        if (customIdx !== null && customCoupons[customIdx]) {
          customCoupons[customIdx].claimed = true;
          localStorage.setItem('bucin_custom_coupons', JSON.stringify(customCoupons));
        }

        // Jika Kupon Ciuman: Ledakkan Ciuman di Layar!
        if (isKiss && typeof window.triggerKissShower === 'function') {
          window.triggerKissShower(30, 'Kupon Ciuman Berhasil Diklaim! Muachhh bertubi-tubi! 💋😚');
        } else {
          triggerConfetti(0.8);
        }

        // Tampilkan Popup WhatsApp Claim
        if (modalOverlay && modalTitle && modalBodyText && modalIcon) {
          modalIcon.textContent = isKiss ? "💋" : "🎉";
          modalTitle.textContent = isKiss ? "Yeay! Ciuman Tanpa Batas Diaktifkan! 💋" : "Yeay! Kupon Berhasil Diklaim!";
          modalBodyText.innerHTML = `
            Kupon <strong>"${title}"</strong> sudah resmi aktif!<br><br>
            Kirim tagihan sekarang via WhatsApp biar Fauzi langsung siap melayani & manjain kamu! 💚
          `;

          if (modalActionBtn) {
            modalActionBtn.textContent = 'Kirim Tagihan ke WhatsApp Fauzi 📲';
            modalActionBtn.onclick = () => {
              const text = encodeURIComponent(`Halo Fauzi sayang! 🥰 Aku (Dea) baru aja klaim kupon "${title}" di website cinta kita nih! Wajib diturutin yaa! 💚🍀`);
              window.open(`https://wa.me/?text=${text}`, '_blank');
              modalOverlay.classList.remove('active');
            };
          }
          modalOverlay.classList.add('active');
        }
      };
    });
  }

  // Modal Tambah Kupon Handlers
  const openAddModal = () => addCouponModal?.classList.add('active');
  const closeAddModal = () => addCouponModal?.classList.remove('active');

  if (btnOpenAddCoupon) btnOpenAddCoupon.addEventListener('click', openAddModal);
  if (addCouponClose) addCouponClose.addEventListener('click', closeAddModal);
  if (btnCancelAddCoupon) btnCancelAddCoupon.addEventListener('click', closeAddModal);
  addCouponModal?.addEventListener('click', (e) => {
    if (e.target === addCouponModal) closeAddModal();
  });

  if (btnSaveCoupon) {
    btnSaveCoupon.addEventListener('click', () => {
      const title = couponTitleInput?.value.trim();
      const emoji = couponEmojiSelect?.value || '🎁';
      const tag = couponTagSelect?.value || 'JANJI COWO';
      const desc = couponDescInput?.value.trim();

      if (!title || !desc) {
        alert('Mohon isi nama kupon dan janji manja Fauzi!');
        return;
      }

      customCoupons.push({
        id: Date.now(),
        title,
        emoji,
        tag,
        desc,
        claimed: false
      });

      localStorage.setItem('bucin_custom_coupons', JSON.stringify(customCoupons));
      renderCustomCoupons();
      closeAddModal();

      // Reset form
      if (couponTitleInput) couponTitleInput.value = '';
      if (couponDescInput) couponDescInput.value = '';

      triggerConfetti(1);
    });
  }

  renderCustomCoupons();
}

/* ========================================================
   15. FLIP CARD ALASAN FAUZI SAYANG DEA
   ======================================================== */
function initReasonCardsFlip() {
  const cards = document.querySelectorAll('.reason-card[data-flip]');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      triggerConfetti(0.4);
    });
  });
}

/* ========================================================
   16. GALERI FOTO & VIDEO TANPA BATAS (INDEXEDDB & VIDEO CANVAS)
   ======================================================== */
function initMemoriesAndVideoGallery() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const mainGrid = document.getElementById('mainMediaGrid');
  const dynamicPlaceholder = document.getElementById('dynamicMediaPlaceholder');
  const totalCountEl = document.getElementById('totalMediaCount');
  const openUploadBtn = document.getElementById('btnOpenUploadModal');
  const uploadModal = document.getElementById('uploadMediaModal');
  const uploadClose = document.getElementById('uploadMediaClose');
  const btnCancelUpload = document.getElementById('btnCancelUpload');
  const btnSaveMedia = document.getElementById('btnSaveMedia');

  const typePillBtns = document.querySelectorAll('.type-pill-btn');
  const fileInput = document.getElementById('mediaFileInput');
  const dropText = document.getElementById('dropFileName');
  const urlInput = document.getElementById('mediaUrlInput');
  const titleInput = document.getElementById('mediaTitleInput');
  const uploaderSelect = document.getElementById('mediaUploaderSelect');
  const captionInput = document.getElementById('mediaCaptionInput');
  const previewBox = document.getElementById('mediaUploadPreview');

  let selectedType = 'photo'; // 'photo' or 'video'
  let currentFileBlob = null;

  // Inisialisasi Featured Canvas Video Loop
  initFeaturedRomanticVideoCanvas();

  // Inisialisasi IndexedDB untuk Foto & Video Tanpa Batas
  const DB_NAME = 'BucinMemoriesDB';
  const DB_VERSION = 1;
  let db = null;

  const request = indexedDB.open(DB_NAME, DB_VERSION);
  request.onupgradeneeded = (e) => {
    db = e.target.result;
    if (!db.objectStoreNames.contains('memories')) {
      db.createObjectStore('memories', { keyPath: 'id' });
    }
  };

  request.onsuccess = (e) => {
    db = e.target.result;
    loadMemoriesFromDB();
  };

  function loadMemoriesFromDB() {
    if (!db) return;
    const tx = db.transaction('memories', 'readonly');
    const store = tx.objectStore('memories');
    const getAllReq = store.getAll();

    getAllReq.onsuccess = () => {
      const items = getAllReq.result || [];
      renderDynamicMemories(items);
    };
  }

  function renderDynamicMemories(items) {
    if (!dynamicPlaceholder) return;
    dynamicPlaceholder.innerHTML = '';

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = `polaroid-card ${item.type === 'video' ? 'video-polaroid-card' : ''}`;
      card.setAttribute('data-media-type', item.type);
      card.setAttribute('data-id', item.id);

      if (item.type === 'video') {
        card.innerHTML = `
          <div class="tape-sticker"></div>
          <span class="user-uploaded-badge">Oleh: ${item.uploader} 🍃</span>
          <div class="polaroid-video-wrapper">
            <video src="${item.mediaData}" class="polaroid-video-el" loop muted playsinline></video>
            <div class="video-overlay-play"><i class="fa-solid fa-circle-play"></i></div>
            <div class="video-badge-tag"><i class="fa-solid fa-video"></i> Video Bucin</div>
          </div>
          <div class="polaroid-caption">
            <p>${item.title}</p>
            <span class="polaroid-date">${item.date || 'Kenangan Indah'}</span>
          </div>
          <div class="heart-badge"><i class="fa-solid fa-heart"></i></div>
          <button class="btn-delete-card" title="Hapus Momen Ini"><i class="fa-solid fa-trash"></i></button>
        `;

        // Video play on click / lightbox
        card.addEventListener('click', (e) => {
          if (e.target.closest('.btn-delete-card')) return;
          if (typeof window.openMediaLightbox === 'function') {
            window.openMediaLightbox(item.mediaData, `${item.title} — ${item.caption || ''}`, true);
          }
        });

      } else {
        card.innerHTML = `
          <div class="tape-sticker"></div>
          <span class="user-uploaded-badge">Oleh: ${item.uploader} 🌸</span>
          <div class="polaroid-img-wrapper">
            <img src="${item.mediaData}" alt="${item.title}" class="polaroid-img">
          </div>
          <div class="polaroid-caption">
            <p>${item.title}</p>
            <span class="polaroid-date">${item.date || 'Kenangan Indah'}</span>
          </div>
          <div class="heart-badge"><i class="fa-solid fa-heart"></i></div>
          <button class="btn-delete-card" title="Hapus Momen Ini"><i class="fa-solid fa-trash"></i></button>
        `;

        card.addEventListener('click', (e) => {
          if (e.target.closest('.btn-delete-card')) return;
          if (typeof window.openMediaLightbox === 'function') {
            window.openMediaLightbox(item.mediaData, `${item.title} — ${item.caption || ''}`, false);
          }
        });
      }

      // Delete action
      const deleteBtn = card.querySelector('.btn-delete-card');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm('Yakin ingin menghapus momen kenangan ini?')) {
            deleteMemoryFromDB(item.id);
          }
        });
      }

      dynamicPlaceholder.appendChild(card);
    });

    updateMediaCount();
  }

  function deleteMemoryFromDB(id) {
    if (!db) return;
    const tx = db.transaction('memories', 'readwrite');
    tx.objectStore('memories').delete(id);
    tx.oncomplete = () => loadMemoriesFromDB();
  }

  function updateMediaCount() {
    const allCards = document.querySelectorAll('#mainMediaGrid .polaroid-card');
    if (totalCountEl) totalCountEl.textContent = allCards.length;
  }

  // Filter Tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      const allCards = document.querySelectorAll('#mainMediaGrid .polaroid-card');
      allCards.forEach(card => {
        const type = card.getAttribute('data-media-type');
        if (filter === 'all' || type === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Upload Handlers
  const openModal = () => uploadModal?.classList.add('active');
  const closeModal = () => uploadModal?.classList.remove('active');

  if (openUploadBtn) openUploadBtn.addEventListener('click', openModal);
  if (uploadClose) uploadClose.addEventListener('click', closeModal);
  if (btnCancelUpload) btnCancelUpload.addEventListener('click', closeModal);
  uploadModal?.addEventListener('click', (e) => {
    if (e.target === uploadModal) closeModal();
  });

  // Pilih Tipe Momen
  typePillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typePillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedType = btn.getAttribute('data-type');
      if (dropText) dropText.textContent = selectedType === 'video' ? 'Pilih Video (MP4 / WebM)' : 'Pilih Foto (JPG / PNG)';
    });
  });

  // File Picker Change
  if (fileInput) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        if (dropText) dropText.textContent = file.name;

        const reader = new FileReader();
        reader.onload = (e) => {
          currentFileBlob = e.target.result;
          if (previewBox) {
            if (file.type.startsWith('video/')) {
              selectedType = 'video';
              typePillBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-type') === 'video'));
              previewBox.innerHTML = `<video src="${currentFileBlob}" controls style="max-height:160px;"></video>`;
            } else {
              selectedType = 'photo';
              typePillBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-type') === 'photo'));
              previewBox.innerHTML = `<img src="${currentFileBlob}" style="max-height:160px;">`;
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // URL Input Change Preview
  if (urlInput) {
    urlInput.addEventListener('input', () => {
      const url = urlInput.value.trim();
      if (url && previewBox) {
        if (selectedType === 'video') {
          previewBox.innerHTML = `<video src="${url}" controls style="max-height:160px;"></video>`;
        } else {
          previewBox.innerHTML = `<img src="${url}" style="max-height:160px;">`;
        }
      }
    });
  }

  // Save Media to IndexedDB
  if (btnSaveMedia) {
    btnSaveMedia.addEventListener('click', () => {
      const mediaData = currentFileBlob || urlInput?.value.trim();
      const title = titleInput?.value.trim() || (selectedType === 'video' ? 'Video Bucin Kita 🎬' : 'Momen Manis Kita 📸');
      const uploader = uploaderSelect?.value || 'Fauzi';
      const caption = captionInput?.value.trim() || '';

      if (!mediaData) {
        alert('Silakan pilih file foto/video atau masukkan URL media!');
        return;
      }

      if (!db) {
        alert('Database browser sedang bersiap, silakan coba 2 detik lagi!');
        return;
      }

      const newRecord = {
        id: Date.now(),
        type: selectedType,
        title,
        uploader,
        caption,
        mediaData,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        createdAt: Date.now()
      };

      const tx = db.transaction('memories', 'readwrite');
      tx.objectStore('memories').add(newRecord);

      tx.oncomplete = () => {
        loadMemoriesFromDB();
        closeModal();

        // Reset inputs
        currentFileBlob = null;
        if (fileInput) fileInput.value = '';
        if (urlInput) urlInput.value = '';
        if (titleInput) titleInput.value = '';
        if (captionInput) captionInput.value = '';
        if (previewBox) previewBox.innerHTML = '';
        if (dropText) dropText.textContent = 'Pilih Foto atau Video';

        triggerConfetti(1.2);
      };
    });
  }
}

/* ========================================================
   FEATURED CANVAS ROMANTIC VIDEO GENERATOR & CONTROLS
   ======================================================== */
function initFeaturedRomanticVideoCanvas() {
  const canvas = document.getElementById('featuredRomanticVideoCanvas');
  const playOverlay = document.getElementById('btnPlayFeaturedVideo');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let isPlaying = false;
  let animId = null;
  let t = 0;

  function drawFrame() {
    t += 0.02;
    const w = canvas.width;
    const h = canvas.height;

    // Background gradient (Warm Matcha Twilight)
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#2d4030');
    grad.addColorStop(0.5, '#405d46');
    grad.addColorStop(1, '#6b8f71');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Glowing Moon
    ctx.beginPath();
    ctx.arc(w * 0.75, 90, 42, 0, Math.PI * 2);
    ctx.fillStyle = '#fff4e6';
    ctx.shadowColor = '#ffe3b3';
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Twinkling stars
    for (let i = 0; i < 24; i++) {
      const sx = (Math.sin(i * 99 + t * 0.5) * 0.5 + 0.5) * w;
      const sy = (Math.cos(i * 33 + t * 0.3) * 0.5 + 0.5) * (h * 0.55);
      const alpha = Math.sin(t * 2 + i) * 0.4 + 0.6;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(sx, sy, 2, 2);
    }

    // Couple Silhouettes holding hands on a gentle hill
    ctx.beginPath();
    ctx.ellipse(w / 2, h + 80, w * 0.75, 180, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1b281f';
    ctx.fill();

    // Fauzi Silhouette
    ctx.fillStyle = '#1b281f';
    ctx.beginPath();
    ctx.arc(w / 2 - 28, h - 170, 18, 0, Math.PI * 2); // Head
    ctx.fill();
    ctx.fillRect(w / 2 - 38, h - 152, 22, 50); // Body

    // Dea Silhouette
    ctx.beginPath();
    ctx.arc(w / 2 + 20, h - 165, 17, 0, Math.PI * 2); // Head
    ctx.fill();
    ctx.fillRect(w / 2 + 10, h - 148, 20, 48); // Body

    // Pulsing Heart floating above couple
    const heartScale = 1 + Math.sin(t * 3) * 0.15;
    ctx.save();
    ctx.translate(w / 2 - 4, h - 220 + Math.sin(t * 2) * 6);
    ctx.scale(heartScale, heartScale);
    ctx.fillStyle = '#e63946';
    ctx.shadowColor = '#ff4d6d';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-15, -15, -28, 8, 0, 32);
    ctx.bezierCurveTo(28, 8, 15, -15, 0, 0);
    ctx.fill();
    ctx.restore();

    // Cinematic Text Overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '700 16px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Fauzi & Dea • Selamanya 🌿', w / 2, h - 45);

    if (isPlaying) {
      animId = requestAnimationFrame(drawFrame);
    }
  }

  // Render first frame
  drawFrame();

  if (playOverlay) {
    playOverlay.addEventListener('click', (e) => {
      e.stopPropagation();
      isPlaying = !isPlaying;
      if (isPlaying) {
        playOverlay.style.opacity = '0';
        animId = requestAnimationFrame(drawFrame);
      } else {
        playOverlay.style.opacity = '1';
        cancelAnimationFrame(animId);
      }
    });

    canvas.parentElement?.addEventListener('click', () => {
      if (typeof window.openMediaLightbox === 'function') {
        window.openMediaLightbox('assets/images/photo1_couple_mirror.jpg', 'Our Cinematic Love Story 🎬🍃 (Fauzi & Dea)', false);
      }
    });
  }
}

/* ========================================================
   17. BUCIN WHATSAPP MESSENGER (KABAR-KABARAN SEPERTI WA)
   ======================================================== */
function initWhatsAppMessenger() {
  const teaserCard = document.getElementById('waTeaserCard');
  const chatWindow = document.getElementById('waAppWindow');
  const btnToggleWa = document.getElementById('btnToggleWaWindow');
  const btnCloseWa = document.getElementById('btnCloseWaWindow');
  const floatingWaBtn = document.getElementById('floatingWaBtn');
  const heroWaBtn = document.querySelector('.btn-wa-glow');

  const container = document.getElementById('waMessagesContainer');
  const input = document.getElementById('waMessageInput');
  const sendBtn = document.getElementById('waSendBtn');
  const photoInput = document.getElementById('waPhotoInput');
  const senderToggleBtn = document.getElementById('waSenderToggle');
  const senderLabel = document.getElementById('waActiveSenderLabel');
  const headerName = document.getElementById('waHeaderName');
  const headerAvatar = document.getElementById('waHeaderAvatar');
  const typingStatus = document.getElementById('waTypingStatus');
  const autoReplyToggle = document.getElementById('waAutoReplyToggle');
  const clearChatBtn = document.getElementById('waClearChatBtn');
  const stickers = document.querySelectorAll('.wa-quick-chip');
  const callBtn = document.getElementById('btnWaSimulateCall');

  if (!container) return;

  // Buka & Tutup Chat Window
  function openWaChat(focusInput = true) {
    if (chatWindow) chatWindow.style.display = 'flex';
    if (teaserCard) teaserCard.style.display = 'none';
    const chatSection = document.getElementById('waChatSection');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (focusInput && input) {
      setTimeout(() => input.focus(), 350);
    }
    triggerConfetti(0.4);
  }

  function closeWaChat() {
    if (chatWindow) chatWindow.style.display = 'none';
    if (teaserCard) teaserCard.style.display = 'flex';
  }

  if (btnToggleWa) btnToggleWa.addEventListener('click', () => openWaChat(true));
  if (btnCloseWa) btnCloseWa.addEventListener('click', closeWaChat);
  if (floatingWaBtn) floatingWaBtn.addEventListener('click', () => openWaChat(true));
  if (heroWaBtn) {
    heroWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openWaChat(true);
    });
  }

  // Hook nav item mobile chat
  const mobileChatNav = document.querySelector('.mobile-bottom-nav a[href="#waChatSection"]');
  if (mobileChatNav) {
    mobileChatNav.addEventListener('click', () => {
      openWaChat(true);
    });
  }

  // Database IndexedDB untuk Chat
  const CHAT_DB_NAME = 'BucinChatsDB';
  let chatDb = null;
  let activeSender = localStorage.getItem('bucin_active_user') || 'Fauzi';

  function updateSenderToggleUI() {
    if (senderLabel) senderLabel.textContent = activeSender === 'Fauzi' ? '👦 Fauzi' : '👧 Dea';
    if (headerName) headerName.textContent = activeSender === 'Fauzi' ? 'Dea Khitibul Umam 💚' : 'Fauzi Gilang Raihan 🤴';
    if (headerAvatar) headerAvatar.textContent = activeSender === 'Fauzi' ? '👧' : '👦';
  }

  if (senderToggleBtn) {
    senderToggleBtn.addEventListener('click', () => {
      activeSender = activeSender === 'Fauzi' ? 'Dea' : 'Fauzi';
      localStorage.setItem('bucin_active_user', activeSender);
      updateSenderToggleUI();
      loadChats();
    });
  }

  updateSenderToggleUI();

  const req = indexedDB.open(CHAT_DB_NAME, 1);
  req.onupgradeneeded = (e) => {
    chatDb = e.target.result;
    if (!chatDb.objectStoreNames.contains('chats')) {
      chatDb.createObjectStore('chats', { keyPath: 'id' });
    }
  };

  req.onsuccess = (e) => {
    chatDb = e.target.result;

    // Kosongkan obrolan awal sesuai permintaan user
    if (localStorage.getItem('bucin_chats_reset_v3') !== 'true') {
      const resetTx = chatDb.transaction('chats', 'readwrite');
      resetTx.objectStore('chats').clear();
      resetTx.oncomplete = () => {
        localStorage.setItem('bucin_chats_reset_v3', 'true');
        loadChats();
      };
    } else {
      loadChats();
    }
  };

  function loadChats() {
    if (!chatDb) return;
    const tx = chatDb.transaction('chats', 'readonly');
    const store = tx.objectStore('chats');
    const getAllReq = store.getAll();

    getAllReq.onsuccess = () => {
      renderChatMessages(getAllReq.result || []);
    };
  }

  function renderChatMessages(chats) {
    // Sisakan header tanggal
    container.innerHTML = `
      <div class="wa-date-divider">
        <span>28 September 2026 • Awal Cerita Kita 💍</span>
      </div>
    `;

    // Jika belum ada chat, tampilkan status kosong yang manis
    if (!chats || chats.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'wa-empty-chat-state';
      emptyDiv.innerHTML = `
        <div class="empty-chat-icon-wrap">
          <i class="fa-regular fa-comments"></i>
        </div>
        <h4>Obrolan Masih Kosong 🌿</h4>
        <p>Ruang obrolan ini khusus untuk Fauzi & Dea. Mulai kirim kabar pertama atau kata-kata manis di bawah! 💚✨</p>
      `;
      container.appendChild(emptyDiv);
      return;
    }

    chats.forEach(msg => {
      const isSent = msg.sender === activeSender;
      const bubble = document.createElement('div');
      bubble.className = `wa-msg-bubble ${isSent ? 'sent' : 'received'}`;

      let contentHtml = '';
      if (!isSent) {
        contentHtml += `<div class="wa-msg-sender-tag">${msg.sender}</div>`;
      }
      if (msg.img) {
        contentHtml += `<img src="${msg.img}" alt="Foto Kiriman" class="wa-msg-img" style="max-height: 180px; width: 100%; object-fit: cover;">`;
      }
      if (msg.text) {
        contentHtml += `<div class="wa-msg-text">${escapeHtml(msg.text)}</div>`;
      }

      contentHtml += `
        <div class="wa-msg-footer">
          <span>${msg.time || 'Baru saja'}</span>
          ${isSent ? '<i class="fa-solid fa-check-double wa-msg-ticks"></i>' : ''}
        </div>
      `;

      bubble.innerHTML = contentHtml;
      container.appendChild(bubble);
    });

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function saveAndSend(text, img = null) {
    if (!text && !img) return;
    if (!chatDb) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMsg = {
      id: Date.now(),
      sender: activeSender,
      text: text || '',
      img: img || null,
      time: timeStr
    };

    const tx = chatDb.transaction('chats', 'readwrite');
    tx.objectStore('chats').add(newMsg);

    tx.oncomplete = () => {
      loadChats();
      if (input) input.value = '';

      // Efek Ciuman jika ada kata cium / muach / love
      if (text && (text.toLowerCase().includes('muach') || text.toLowerCase().includes('cium') || text.includes('💋'))) {
        if (typeof window.triggerKissShower === 'function') {
          window.triggerKissShower(14, `${activeSender} mengirim ciuman di chat! 💋`);
        }
      }

      // Simulasi Balasan Otomatis Manis jika aktif
      if (autoReplyToggle && autoReplyToggle.checked) {
        simulatePartnerReply();
      }
    };
  }

  function simulatePartnerReply() {
    const partner = activeSender === 'Fauzi' ? 'Dea' : 'Fauzi';

    const repliesDea = [
      "Iyaa Fauzi sayangku! Aku juga kangen banget sama kamu! 🥺💚",
      "Muachhh! Jangan lupa makan yaa pangeranku yang paling ganteng! 🌸",
      "Aaaa salting banget bacanya! Nanti sore jemput aku yaa! 🥰🍵",
      "Love you more than matcha latte sedunia! 💍✨",
      "Kamu jangan capek-capek ya, Dea selalu ada buat kamu! Peluk erat! 🤗"
    ];

    const repliesFauzi = [
      "Iya bidadariku tercinta Dea! Pokoknya hari ini apa aja mau kamu, aku nurut! 💚",
      "Muachhh 1000x buat pacar tergemas sedunia! Jangan cemberut ya sayang! 💋",
      "Siap laksanakan nyonya ratuku! Aku jemput tepat waktu ya! 🚗✨",
      "Dea itu obat paling ampuh kalau aku lagi capek. Makasih ya sayang! 🌸",
      "Fauzi sayang banget sama Dea Khitibul Umam selamanya! 💍🍃"
    ];

    const pool = partner === 'Dea' ? repliesDea : repliesFauzi;
    const randomReply = pool[Math.floor(Math.random() * pool.length)];

    setTimeout(() => {
      if (typingStatus) typingStatus.textContent = `${partner} sedang mengetik pesan cinta... 🍃`;

      setTimeout(() => {
        if (typingStatus) typingStatus.textContent = 'online • sedang kangen banget... 🌸';

        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const replyMsg = {
          id: Date.now() + 1,
          sender: partner,
          text: randomReply,
          img: null,
          time: timeStr
        };

        const tx = chatDb.transaction('chats', 'readwrite');
        tx.objectStore('chats').add(replyMsg);
        tx.oncomplete = () => loadChats();
      }, 1400);
    }, 1200);
  }

  // Kirim via Tombol Send
  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => {
      saveAndSend(input.value.trim());
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveAndSend(input.value.trim());
      }
    });
  }

  // Kirim Stiker Cepat
  stickers.forEach(chip => {
    chip.addEventListener('click', () => {
      const stickerText = chip.getAttribute('data-sticker') || chip.textContent;
      saveAndSend(stickerText);
    });
  });

  // Kirim Foto di Chat
  if (photoInput) {
    photoInput.addEventListener('change', () => {
      if (photoInput.files && photoInput.files[0]) {
        const file = photoInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          saveAndSend('Foto Kenangan Kita 📸', e.target.result);
          photoInput.value = '';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Bersihkan Riwayat Chat
  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      if (confirm('Yakin ingin menghapus semua riwayat obrolan di WA ini?')) {
        if (chatDb) {
          const tx = chatDb.transaction('chats', 'readwrite');
          tx.objectStore('chats').clear();
          tx.oncomplete = () => {
            loadChats();
          };
        }
      }
    });
  }

  // Video Call Simulation
  if (callBtn) {
    callBtn.addEventListener('click', () => {
      const partner = activeSender === 'Fauzi' ? 'Dea' : 'Fauzi';
      const modalOverlay = document.getElementById('modalOverlay');
      const modalTitle = document.getElementById('modalTitle');
      const modalBodyText = document.getElementById('modalBodyText');
      const modalIcon = document.getElementById('modalIcon');

      if (modalOverlay) {
        modalIcon.textContent = "🎥🥰";
        modalTitle.textContent = `Video Call Mesra dengan ${partner}`;
        modalBodyText.innerHTML = `
          Tersambung ke kamera hati ${partner}!<br><br>
          "Halo sayangku yang paling ganteng & cantik! Senyum dulu dong biar dunia makin cerah! I love you so much!" 💚💋
        `;
        modalOverlay.classList.add('active');
        triggerConfetti(0.9);
      }
    });
  }
}

/* ========================================================
   18. MOBILE BOTTOM NAVIGATION HELPER
   ======================================================== */
function initMobileBottomNav() {
  const navItems = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item[href]');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

/* ========================================================
   CONFETTI BURST HELPER (CANVAS CONFETTI)
   ======================================================== */
function triggerConfetti(scale = 1) {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: Math.floor(65 * scale),
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#52796f', '#84a98c', '#a8d5ba', '#e76f51', '#f4a261', '#ffd166', '#ff758f']
    });
  }
}
