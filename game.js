// var config = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,
//   physics: {
//       default: 'arcade',
//       arcade: {
//           gravity: {
//               y: 200
//           }
//       }
//   },
//   scene: {
//       preload: preload,
//       create: create
//   }
// };

// var game = new Phaser.Game(config);

// function preload() {
//   this.load.setBaseURL('http://labs.phaser.io');

//   this.load.image('sky', 'assets/skies/space3.png');
//   this.load.image('logo', 'assets/sprites/phaser3-logo.png');
//   this.load.image('red', 'assets/particles/red.png');
// }

// function create() {
//   this.add.image(400, 300, 'sky');

//   var particles = this.add.particles('red');

//   var emitter = particles.createEmitter({
//       speed: 100,
//       scale: {
//           start: 1,
//           end: 0
//       },
//       blendMode: 'ADD'
//   });

//   var logo = this.physics.add.image(400, 100, 'logo');

//   logo.setVelocity(100, 200);
//   logo.setBounce(1, 1);
//   logo.setCollideWorldBounds(true);

//   emitter.startFollow(logo);

let game;

// global game options
let gameOptions = {

    // platform speed range, in pixels per second
    platformSpeedRange: [300, 300],

    // mountain speed, in pixels per second
    mountainSpeed: 80,

    // spawn range, how far should be the rightmost platform from the right edge
    // before next platform spawns, in pixels
    spawnRange: [80, 300],

    // platform width range, in pixels
    platformSizeRange: [90, 300],

    // a height range between rightmost platform and next platform to be spawned
    platformHeightRange: [-5, 5],

    // a scale to be multiplied by platformHeightRange
    platformHeighScale: 20,

    // platform max and min height, as screen height ratio
    platformVerticalLimit: [0.4, 0.8],

    // player gravity
    playerGravity: 0,

    // player jump force
    jumpForce: 400,

    // player starting X position
    playerStartPosition: 200,

    // consecutive jumps allowed
    jumps: 2,

    // % of probability a coin appears on the platform
    coinPercent: 25,

    // % of probability a fire appears on the platform
    firePercent: 25
}

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
        scene: [preloadGame, playGame],
        //backgroundColor: 0x0c88c7,

        // physics settings
        physics: {
            default: "arcade"
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}

class preloadGame extends Phaser.Scene{
  constructor(){
      super("PreloadGame");
  }
  preload(){

    this.load.image('sea', '/assets/sea-background.jpg');

    // player is a sprite sheet made by 24x48 pixels
    this.load.spritesheet("player", "./assets/side.png", {
        frameWidth: 20,
        frameHeight: 24
    });
  }

  create(){

    // setting player animation
    this.anims.create({
        key: "run",
        frames: this.anims.generateFrameNumbers("player", {
            start: 0,
            end: 1
        }),
        frameRate: 8,
        repeat: -1
    });

    this.scene.start("PlayGame");
  }
}

// playGame scene
class playGame extends Phaser.Scene{
  constructor(){
      super("PlayGame");
  }
  create(){
    //  A simple background for our game
    this.add.image(640, 360, 'sea')

    // adding the player;
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.7, "player");
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setDepth(2);
  }
}