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
        audio: {
            mute: false,
            volume: 20,
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

    this.load.image("energycontainer", "./assets/energycontainer.png");
    this.load.image("energybar", "./assets/energybar.png");
    this.load.audio("backgroundmusic", ["./assets/bensound-memories.ogg", "./assets/bensound-memories.mp3"])
    this.load.audio("jellymode", "zapsplat_cartoon_magic_ascend_spell.mp3")
    this.load.audio("hit-obstacle", "zapsplat_sound_design_impact_hit_sub_drop_punchy_001_54851.mp3")
    this.load.audio("collect-star", "zapsplat_multimedia_alert_bell_ping_wooden_008_54058.mp3")

    // invisible shark platform
    this.load.image('sharkplatform', './assets/invisible-shark-platform.png');

    // invisible coral platform
    this.load.image('coralplatform', './assets/invisible-coral-platform1.png');

    // coral
    this.load.image('coral1', './assets/coral1.png');
    this.load.image('coral2', './assets/coral2.png');
    this.load.image('coral3', './assets/coral3.png');

    //buttons
    this.load.image('playButton', './assets/play-button.png');
    this.load.image('playAgain', './assets/play-again.png');
    this.load.image('submitScore', './assets/submit-score.png');

    this.scoreList = [];

    // shark is a sprite sheet made 
    this.load.spritesheet("shark", "./assets/shark2.png", {
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
    // the animated turtle is a sprite sheet made by 800 x 600 pixels
    this.load.spritesheet("turtleStart", "./assets/turtle-start.png", {
      frameWidth: 800,
      frameHeight: 600
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

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.sharkplatforms = this.physics.add.staticGroup();
    this.coralplatforms = this.physics.add.staticGroup();
    this.coral = this.physics.add.staticGroup();

    //  Create inivisible shark platforms
    this.sharkplatforms.create(800, 150, 'sharkplatform');
    this.sharkplatforms.create(800, 450, 'sharkplatform');
    this.sharkplatforms.create(400, 250, 'sharkplatform');

    //  Create inivisible coral platforms
    this.coralplatforms.create(700, 200, 'coralplatform');
    this.coralplatforms.create(900, 297, 'coralplatform');
    this.coralplatforms.create(500, 293, 'coralplatform');

    //  Create coral
    this.coral.create(701, 150, 'coral1');
    this.coral.create(901, 250, 'coral2');
    this.coral.create(501, 250, 'coral3');

    // group with all active rocks.
    this.rocksGroup = this.add.group();

    // adding a rocks
    this.addRocks()

    // adding the player;
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.7, "player");
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setDepth(2);


    this.timeLeft = gameOptions.initialTime;

    var bgmusic = this.sound.add('backgroundmusic');
    bgmusic.play()

    
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
            if(this.timeLeft === 115){
                bgmusic.stop()
                this.scene.start("EndScreen")
            }
        },
        callbackScope: this,
        loop: true
    });




    this.player.setBounce(1.5);
    this.player.setCollideWorldBounds(true);

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

  moveTurtle() {
    // if (gameOver)
    //     return

    // if (!gameStarted)
    //     startGame(game.scene.scenes[0])

    this.player.setVelocityY(-380)
    this.player.angle = -20
    this.framesMoveUp = 25
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

  if (this.framesMoveUp > 0)
        this.framesMoveUp--
    else if (Phaser.Input.Keyboard.JustDown(this.upButton))
        this.moveTurtle()
    else {
        this.player.setVelocityY(100)

        if (this.player.angle < 60)
            this.player.angle += 1
    }

    this.physics.add.collider(this.shark, this.sharkplatforms);
    this.shark.body.setBounce(1);

   
   // check if enemy's step counter has reach limit
   this.shark.body.velocity.x = this.shark.factor * -50; 

  }


  
}
