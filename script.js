const config = window.VALENTINE_CONFIG;
let yesScale = 1;
let noScale = 1;

document.title = config.pageTitle;

window.addEventListener('DOMContentLoaded', () => {
    applyColors();
    setupContent();
    setupMusicPlayer();
    createFloatingElements();
});

function applyColors() {
    const root = document.documentElement;
    root.style.setProperty('--bg-1', config.colors.backgroundStart);
    root.style.setProperty('--bg-2', config.colors.backgroundEnd);
    root.style.setProperty('--btn-color', config.colors.buttonBackground);
    root.style.setProperty('--btn-hover', config.colors.buttonHover);
    root.style.setProperty('--text-color', config.colors.textColor);
}

function setupContent() {
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, my love...`;
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
}

function moveButton(button) {
    // Shrink No
    noScale -= 0.15;
    if (noScale < 0.2) noScale = 0.2;
    
    // Grow Yes
    yesScale += 0.5;
    const yesBtn = document.getElementById('yesBtn1');
    yesBtn.style.transform = `scale(${yesScale})`;

    // Move No
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    
    button.style.position = 'fixed';
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    button.style.transform = `scale(${noScale})`;
}

function celebrate() {
    document.getElementById('questionSection').classList.add('hidden');
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
    
    createHeartExplosion();
}

function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    const emojis = [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears];
    emojis.forEach(emoji => {
        const div = document.createElement('div');
        div.className = 'element';
        div.innerHTML = emoji;
        div.style.left = Math.random() * 100 + 'vw';
        div.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(div);
    });
}

function createHeartExplosion() {
    for (let i = 0; i < 40; i++) {
        createFloatingElements();
    }
}

function setupMusicPlayer() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    if (!config.music.enabled) return;
    document.getElementById('musicSource').src = config.music.musicUrl;
    bgMusic.load();
    bgMusic.volume = config.music.volume;

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
