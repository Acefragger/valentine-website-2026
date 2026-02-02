// script.js - Handles interaction logic
const valentineConfig = window.VALENTINE_CONFIG;

let yesScale = 1;
let noScale = 1;

window.addEventListener('DOMContentLoaded', () => {
    // Set Initial Text
    document.getElementById('valentineTitle').textContent = `${valentineConfig.valentineName}, my love...`;
    document.getElementById('question1Text').textContent = valentineConfig.questions.first.text;
    document.getElementById('yesBtn1').textContent = valentineConfig.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = valentineConfig.questions.first.noBtn;

    setupMusic();
    createBackgroundElements();
});

function moveButton(button) {
    // 1. Shrink No button
    noScale -= 0.15;
    if (noScale < 0.2) noScale = 0.2;
    
    // 2. Grow Yes button
    yesScale += 0.5;
    const yesBtn = document.getElementById('yesBtn1');
    if (yesBtn) {
        yesBtn.style.transform = `scale(${yesScale})`;
    }

    // 3. Teleport No button
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
    
    document.getElementById('celebrationTitle').textContent = valentineConfig.celebration.title;
    document.getElementById('celebrationMessage').textContent = valentineConfig.celebration.message;
    document.getElementById('celebrationEmojis').textContent = valentineConfig.celebration.emojis;
    
    // Trigger more floating hearts for celebration
    for(let i=0; i<5; i++) createBackgroundElements();
}

function createBackgroundElements() {
    const container = document.querySelector('.floating-elements');
    const hearts = valentineConfig.floatingEmojis.hearts;
    const bears = valentineConfig.floatingEmojis.bears;
    const all = [...hearts, ...bears];

    all.forEach(emoji => {
        const div = document.createElement('div');
        div.className = 'floating-item';
        div.innerHTML = emoji;
        div.style.left = Math.random() * 100 + 'vw';
        div.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(div);
    });
}

function setupMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicCfg = valentineConfig.music;

    if (!musicCfg.enabled) return;

    document.getElementById('musicSource').src = musicCfg.musicUrl;
    bgMusic.load();
    bgMusic.volume = musicCfg.volume;

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = musicCfg.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = musicCfg.startText;
        }
    });
}
