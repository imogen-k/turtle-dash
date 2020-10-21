// const Phaser = require('../dist/phaser.js')
const endScreen = require('../endScreen.js');

let game;

window.onload = function() {

    // object containing configuration options
    let gameConfig = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 1280,
            height: 720
        },
        audio: {
            mute: false,
            volume: 5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        },
        scene: [loadScene, preloadGame, startMenu, playGame, endScreen, scoreScene, howToPlay],
        physics: {
          default: 'arcade',
        }, 
        dom: {
          createContainer: true
        },
    }

    game = new Phaser.Game(gameConfig);
    window.focus();
}

test('adds an image to the end screen', () => {
  expect(endScreen.add.image(640, 360, 'sea')).toBe(endScreen.add.image(640, 360, 'sea'));
});
