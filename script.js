/* ========================================================
   OUR SWEET JOURNEY - SCRIPT & ANIMATIONS
   Modern Cute Green Theme (Matcha & Sage)
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi Partikel Daun / Hati Melayang di Background
  initFloatingLeaves();

  // 2. Sparkle Trail saat Kursor / Layar Disentuh
  initSparkleTrail();

  // 3. Penghitung Hari Bersama (Live Counter)
  initLoveCounter();

  // 4. Amplop Surat Cinta Interaktif & Typewriter
  initLoveLetter();

  // 5. "Open When..." Toples Pesan
  initOpenWhenCapsules();

  // 6. Mini Game Tombol Kabur ("Gak Mau") & Jawaban "Iya"
  initRunawayButtonGame();

  // 7. Sweet Lofi Audio Synthesizer (Bisa Play Langsung tanpa file eksternal)
  initLofiAudioPlayer();

  // 8. Efek 3D Tilt Sederhana untuk Polaroid
  initPolaroidTilt();

  // 9. Photo Lightbox Modal & Like Counter
  initPhotoLightbox();

  // 10. Hero Photo Interactivity
  initHeroPhotoEffect();

  // 11. Bucin Meter Interaktif
  initBucinMeter();

  // 12. Kupon Cinta Bucin
  initLoveCoupons();

  // 13. Flip Card Alasan Sayang Dea
  initReasonCardsFlip();
});

/* ========================================================
   1. FLOATING LEAVES & HEARTS (BACKGROUND)
   ======================================================== */
function initFloatingLeaves() {
  const container = document.getElementById('ambientBg');
  if (!container) return;

  const emojis = ['🍀', '🍃', '🌿', '🌱', '💚', '✨'];
  const count = 16;

  for (let i = 0; i < count; i++) {
    createLeaf(container, emojis);
  }
}

function createLeaf(container, emojis) {
  const leaf = document.createElement('div');
  leaf.className = 'floating-leaf';
  leaf.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  
  // Random horizontal position, size, and delay
  const leftPos = Math.random() * 95;
  const animDuration = 10 + Math.random() * 14; // 10s - 24s
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
  const sparkleSymbols = ['✨', '🍃', '💚', '🌸', '⭐'];
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
   3. LOVE COUNTER (HARI BERSAMA)
   ======================================================== */
function initLoveCounter() {
  // Default anniversary date: 14 Feb 2024
  let startDateStr = localStorage.getItem('loveStartDate') || '2024-02-14';
  
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
   4. INTERACTIVE LOVE LETTER & TYPEWRITER EFFECT
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
        }, 32);
      }
    } else {
      if (envelopeHint) envelopeHint.innerHTML = `<i class="fa-regular fa-hand-pointer"></i> Sentuh amplop hijau ini untuk membuka!`;
    }
  });
}

/* ========================================================
   5. "OPEN WHEN..." CAPSULES & MODAL
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
   6. RUNAWAY BUTTON MINI GAME
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

    // Hitung posisi acak di dalam container
    const maxLeft = containerRect.width - btnRect.width - 20;
    const maxTop = containerRect.height - btnRect.height - 10;

    const randomLeft = Math.max(10, Math.floor(Math.random() * maxLeft));
    const randomTop = Math.max(10, Math.floor(Math.random() * maxTop));

    btnNo.style.position = 'absolute';
    btnNo.style.left = `${randomLeft}px`;
    btnNo.style.top = `${randomTop}px`;

    // Ubah teks tips lucu
    if (tipText) {
      tipText.textContent = escapePhrases[phraseIndex % escapePhrases.length];
      tipText.style.color = '#e76f51';
      phraseIndex++;
    }
  };

  // Kabur saat kursor mendekat atau layar disentuh
  btnNo.addEventListener('mouseenter', moveButton);
  btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
  });

  // Saat pacar klik "Iya, Sayang Banget!"
  btnYes.addEventListener('click', () => {
    if (modalOverlay && modalTitle && modalBodyText && modalIcon) {
      modalIcon.textContent = "🥰✨";
      modalTitle.textContent = "Yayyy! Dea Sayang Banget Sama Fauzi! 💚";
      modalBodyText.textContent = "Fauzi jauh lebih sayang banget sama Dea Khitibul Umam! Janji kita bakal terus sama-sama, makan enak bareng, dan bikin banyak momen indah lainnya! I love you to the moon and back, bidadariku! 🍀";
      modalOverlay.classList.add('active');
    }
    // Mega Confetti Blast
    triggerConfetti(1.2);
    setTimeout(() => triggerConfetti(0.9), 400);
    setTimeout(() => triggerConfetti(0.7), 800);
  });
}

/* ========================================================
   7. LOFI SWEET AUDIO SYNTHESIZER (WEB AUDIO API)
   ======================================================== */
function initLofiAudioPlayer() {
  const toggleBtn = document.getElementById('musicToggle');
  const statusEl = document.getElementById('musicStatus');
  if (!toggleBtn) return;

  let isPlaying = false;
  let audioCtx = null;
  let melodyInterval = null;

  // Romantic Lofi Chords (Pentatonic Sweet Garden)
  // Frekuensi: C4, D4, E4, G4, A4, C5, D5, E5
  const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
  const progressions = [
    [0, 2, 4], // C major
    [4, 6, 7], // A minor feel
    [1, 3, 5], // D minor/F
    [3, 5, 7]  // G dominant sweet
  ];

  function playSweetTone(freq, time, duration = 1.2) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      // Soft sine + gentle triangle for warm lofi sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Smooth envelope attack and decay
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.07, time + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(time);
      osc.stop(time + duration);
    } catch (e) {
      console.log('Audio tone error', e);
    }
  }

  function startLofiMelody() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    let step = 0;
    melodyInterval = setInterval(() => {
      const now = audioCtx.currentTime;
      const chord = progressions[step % progressions.length];
      
      // Play warm chord notes arpeggiated
      chord.forEach((noteIdx, i) => {
        playSweetTone(notes[noteIdx], now + (i * 0.22), 1.6);
      });

      // Sweet high twinkle
      if (step % 2 === 0) {
        const highNote = notes[4 + Math.floor(Math.random() * 4)];
        playSweetTone(highNote, now + 0.6, 0.9);
      }

      step++;
    }, 1800);
  }

  function stopLofiMelody() {
    if (melodyInterval) {
      clearInterval(melodyInterval);
      melodyInterval = null;
    }
  }

  toggleBtn.addEventListener('click', () => {
    if (!isPlaying) {
      startLofiMelody();
      isPlaying = true;
      toggleBtn.classList.add('playing');
      if (statusEl) statusEl.textContent = 'Memutar Lofi 🍃';
    } else {
      stopLofiMelody();
      isPlaying = false;
      toggleBtn.classList.remove('playing');
      if (statusEl) statusEl.textContent = 'Klik untuk play 🎵';
    }
  });
}

/* ========================================================
   8. POLAROID 3D TILT EFFECT
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
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ========================================================
   CONFETTI BURST HELPER (CANVAS CONFETTI)
   ======================================================== */
function triggerConfetti(scale = 1) {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: Math.floor(60 * scale),
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#52796f', '#84a98c', '#a8d5ba', '#e76f51', '#f4a261', '#ffd166']
    });
  }
}

/* ========================================================
   9. PHOTO LIGHTBOX MODAL & INTERACTIVE LOVE CLICKS
   ======================================================== */
function initPhotoLightbox() {
  const cards = document.querySelectorAll('.polaroid-card[data-photo]');
  const photoModalOverlay = document.getElementById('photoModalOverlay');
  const photoModalClose = document.getElementById('photoModalClose');
  const photoModalImg = document.getElementById('photoModalImg');
  const photoModalCaption = document.getElementById('photoModalCaption');
  const photoLoveBtn = document.getElementById('photoLoveBtn');
  const photoLoveCounter = document.getElementById('photoLoveCounter');

  if (!photoModalOverlay) return;

  let currentLikes = 0;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const photoSrc = card.getAttribute('data-photo');
      const caption = card.getAttribute('data-caption');

      if (photoModalImg) photoModalImg.src = photoSrc;
      if (photoModalCaption) photoModalCaption.textContent = caption || 'Kenangan manis berdua 🌿';
      
      currentLikes = 0;
      if (photoLoveCounter) photoLoveCounter.textContent = currentLikes;

      photoModalOverlay.classList.add('active');
      triggerConfetti(0.5);
    });
  });

  const closePhotoModal = () => {
    photoModalOverlay.classList.remove('active');
  };

  if (photoModalClose) {
    photoModalClose.addEventListener('click', closePhotoModal);
  }

  photoModalOverlay.addEventListener('click', (e) => {
    if (e.target === photoModalOverlay) closePhotoModal();
  });

  if (photoLoveBtn) {
    photoLoveBtn.addEventListener('click', () => {
      currentLikes++;
      if (photoLoveCounter) photoLoveCounter.textContent = currentLikes;
      triggerConfetti(0.7);
      
      // Animate button scale
      photoLoveBtn.style.transform = 'scale(1.15)';
      setTimeout(() => {
        photoLoveBtn.style.transform = '';
      }, 200);
    });
  }
}

/* ========================================================
   10. HERO PHOTO EFFECT
   ======================================================== */
function initHeroPhotoEffect() {
  const heroPhotoCard = document.getElementById('heroPhotoCard');
  if (!heroPhotoCard) return;

  heroPhotoCard.addEventListener('click', () => {
    triggerConfetti(1);
    heroPhotoCard.style.transform = 'scale(1.12) rotate(2deg)';
    setTimeout(() => {
      heroPhotoCard.style.transform = '';
    }, 400);
  });
}

/* ========================================================
   11. BUCIN METER LOGIC & OVERLOAD ANIMATION
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
        // EXPLOSIVE OVERLOAD
        meterFill.style.width = '100%';
        meterScore.textContent = '999,999%';
        meterScore.style.animation = 'heartPulse 0.5s infinite';
        meterStatus.textContent = '⚠️ STATUS: OVERLOAD BUCIN STADIUM AKHIR!';
        meterStatus.style.color = '#e63946';

        if (diagnosisText) {
          diagnosisText.innerHTML = `
            <strong>🚨 HASIL PEMERIKSAAN RESMI:</strong><br>
            • <strong>Tingkat Bucin:</strong> 999,999% (Melewati batas sistem komputer!)<br>
            • <strong>Gejala Pasien:</strong> Senyum-senyum sendiri tiap liat foto kamu, detak jantung lompat 300x lipat saat kamu panggil "sayang", dan gak bisa fokus karena selalu mikirin kamu.<br>
            • <strong>Resep Obat Dokter:</strong> Wajib diberi pelukan hangat, cium pipi, dan diajak jajan makanan enak sesegera mungkin! 🍵💚
          `;
        }

        triggerConfetti(1.5);
        setTimeout(() => triggerConfetti(1), 500);

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
   12. KUPON CINTA BUCIN (REDEEM & WHATSAPP SHARE)
   ======================================================== */
function initLoveCoupons() {
  const claimBtns = document.querySelectorAll('.coupon-claim-btn');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBodyText = document.getElementById('modalBodyText');
  const modalIcon = document.getElementById('modalIcon');
  const modalActionBtn = document.getElementById('modalActionBtn');

  claimBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.coupon-card');
      const title = btn.getAttribute('data-title') || 'Kupon Manja';

      if (card.classList.contains('claimed')) {
        // Jika sudah diklaim, beri info
        if (modalOverlay) {
          modalIcon.textContent = "🎟️";
          modalTitle.textContent = "Kupon Sudah Kamu Klaim!";
          modalBodyText.textContent = `Kamu sudah mengaktifkan kupon "${title}". Jangan lupa tagih langsung ke cowokmu ya! 😉`;
          modalOverlay.classList.add('active');
        }
        return;
      }

      // Tandai kartu sebagai claimed
      card.classList.add('claimed');
      btn.textContent = 'Terklaim ✅';
      triggerConfetti(0.8);

      // Tampilkan popup konfirmasi dengan opsi WhatsApp
      if (modalOverlay && modalTitle && modalBodyText && modalIcon) {
        modalIcon.textContent = "🎉";
        modalTitle.textContent = "Yeay! Kupon Berhasil Diklaim!";
        modalBodyText.innerHTML = `
          Kupon <strong>"${title}"</strong> sudah aktif!<br><br>
          Kirim pesan ke pacarmu sekarang biar dia langsung siap-siap melayani bidadarinya! 💚
        `;

        if (modalActionBtn) {
          modalActionBtn.textContent = 'Kirim Tagihan via WhatsApp 📲';
          // Ganti event click sementara
          modalActionBtn.onclick = () => {
            const message = encodeURIComponent(`Halo Fauzi sayang! 🥰 Aku (Dea) baru aja klaim "${title}" di website cinta kita nih! Siap-siap traktir & manjain Dea ya! 💚🍀`);
            window.open(`https://wa.me/?text=${message}`, '_blank');
            modalOverlay.classList.remove('active');
          };
        }

        modalOverlay.classList.add('active');
      }
    });
  });
}

/* ========================================================
   13. FLIP CARD ALASAN FAUZI SAYANG DEA
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



