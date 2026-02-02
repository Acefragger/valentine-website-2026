// theme.js - Handles the visual styling and colors
const themeConfig = window.VALENTINE_CONFIG;

function applyTheme() {
    const root = document.documentElement;
    const colors = themeConfig.colors;
    const animations = themeConfig.animations;

    // Apply Purple Gradient and Button Colors
    root.style.setProperty('--background-color-1', colors.backgroundStart);
    root.style.setProperty('--background-color-2', colors.backgroundEnd);
    root.style.setProperty('--button-color', colors.buttonBackground);
    root.style.setProperty('--button-hover', colors.buttonHover);
    root.style.setProperty('--text-color', colors.textColor);

    // Apply Animation Durations
    root.style.setProperty('--float-duration', animations.floatDuration);
    root.style.setProperty('--float-distance', animations.floatDistance);
    root.style.setProperty('--bounce-speed', animations.bounceSpeed);
    root.style.setProperty('--heart-explosion-size', animations.heartExplosionSize);
}

// Execute theme application
window.addEventListener('DOMContentLoaded', applyTheme);
