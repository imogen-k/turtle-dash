class loadingScene extends Phaser.Scene {

  constructor(){
      super("LoadingScene");
  }
   
  preload() {
    this.load.image('sea', './assets/sea-background.jpg');
  }

  create() {
    
    this.add.image(640, 360, 'sea')
  //   this.load.spritesheet("turtleStart", "./assets/turtle-start.png", {
  //     frameWidth: 800,
  //     frameHeight: 600
  // });
  
  // this.anims.create({
  //   key: "turtleStart",
  //   frames: this.anims.generateFrameNumbers("turtleStart", {
  //       start: 0,
  //       end: 145
  //   }),
  //   frameRate: 20,
  //   repeat: -1
  // });
  } 
}
