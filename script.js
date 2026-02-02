// ============================================
// script.js - Enhanced Valentine Logic
// ============================================

// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Scaling variables
let yesScale = 1;
let noScale = 1;

// Validate configuration
function validateConfig() {
    const warnings = [];

    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "My Love";
    }

    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    if (parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 1.5;
    }

    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:", warnings);
    }
}

function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#2d0b4d",
        backgroundEnd: "#7a3e9d",
        buttonBackground: "#9b59b6",
        buttonHover: "#8e44ad",
        textColor: "#ffffff"
    };
    return defaults[key];
}

// Apply colors from config to the CSS variables
function applyColors() {
    const root = document.documentElement;
    root.style.setProperty('--bg-start', config.colors.backgroundStart);
    root.style.setProperty('--bg-end', config.colors.backgroundEnd);
    root.style.setProperty('--btn-bg', config.colors.buttonBackground);
    root.style.setProperty('--btn-hover', config.colors.buttonHover);
    root.style.setProperty('--text-color', config.colors.textColor);
}

document.title = config.pageTitle;

window.addEventListener('DOMContentLoaded', () => {
    validateConfig();
    applyColors();

    document.getElementById('valentineTitle').textContent = `${config.valentineName}, my love...`;
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;

    // Attach evasive behavior to No button
    const noBtn = document.getElementById('noBtn1');
    noBtn.addEventListener('mouseover', () => moveButton(noBtn));
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevents accidental clicking on mobile
        moveButton(noBtn);
    });

    createFloatingElements();
    setupMusicPlayer();
});

function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    
    config.floatingEmojis.hearts.forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    config.floatingEmojis.bears.forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

/**
 * CORE MODIFICATION:
 * Shrinks No button, grows Yes button, and moves No button away.
 */
function moveButton(button) {
    // 1. Shrink No Button
    noScale -= 0.1;
    if (noScale < 0.2) noScale = 0.2; 
    
    // 2. Grow Yes Button
    yesScale += 0.35; 
    const yesBtn = document.getElementById('yesBtn1');
    if (yesBtn) {
        yesBtn.style.transform = `scale(${yesScale})`;
        yesBtn.style.transition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    }

    // 3. Move No Button to random coordinates
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
    button.style.transform = `scale(${noScale})`;
    button.style.transition = "all 0.2s ease-out";
    button.style.zIndex = "9999";
}

function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
    
    createHeartExplosion();
}

function createHeartExplosion() {
    const container = document.querySelector('.floating-elements');
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const randomHeart = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        heart.innerHTML = randomHeart;
        heart.className = 'heart explosion';
        container.appendChild(heart);
        setRandomPosition(heart);
    }
}

function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    if (!config.music.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                musicToggle.textContent = config.music.startText;
            });
        }
    }

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}
