
let game;
let stars;
let player;

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

    this.load.image('sea', './assets/sea-background.jpg');
    this.load.image('star', './assets/star.png')

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
    player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.5, "player");
    player.setGravityY(gameOptions.playerGravity);
    player.setDepth(2);

    stars = this.physics.add.group({
      key: 'star',
      repeat: 1000,
      setXY: { x: game.config.width * 0.60, y: 0, stepX: game.config.width * 0.1 }
    });

    stars.children.iterate(function (star) {
        star.setY(game.config.height * Phaser.Math.FloatBetween(0.05, 0.95));
        star.setVelocityX(-200)
        star.setGravity(0)
    });

    this.physics.add.overlap(player, stars, collectStar, null, this);

    // obstacles = this.physics.add.group({
    //   key: 'trash',
    //   repeat: 1000,
    //   setXY: { x: game.config.width * 1.5, y: 0, stepX: game.config.width * 0.33 }
    // });

    // obtacles.children.iterate(function (obstacles) {
    //     star.setY(game.config.height * Phaser.Math.FloatBetween(0.1, 0.9));
    //     star.setVelocityX(-200)
    //     star.setGravity(0)
    // });


    }

   
}
  
function collectStar (player, star) {
  star.disableBody(true, true);
  // ADD TO TIME
}
    