let game;

// global game options
let gameOptions = {

    // platform speed range, in pixels per second
    platformSpeedRange: [300, 300],

    // mountain speed, in pixels per second
    rockSpeed: 80,

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

    // shark gravity
    sharkGravity: 0,

    // player jump force
    jumpForce: 400,

    // player starting X position
    playerStartPosition: 200,

    // shark starting X position
    sharkStartPosition: 100,

    // consecutive jumps allowed
    jumps: 2,

    // % of probability a coin appears on the platform
    starPercent: 25,

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
          default: 'arcade',
          // arcade: {
          //     gravity: {
          //         y: 300
          //     },
          //     debug: false
          // }
      },
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}

class preloadGame extends Phaser.Scene{
  constructor(){
      super("PreloadGame");
  }
  preload(){

    this.load.image('sea', './assets/sea-background-main.jpg');
    this.load.image('ground', './assets/platform1.png');

    // shark is a sprite sheet made 
    this.load.spritesheet("shark", "./assets/shark.png", {
      frameWidth: 124,
      frameHeight: 67
   });

    // player is a sprite sheet made 
    this.load.spritesheet("player", "./assets/turtle.png", {
        frameWidth: 72,
        frameHeight: 55
    });

    // rocks are a sprite sheet made by 512x512 pixels
    this.load.spritesheet("rocks", "./assets/rocks.png", {
      frameWidth: 512,
      frameHeight: 512
  });

    // the star is a sprite sheet made by 20x20 pixels
    this.load.spritesheet("star", "star.png", {
      frameWidth: 50,
      frameHeight: 50
  });
  }

  create(){

    //platform
    // platforms = this.physics.add.staticGroup();
    // platforms.create(600, 400, 'ground');

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

    // setting shark animation
    this.anims.create({
      key: "swim",
      frames: this.anims.generateFrameNumbers("shark", {
          start: 0,
          end: 1
      }),
      frameRate: 8,
      repeat: -1
  });

    // setting star animation
    this.anims.create({
      key: "rotate",
      frames: this.anims.generateFrameNumbers("star", {
          start: 0,
          end: 5
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1
  });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('shark', { start: 0, end: 3 }),
      frameRate: 10,
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

    // group with all active rocks.
    this.rocksGroup = this.add.group();

    // adding a rocks
    this.addRocks()

    // adding the player;
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.7, "player");
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setDepth(2);

    // adding the shark;
    this.shark = this.physics.add.sprite(gameOptions.sharkStartPosition, game.config.height * 0.8, "shark");
    this.shark.setGravityY(gameOptions.sharkGravity);
    this.shark.setDepth(1);

    // the player is not dying
    this.dying = false;

    if(!this.player.anims.isPlaying){
      this.player.anims.play("run");
      this.shark.anims.play("swim");
   }

  // // if(!this.shark.anims.isPlaying){
  //   this.shark.anims.play("run");
  // // }

   

    // group with all active stars.
    this.starGroup = this.add.group({

      // once a star is removed, it's added to the pool
      removeCallback: function(star){
          star.scene.coinPool.add(star)
      }
  });

    // star pool
    this.starPool = this.add.group({

      // once a star is removed from the pool, it's added to the active coins group
      removeCallback: function(star){
          star.scene.starGroup.add(star)
      }
  });
  }

  // adding rocks
  addRocks(){
    let rightmostRock = this.getRightmostRock();
    if(rightmostRock < game.config.width * 2){
        let rock = this.physics.add.sprite(rightmostRock + Phaser.Math.Between(100, 350), game.config.height + Phaser.Math.Between(0, 100), "rocks");
        rock.setOrigin(0.5, 1);
        rock.body.setVelocityX(gameOptions.rockSpeed * -1)
        this.rocksGroup.add(rock);
        if(Phaser.Math.Between(0, 1)){
            rock.setDepth(1);
        }
        rock.setFrame(Phaser.Math.Between(0, 3))
        this.addRocks()
    }
}

  // getting rightmost rock x position
  getRightmostRock(){
    let rightmostRock = -200;
    this.rocksGroup.getChildren().forEach(function(rock){
        rightmostRock = Math.max(rightmostRock, rock.x);
    })
    return rightmostRock;
  }

  update(){
    // recycling rocks
    this.rocksGroup.getChildren().forEach(function(rock){
      if(rock.x < - rock.displayWidth){
          let rightmostRock = this.getRightmostRock();
          rock.x = rightmostRock + Phaser.Math.Between(100, 350);
          rock.y = game.config.height + Phaser.Math.Between(0, 100);
          rock.setFrame(Phaser.Math.Between(0, 3))
          if(Phaser.Math.Between(0, 1)){
              rock.setDepth(1);
          }
      }
  }, this);

  // recycling stars
  this.starGroup.getChildren().forEach(function(star){
    if(star.x < - star.displayWidth / 2){
        this.starGroup.killAndHide(star);
        this.starGroup.remove(star);
    }
}, this);

  }
  
  
}
