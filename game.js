//const { createBuilderStatusReporter } = require("typescript");

let game;

// global game options
let gameOptions = {

    initialTime: 120,

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
    playerGravity: 25,

    // shark gravity
    sharkGravity: 40,

    // player jump force
    jumpForce: 400,

    // player starting X position
    playerStartPosition: 200,

    // shark starting X position
    sharkStartPosition: 800,

    // consecutive jumps allowed
    jumps: 2,

    // % of probability a coin appears on the platform
    starPercent: 25,

    // % of probability a fire appears on the platform
    firePercent: 25,


    // sfx muted
    SFXmuted: false,

    musicMuted: false,

    scores: []

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
        audio: {
            mute: false,
            volume: 5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        },
        scene: [loadScene, preloadGame, startMenu, playGame, endScreen, scoreScene],
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
      
      
      dom: {
        createContainer: true
    },
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    
}

class loadScene extends Phaser.Scene{
  constructor(){
      super("LoadScene");
  }
  preload () {
    this.load.image('sea', './assets/sea-background.jpg');
    this.load.image('loading', './assets/loading.png');
  }
  create () {
    this.scene.start("PreloadGame");
  } 
};

class preloadGame extends Phaser.Scene{
  constructor(){
      super("PreloadGame");
  }
  preload(){

    this.add.image(640, 360, 'sea')
    this.add.image(640, 360, 'loading')
    
    this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);    
    


    this.load.image('sea', './assets/sea-background.jpg');
    this.load.image('floorboundary', './assets/floorboundary.png');
    this.load.image("energycontainer", "./assets/energycontainer.png");
    this.load.image("energybar", "./assets/energybar.png");

    this.load.audio("backgroundmusic", ["./assets/bensound-memories.ogg", "./assets/bensound-memories.mp3"])
    this.load.audio("jellymode", ["./assets/zapsplat_cartoon_magic_ascend_spell.ogg", "./assets/zapsplat_cartoon_magic_ascend_spell.mp3"])
    this.load.audio("obstaclehit", ["./assets/zapsplat_sound_design_impact_hit_sub_drop_punchy_001_54851.ogg", "./assets/zapsplat_sound_design_impact_hit_sub_drop_punchy_001_54851.mp3"])
    this.load.audio("collect-star", "./assets/zapsplat_multimedia_alert_bell_ping_wooden_008_54058.mp3")


    // coral
    this.load.image('yellowcoral', './assets/coral1.png');
    this.load.image('greencoral', './assets/coral2.png');
    this.load.image('pinkcoral', './assets/coral3.png');


    // mute buttons
    this.load.image('mute', './assets/mute-white.png');


    //buttons
    this.load.image('playButton', './assets/play-button.png');
    this.load.image('playAgain', './assets/play-again.png');
    this.load.image('submitScore', './assets/submit-score.png');

    // shark is a sprite sheet made 
    this.load.spritesheet("shark", "./assets/shark2.png", {
      frameWidth: 124,
      frameHeight: 67
    });

    // player is a sprite sheet made

    this.load.spritesheet("player", "./assets/turtle-main.png", {
        frameWidth: 72,
        frameHeight: 55

    });

    // rocks are a sprite sheet made by 512x512 pixels
    this.load.spritesheet("rocks", "./assets/rocks.png", {
      frameWidth: 512,
      frameHeight: 512
    });

    // the star is a sprite sheet made by 50x50 pixels
    this.load.spritesheet("star", "./assets/star.png", {
      frameWidth: 50,
      frameHeight: 50
    });

    // the animated turtle is a sprite sheet made by 800 x 600 pixels
    this.load.spritesheet("turtleStart", "./assets/turtle-start.png", {
      frameWidth: 800,
      frameHeight: 600
    });

  // the jellyfish is a sprite sheet made by 50x50 pixels
  this.load.spritesheet("jellyfish", "./assets/jellyfish.png", {
    frameWidth: 50,
    frameHeight: 50
  });

  // the trashbag is a sprite sheet made by 100x100 pixels
  this.load.spritesheet("trashbag", "./assets/trashbag.png", {
    frameWidth: 100,
    frameHeight: 100
  });

   // the net is a sprite sheet made by 50x50 pixels
   this.load.spritesheet("net", "./assets/net.png", {
      frameWidth: 100,
      frameHeight: 100
    });
 }

  create(){
    
    // setting player animation
    this.anims.create({

        key: "run",
        frames: this.anims.generateFrameNumbers("player", {
            start: 0,
            end: 3
        }),
        frameRate: 8,
        repeat: -1
    });

    // setting rainbow player animation
    this.anims.create({
      key: "run2",
      frames: this.anims.generateFrameNumbers("player", {
          start: 4,
          end: 9
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
      yoyo: true,
      repeat: -1
    });

    // setting star animation
    this.anims.create({
      key: "starpulse",
      frames: this.anims.generateFrameNumbers("star", {
          start: 0,
          end: 5
      }),
      frameRate: 8,
      yoyo: true,
      repeat: -1
    });

    // setting jellyfish animation
    this.anims.create({
      key: "jellyfishpulse",
      frames: this.anims.generateFrameNumbers("jellyfish", {
          start: 0,
          end: 5
      }),
      frameRate: 8,
      yoyo: true,
      repeat: -1
    });
    
    // setting trashbag animation
    this.anims.create({
      key: "trashbagpulse",
      frames: this.anims.generateFrameNumbers("trashbag", {
        start: 0,
        end: 5
      }),
      frameRate: 8,
      yoyo: true,
      repeat: -1
    });

    // setting net animation
    this.anims.create({
      key: "netpulse",
        frames: this.anims.generateFrameNumbers("net", {
          start: 0,
          end: 5
        }),
        frameRate: 8,
        yoyo: true,
        repeat: -1
      });
    
    this.anims.create({
      key: "turtleGif",
      frames: this.anims.generateFrameNumbers("turtleStart", {
        start: 0,
        end: 145
      }),
      frameRate: 20,
      repeat: -1
    });

  this.scene.start("StartMenu");
    
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

    this.floor = this.physics.add.staticGroup();
    this.floor.create(360, 720,'floorboundary')
    
    this.coral = this.physics.add.staticGroup();

    //  Create inivisible shark platforms
    this.sharkplatforms.create(800, 150, 'sharkplatform');
    this.sharkplatforms.create(800, 450, 'sharkplatform');
    this.sharkplatforms.create(400, 250, 'sharkplatform');

    // group with all active rocks.
    this.rocksGroup = this.add.group();

    // adding a rocks
    this.addRocks()

    // adding the player;
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.7, "player");
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setDepth(2);
    this.player.setCollideWorldBounds(true);
    this.player.body.setImmovable(true);

    this.physics.add.overlap(this.player,this.floor,this.scene.start("EndScreen"),null,this)

    // playing the background music
    this.bgmusic = this.sound.add('backgroundmusic');
    this.bgmusic.play()

    // muting background music
    this.muteMusic = this.add.text(60, 40, 'Music off')
  
    this.muteSFX = this.add.text(200, 40, 'SFX off')

    // adding sound effects
    var starCollected = this.sound.add("collect-star");
    var obstacleHit = this.sound.add("obstaclehit");
    var jellymodesound = this.sound.add("jellymode");

    // settiing the timer
    this.timeLeft = gameOptions.initialTime;

    let energyContainer = this.add.sprite(1100, 45, "energycontainer");

    let energyBar = this.add.sprite(energyContainer.x, energyContainer.y, "energybar");

    this.energyMask = this.add.sprite(energyBar.x, energyBar.y, "energybar");

    this.energyMask.visible = false;

    energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask);


    this.gameTimer = this.time.addEvent({
        delay: 1000,
        callback: function(){

          // if (obstacle.hit === true) {
            // this.timeLeft -= 3;
        // } else if (item.collect === true) {
          // this.timeLeft += 3;
        // }
          // } else {
            this.timeLeft --;
          // }
          
            let stepWidth = this.energyMask.displayWidth / gameOptions.initialTime;

            this.energyMask.x -= stepWidth;
            if(this.timeLeft === 60){
                bgmusic.stop()
                this.scene.start("EndScreen")

            }
        },
        callbackScope: this,
        loop: true
    });

    // adding the shark;
    this.shark = this.physics.add.sprite(gameOptions.sharkStartPosition, 200, "shark");
    this.shark.setGravityY(gameOptions.sharkGravity);
    this.shark.setDepth(2);
    this.shark.setVelocityY(-100);
    //this.shark.setVelocityX(-100);

    //shark movement
    this.shark.factor = 1;

    // the player is not dying
    this.dying = false;

    if(!this.player.anims.isPlaying){
      this.player.anims.play("run");
      this.shark.anims.play("swim");
   }

   // player movement
    this.upButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.framesMoveUp = 0;
    this.player.body.allowGravity = false;

    // create star group
    this.stars = this.physics.add.group()

    //generate random stars
    this.starGenerator = this.time.addEvent({
      delay: 1000,
      callback: function(){
        var star = this.stars.create(game.config.width, game.config.height * Phaser.Math.FloatBetween(0.05, 0.95), 'star');
        star.setVelocityX(-200);
        star.anims.play("starpulse");
      },
      callbackScope: this,
      loop: true
    });

    // create jellyfish group
    this.jellyfishes = this.physics.add.group()

    //generate random jellyfish
    this.jellyfishGenerator = this.time.addEvent({
      delay: 1000,
      callback: function(){
        var spawnChance = Math.random();
        if (spawnChance <= 0.5) {
          var jellyfish = this.jellyfishes.create(game.config.width, game.config.height * Phaser.Math.FloatBetween(0.05, 0.95), 'jellyfish');
          jellyfish.setVelocityX(-400);
          jellyfish.anims.play("jellyfishpulse");
        }
      },
      callbackScope: this,
      loop: true
    });

    // create trashbag group
    this.trashbags = this.physics.add.group()

    //generate random trashbag
    this.trashbagGenerator = this.time.addEvent({
      delay: 2000,
      callback: function(){
        var spawnChance = Math.random();
        if (spawnChance <= 0.25) {
          var trashbag = this.trashbags.create(game.config.width, game.config.height * Phaser.Math.FloatBetween(0.05, 0.95), 'trashbag');
          trashbag.setVelocityX(-100);
          trashbag.anims.play("trashbagpulse");
        }
      },
      callbackScope: this,
      loop: true
    });

    // create net group
    this.nets = this.physics.add.group()

    //generate random net
    this.netGenerator = this.time.addEvent({
      delay: 2000,
      callback: function(){
        var spawnChance = Math.random();
        if (spawnChance <= 0.25) {
          var net = this.nets.create(game.config.width, game.config.height * Phaser.Math.FloatBetween(0.05, 0.95), 'net');
          net.setVelocityX(-100);
          net.anims.play("netpulse");
        }
      },
      callbackScope: this,
      loop: true
    });

    // create yellowcoral group
    this.yellowcorals = this.physics.add.group()

    //generate random yellowcoral
    this.yellowcoralGenerator = this.time.addEvent({
      delay: 2000,
      callback: function(){
        var spawnChance = Math.random();
        if (spawnChance <= 0.25) {
          var yellowcoral = this.yellowcorals.create(game.config.width, game.config.height * Phaser.Math.FloatBetween(0.05, 0.95), 'yellowcoral');
          yellowcoral.setVelocityX(-100);
          this.physics.add.collider(this.player, yellowcoral, (player, coral) => {
            // var touching = player.body.wasTouching;
            // if (touching.down) {
            //   coral.body.velocity.y = 0;
            //   coral.body.allowGravity = false;
            //   coral.body.mass = 100;
            // }
            coral.body.velocity.x = -100;
            coral.body.velocity.y = 0;
          }, null, this);
         }
      },
      callbackScope: this,
      loop: true
    });

    // create greencoral group
    this.greencorals = this.physics.add.group()

    //generate random greencoral
    this.greencoralGenerator = this.time.addEvent({
      delay: 2000,
      callback: function(){
        var spawnChance = Math.random();
        if (spawnChance <= 0.25) {
          var greencoral = this.greencorals.create(game.config.width, game.config.height * Phaser.Math.FloatBetween(0.05, 0.95), 'greencoral');
          greencoral.setVelocityX(-100);
          this.physics.add.collider(this.player, greencoral, (player, coral) => {
            coral.body.velocity.x = -100;
            coral.body.velocity.y = 0;
          }, null, this);
        }
      },
      callbackScope: this,
      loop: true
    });

    // create pinkcoral group
    this.pinkcorals = this.physics.add.group()

    //generate random pinkcoral
    this.pinkcoralGenerator = this.time.addEvent({
      delay: 2000,
      callback: function(){
        var spawnChance = Math.random();
        if (spawnChance <= 0.25) {
          var pinkcoral = this.pinkcorals.create(game.config.width, game.config.height * Phaser.Math.FloatBetween(0.05, 0.95), 'pinkcoral');
          pinkcoral.setVelocityX(-100);
          this.physics.add.collider(this.player, pinkcoral, (player, coral) => {
            coral.body.velocity.x = -100;
            coral.body.velocity.y = 0;
          }, null, this);
        }
      },
      callbackScope: this,
      loop: true
    });

     //  Setting collisions for stars

     this.physics.add.overlap(this.player, this.stars, function(player, star){
      if (gameOptions.SFXmuted === false) {
        starCollected.play()
      }
      this.tweens.add({
          targets: star,
          y: star.y - 100,
          alpha: 0,
          duration: 800,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete: function(){
              
              this.stars.killAndHide(star);
              this.stars.remove(star);
              if(this.timeLeft > 60) {
                this.timeLeft += 1;
              }
              let stepWidth = this.energyMask.width * gameOptions.initialTime;
              this.energyMask.x += stepWidth;
          }
        });
       }, null, this);

     //  Setting collisions for jellyfish
     this.physics.add.overlap(this.player, this.jellyfishes, function(player, jellyfish){
      if (gameOptions.SFXmuted === false) {
        jellymodesound.play()
      }
      this.tweens.add({
          targets: jellyfish,
          y: jellyfish.y - 100,
          alpha: 0,
          duration: 800,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete: function(){

              this.jellyfishes.killAndHide(jellyfish);
              this.jellyfishes.remove(jellyfish);
              this.player.anims.play("run2")

              if(this.timeLeft > 60) {
                this.timeLeft += 1;
              }
              let stepWidth = this.energyMask.width * gameOptions.initialTime;
              this.energyMask.x += stepWidth;
          }
      });

      var timer = this.time.addEvent({
        delay: 5000,
        callback: function(){
          this.player.anims.play("run")
        },
      
      callbackScope: this,
      loop: false
      });

    }, null, this);

    //  Setting collisions for trashbags
    this.physics.add.overlap(this.player, this.trashbags, function(player, trashbag){


      trashbag.setTint(0xff0000);
      
      if (gameOptions.SFXmuted === false)  {
        obstacleHit.play()
      }

      this.tweens.add({
          targets: trashbag,
          y: trashbag.y - 100,
          alpha: 0,
          duration: 800,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete: function(){

              this.trashbags.killAndHide(trashbag);
              this.trashbags.remove(trashbag);

              if(this.timeLeft > 60) {
                this.timeLeft += 1;
              }

              let stepWidth = this.energyMask.width * gameOptions.initialTime;
              this.energyMask.x += stepWidth;
          }
      });

    }, null, this);

     //  Setting collisions for trashbags
     this.physics.add.overlap(this.player, this.nets, function(player, net){


      net.setTint(0xff0000);

      if (gameOptions.SFXmuted === false)  {
        obstacleHit.play()
      }

      this.tweens.add({
          targets: net,
          y: net.y - 100,
          alpha: 0,
          duration: 800,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete: function(){
              this.nets.killAndHide(net);
              this.nets.remove(net);
              if(this.timeLeft > 60) {
                this.timeLeft += 1;
              }

              let stepWidth = this.energyMask.width * gameOptions.initialTime;
              this.energyMask.x += stepWidth;
          }
      });

    }, null, this);
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

  moveTurtle() {
    // if (gameOver)
    //     return

    // if (!gameStarted)
    //     startGame(game.scene.scenes[0])

    this.player.setVelocityY(-380)
    this.player.angle = 0
    this.framesMoveUp = 15

    
}

  update(){

    if (gameOptions.SFXmuted === false) {
      this.muteSFX.setText("SFX off")
      this.muteSFX.setInteractive();
      this.muteSFX.on('pointerdown', () => {
          gameOptions.SFXmuted = true
        });
    }

    if (gameOptions.SFXmuted === true) {
      this.muteSFX.setText("SFX on")
      this.muteSFX.setInteractive();
      this.muteSFX.on('pointerdown', () => {
          gameOptions.SFXmuted = false
        });
    }


    if (gameOptions.musicMuted === false) {
      this.muteMusic.setText("Music off")
      this.muteMusic.setInteractive()
      this.muteMusic.on('pointerdown', () => {
        this.bgmusic.stop()
        gameOptions.musicMuted = true
      });
    }

    if (gameOptions.musicMuted === true) {
      this.muteMusic.setText("Music on")
      this.muteMusic.setInteractive()
      this.muteMusic.on('pointerdown', () => {
        this.bgmusic.play()
          gameOptions.musicMuted = false
        });
    }

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

  if (this.framesMoveUp > 0)
        this.framesMoveUp--
    else if (Phaser.Input.Keyboard.JustDown(this.upButton))
        this.moveTurtle()
    else {
        this.player.setVelocityY(100)

        if (this.player.angle < 50)
            this.player.angle += 1
    }

    this.physics.add.collider(this.shark, this.sharkplatforms);
    this.shark.body.setBounce(1);


   // check if enemy's step counter has reach limit
   this.shark.body.velocity.x = this.shark.factor * -50;

  }

}
