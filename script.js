const loader = document.querySelector('.loader');
const particleField = document.querySelector('.particle-field');
const pointerFine = window.matchMedia('(pointer: fine)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function createAmbientParticles() {
  if (reducedMotion) return;
  const fragment = document.createDocumentFragment();
  const fireflyCount = window.innerWidth < 680 ? 22 : 42;
  const leafCount = window.innerWidth < 680 ? 12 : 26;
  const flowerCount = window.innerWidth < 680 ? 6 : 11;
  const petalCount = window.innerWidth < 680 ? 7 : 12;
  const cloudCount = window.innerWidth < 680 ? 4 : 7;

  for (let index = 0; index < fireflyCount; index += 1) {
    const firefly = document.createElement('span');
    firefly.className = 'firefly';
    firefly.style.left = `${Math.random() * 100}%`;
    firefly.style.top = `${Math.random() * 100}%`;
    firefly.style.setProperty('--duration', `${6 + Math.random() * 9}s`);
    firefly.style.setProperty('--drift-x', `${-35 + Math.random() * 70}px`);
    firefly.style.setProperty('--drift-y', `${-45 + Math.random() * 90}px`);
    fragment.append(firefly);
  }

  for (let index = 0; index < leafCount; index += 1) {
    const leaf = document.createElement('span');
    leaf.className = 'falling-leaf';
    leaf.textContent = '❧';
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.setProperty('--size', `${15 + Math.random() * 13}px`);
    leaf.style.setProperty('--duration', `${15 + Math.random() * 12}s`);
    leaf.style.setProperty('--delay', `${-Math.random() * 24}s`);
    leaf.style.setProperty('--drift-x', `${-90 + Math.random() * 180}px`);
    fragment.append(leaf);
  }

  for (let index = 0; index < flowerCount; index += 1) {
    const flower = document.createElement('span');
    flower.className = 'falling-flower';
    flower.textContent = ['✿', '❀', '✾'][index % 3];
    flower.style.left = `${Math.random() * 100}%`;
    flower.style.setProperty('--size', `${11 + Math.random() * 10}px`);
    flower.style.setProperty('--duration', `${21 + Math.random() * 13}s`);
    flower.style.setProperty('--delay', `${-Math.random() * 30}s`);
    flower.style.setProperty('--drift-x', `${-105 + Math.random() * 210}px`);
    fragment.append(flower);
  }

  for (let index = 0; index < cloudCount; index += 1) {
    const cloud = document.createElement('span');
    cloud.className = 'background-cloud';
    cloud.style.top = `${8 + Math.random() * 82}%`;
    cloud.style.setProperty('--cloud-width', `${150 + Math.random() * 180}px`);
    cloud.style.setProperty('--duration', `${52 + Math.random() * 35}s`);
    cloud.style.setProperty('--delay', `${-Math.random() * 70}s`);
    fragment.append(cloud);
  }

  for (let index = 0; index < petalCount; index += 1) {
    const petal = document.createElement('span');
    petal.className = 'floating-petal';
    petal.textContent = index % 2 ? '✿' : '❋';
    petal.style.left = `${8 + Math.random() * 84}%`;
    petal.style.top = `${12 + Math.random() * 76}%`;
    petal.style.setProperty('--size', `${9 + Math.random() * 9}px`);
    petal.style.setProperty('--duration', `${7 + Math.random() * 7}s`);
    petal.style.animationDelay = `${-Math.random() * 9}s`;
    fragment.append(petal);
  }

  for (let index = 0; index < (window.innerWidth < 680 ? 16 : 28); index += 1) {
    const sparkle = document.createElement('span');
    sparkle.className = 'falling-sparkle';
    sparkle.textContent = index % 2 ? '✧' : '·';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.fontSize = `${9 + Math.random() * 9}px`;
    sparkle.style.setProperty('--duration', `${14 + Math.random() * 17}s`);
    sparkle.style.setProperty('--delay', `${-Math.random() * 24}s`);
    sparkle.style.setProperty('--drift-x', `${-35 + Math.random() * 70}px`);
    fragment.append(sparkle);
  }
  particleField.append(fragment);
}

function setupNavigation() {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');

  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Buka navigasi' : 'Tutup navigasi');
    navigation.classList.toggle('is-open', !expanded);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Buka navigasi');
      navigation.classList.remove('is-open');
    });
  });

  if ('IntersectionObserver' in window) {
    const sections = [...navigation.querySelectorAll('a')]
      .map((link) => {
        const target = new URL(link.getAttribute('href'), window.location.href);
        if (target.pathname !== window.location.pathname || !target.hash) return null;
        return document.getElementById(decodeURIComponent(target.hash.slice(1)));
      })
      .filter(Boolean);
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navigation.querySelectorAll('a').forEach((link) => {
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-34% 0px -56% 0px' });
    sections.forEach((section) => activeObserver.observe(section));
  }
}

function setupExperienceControls() {
  const controls = document.createElement('aside');
  controls.className = 'site-controls';
  controls.setAttribute('aria-label', 'Pengaturan tampilan dan musik');
  controls.innerHTML = `
    <label class="theme-control"><span class="visually-hidden">Pilih tema</span><select class="theme-select" aria-label="Pilih tema warna"><option value="sky">Siang</option><option value="dark">Malam</option><option value="pink">Pink</option><option value="gold">Kuning</option><option value="disney">Disney</option><option value="sanrio">Sanrio</option></select></label>
    <div class="song-chooser" aria-label="Pilih lagu">
      <button class="track-button is-active" type="button" data-track="0" aria-label="Pilih lagu 1: Royal Morning">1</button>
      <button class="track-button" type="button" data-track="1" aria-label="Pilih lagu 2: Garden Waltz">2</button>
      <button class="track-button" type="button" data-track="2" aria-label="Pilih lagu 3: Moonlit Bloom">3</button>
      <button class="track-button" type="button" data-track="3" aria-label="Pilih lagu 4: Velvet Royal">4</button>
      <button class="track-button" type="button" data-track="4" aria-label="Pilih lagu 5: Story Garden">5</button>
      <button class="track-button" type="button" data-track="5" aria-label="Pilih lagu 6: Golden Evening">6</button>
    </div>
    <button class="site-control-button music-toggle" type="button" aria-label="Mulai musik latar – Royal Morning" aria-pressed="false">♫</button>
    <label class="volume-control"><span>VOL</span><input type="range" min="0" max="1" step="0.01" value="0.28" aria-label="Volume musik"></label>`;
  document.body.append(controls);

  const themeSelect = controls.querySelector('.theme-select');
  const musicButton = controls.querySelector('.music-toggle');
  const trackButtons = [...controls.querySelectorAll('.track-button')];
  const volumeSlider = controls.querySelector('.volume-control input');
  let audioContext;
  let masterGain;
  let musicTimer;
  let noteIndex = 0;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const playlist = [
    { name: 'Royal Morning', melody: [659.25, 783.99, 880, 1046.5, 987.77, 880, 783.99, 659.25, 698.46, 783.99, 880, 1046.5], bass: [130.81, 164.81, 196, 164.81], rhythm: [1, 1, 0.5, 0.5, 1, 1, 0.75, 0.75], interval: 390, duration: 0.25, bassEvery: 2, sparkleEvery: 3, wave: 'triangle' },
    { name: 'Garden Waltz', melody: [587.33, 783.99, 880, 783.99, 659.25, 587.33, 493.88, 587.33, 659.25, 783.99, 880, 783.99], bass: [146.83, 196, 220, 196, 164.81, 146.83], rhythm: [1, 1, 1, 1, 1, 1.5, 0.5, 1, 1, 1, 1, 1.5], interval: 430, duration: 0.31, bassEvery: 3, sparkleEvery: 4, wave: 'sine' },
    { name: 'Moonlit Bloom', melody: [739.99, 880, 1108.73, 987.77, 880, 739.99, 659.25, 739.99, 880, 987.77, 1108.73, 1174.66, 1108.73, 880], bass: [146.83, 185, 220, 185, 164.81, 146.83, 123.47], rhythm: [1.5, 0.5, 1, 0.75, 0.75, 1.5, 0.5, 1, 0.5, 0.5, 1.5, 0.5], interval: 460, duration: 0.34, bassEvery: 4, sparkleEvery: 2, wave: 'sine' },
    { name: 'Velvet Royal', melody: [698.46, 880, 783.99, 698.46, 587.33, 698.46, 880, 932.33, 880, 783.99], bass: [174.61, 220, 196, 174.61, 146.83], rhythm: [0.5, 0.5, 1, 0.5, 0.5, 1.5, 0.5, 1, 0.5, 1.5], interval: 360, duration: 0.2, bassEvery: 2, sparkleEvery: 5, wave: 'square' },
    { name: 'Story Garden', melody: [659.25, 830.61, 987.77, 1318.51, 1174.66, 987.77, 830.61, 783.99, 830.61, 987.77, 1108.73, 1318.51, 1174.66, 987.77, 830.61], bass: [164.81, 207.65, 246.94, 207.65, 155.56], rhythm: [0.75, 0.75, 0.75, 1.5, 0.5, 1, 1, 0.5, 0.5, 1, 0.75, 0.75, 1.5, 0.5], interval: 380, duration: 0.23, bassEvery: 3, sparkleEvery: 4, wave: 'triangle' },
    { name: 'Golden Evening', melody: [466.16, 587.33, 698.46, 932.33, 880, 698.46, 587.33, 523.25, 587.33, 698.46, 783.99, 932.33, 880], bass: [116.54, 146.83, 174.61, 146.83, 130.81], rhythm: [1, 0.5, 0.5, 1, 1.5, 0.5, 1, 1, 0.5, 0.5, 1.5, 1], interval: 470, duration: 0.3, bassEvery: 4, sparkleEvery: 3, wave: 'triangle' }
  ];
  let currentTrackIndex = 0;

  const updateTrackButtons = () => {
    trackButtons.forEach((button, index) => {
      const isActive = index === currentTrackIndex;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  const updateMusicLabel = () => {
    const track = playlist[currentTrackIndex];
    const isPlaying = Boolean(musicTimer);
    musicButton.setAttribute('aria-pressed', String(isPlaying));
    musicButton.setAttribute('aria-label', isPlaying ? `Jeda musik latar – ${track.name}` : `Mulai musik latar – ${track.name}`);
    musicButton.title = `${track.name}${isPlaying ? ' • sedang diputar' : ' • siap diputar'}`;
  };

  let selectedTheme = 'sky';
  try {
    const savedTheme = localStorage.getItem('berlian-theme');
    if (['sky', 'dark', 'pink', 'gold', 'disney', 'sanrio'].includes(savedTheme)) selectedTheme = savedTheme;
    const savedVolume = Number(localStorage.getItem('berlian-music-volume'));
    if (Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 1) volumeSlider.value = String(savedVolume);
  } catch {
    // Preferences remain usable for this page even when browser storage is unavailable.
  }

  const savePreference = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // The current setting still applies until this page is closed.
    }
  };

  const applyTheme = (theme) => {
    document.body.classList.remove('dark-theme', 'pink-theme', 'gold-theme', 'disney-theme', 'sanrio-theme');
    if (theme !== 'sky') document.body.classList.add(`${theme}-theme`);
    themeSelect.value = theme;
    document.querySelector('meta[name="theme-color"]').content = {
      sky: '#eaf6ff',
      dark: '#0e2334',
      pink: '#fff0f7',
      gold: '#fff8dc',
      disney: '#fff4dc',
      sanrio: '#fff0f7'
    }[theme];
    savePreference('berlian-theme', theme);
  };

  themeSelect.addEventListener('change', () => applyTheme(themeSelect.value));
  applyTheme(selectedTheme);

  if (!AudioContextClass) {
    musicButton.disabled = true;
    musicButton.setAttribute('aria-label', 'Audio tidak didukung browser ini');
  } else {
    const playTone = (frequency, duration, level, wave = 'triangle') => {
      const oscillator = audioContext.createOscillator();
      const envelope = audioContext.createGain();
      const startTime = audioContext.currentTime;
      oscillator.type = wave;
      oscillator.frequency.value = frequency;
      envelope.gain.setValueAtTime(0.0001, startTime);
      envelope.gain.exponentialRampToValueAtTime(level, startTime + 0.025);
      envelope.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      oscillator.connect(envelope);
      envelope.connect(masterGain);
      oscillator.start(startTime);
      oscillator.stop(startTime + duration + 0.05);
    };

    const playPhrase = () => {
      const track = playlist[currentTrackIndex];
      const step = noteIndex % track.melody.length;
      const note = track.melody[step];
      playTone(note, track.duration, track.wave === 'square' ? 0.045 : 0.085, track.wave);
      if (step % track.sparkleEvery === 0) playTone(note * 2, 0.12, 0.015, 'sine');
      if (step % track.bassEvery === 0) {
        const bassNote = track.bass[Math.floor(noteIndex / track.bassEvery) % track.bass.length];
        playTone(bassNote, 0.38, 0.035, 'sine');
      }
      const delay = track.interval * track.rhythm[noteIndex % track.rhythm.length];
      noteIndex += 1;
      musicTimer = window.setTimeout(playPhrase, delay);
    };

    trackButtons.forEach((button) => {
      button.addEventListener('click', () => {
        currentTrackIndex = Number(button.dataset.track);
        noteIndex = 0;
        updateTrackButtons();
        updateMusicLabel();
        if (musicTimer) {
          window.clearTimeout(musicTimer);
          musicTimer = null;
          playPhrase();
        }
      });
    });

    musicButton.addEventListener('click', async () => {
      if (!audioContext) {
        audioContext = new AudioContextClass();
        masterGain = audioContext.createGain();
        masterGain.gain.value = Number(volumeSlider.value);
        masterGain.connect(audioContext.destination);
      }

      if (audioContext.state === 'suspended') await audioContext.resume();
      if (musicTimer) {
        window.clearTimeout(musicTimer);
        musicTimer = null;
        await audioContext.suspend();
      } else {
        playPhrase();
      }
      updateMusicLabel();
    });

    volumeSlider.addEventListener('input', () => {
      const volume = Number(volumeSlider.value);
      if (masterGain) masterGain.gain.setTargetAtTime(volume, audioContext.currentTime, 0.04);
      savePreference('berlian-music-volume', String(volume));
    });

    updateTrackButtons();
    updateMusicLabel();
  }
}

function setupPageTransitions() {
  if (reducedMotion) return;
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;

    const destination = new URL(link.href, window.location.href);
    const sameProtocol = destination.protocol === window.location.protocol;
    if (!sameProtocol || (destination.pathname === window.location.pathname && destination.hash)) return;

    event.preventDefault();
    document.body.classList.add('page-leaving');
    window.setTimeout(() => window.location.assign(destination.href), 360);
  }, true);
}

function setupReveal() {
  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13, rootMargin: '0px 0px -28px 0px' });

  revealItems.forEach((item) => observer.observe(item));
}

function setupPointerAndParallax() {
  if (!pointerFine || reducedMotion) return;

  let frameRequested = false;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let scrollY = window.scrollY;
  let lastSparkle = 0;

  const update = () => {
    document.documentElement.style.setProperty('--pointer-x', `${pointerX}px`);
    document.documentElement.style.setProperty('--pointer-y', `${pointerY}px`);
    document.documentElement.style.setProperty('--parallax-y', `${Math.min(scrollY * -0.035, 70)}px`);
    frameRequested = false;
  };

  const requestUpdate = () => {
    if (!frameRequested) {
      frameRequested = true;
      window.requestAnimationFrame(update);
    }
  };

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    requestUpdate();

    const now = performance.now();
    if (now - lastSparkle > 110) {
      lastSparkle = now;
      const sparkle = document.createElement('span');
      sparkle.className = 'pointer-sparkle';
      sparkle.textContent = Math.random() > 0.5 ? '✦' : '✧';
      sparkle.style.left = `${pointerX}px`;
      sparkle.style.top = `${pointerY}px`;
      document.body.append(sparkle);
      window.setTimeout(() => sparkle.remove(), 850);
    }
  }, { passive: true });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    requestUpdate();
  }, { passive: true });
}

function setupFooter() {
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
}

function setupClosingGrass() {
  const grass = document.querySelector('.closing-grass');
  if (!grass) return;
  const fragment = document.createDocumentFragment();
  const bladeCount = window.innerWidth < 680 ? 28 : 46;

  for (let index = 0; index < bladeCount; index += 1) {
    const blade = document.createElement('span');
    blade.className = 'grass-blade';
    blade.style.setProperty('--blade-left', `${Math.random() * 100}%`);
    blade.style.setProperty('--blade-height', `${20 + Math.random() * 58}px`);
    blade.style.setProperty('--blade-width', `${5 + Math.random() * 9}px`);
    blade.style.setProperty('--blade-angle', `${-24 + Math.random() * 48}deg`);
    blade.style.setProperty('--blade-speed', `${2.2 + Math.random() * 2.4}s`);
    blade.style.setProperty('--blade-delay', `${-Math.random() * 4}s`);
    blade.style.setProperty('--blade-color', index % 2 ? '#63c978' : '#83df83');
    blade.style.setProperty('--blade-light', index % 2 ? '#b1f49b' : '#d5ffb8');
    fragment.append(blade);
  }

  grass.append(fragment);
}

createAmbientParticles();
setupNavigation();
setupExperienceControls();
setupPageTransitions();
setupReveal();
setupPointerAndParallax();
setupFooter();
setupClosingGrass();

window.setTimeout(() => {
  loader.classList.add('is-hidden');
  loader.style.opacity = '0';
  loader.style.visibility = 'hidden';
  window.setTimeout(() => loader.remove(), 850);
}, 850);
