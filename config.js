// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
const CONFIG = {
    valentineName: "Sarah",
    pageTitle: "Will You Be My Valentine? 💝",
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],
        bears: ['🧸', '🐻']
    },
    questions: {
        first: {
            text: "Will you be my Valentine? 🌹",
            yesBtn: "Yes!",
            noBtn: "No"
        }
    },
    celebration: {
        title: "Yay! I'm the luckiest person in the world! 🎉💝",
        message: "Now come get your gift, a big warm hug and a huge kiss!",
        emojis: "🎁💖🤗💝💋❤️💕"
    },
    colors: {
        backgroundStart: "#2d0b4d",      // Deep Purple
        backgroundEnd: "#7a3e9d",        // Vibrant Purple
        buttonBackground: "#9b59b6",     // Amethyst Purple
        buttonHover: "#8e44ad",          // Darker Purple
        textColor: "#ffffff"             // White text for contrast
    },
    animations: {
        floatDuration: "15s",
        floatDistance: "50px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.5
    },
    music: {
        enabled: true,
        autoplay: true,
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3",
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music",
        volume: 0.5
    }
};

window.VALENTINE_CONFIG = CONFIG;
