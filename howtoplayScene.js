class howToPlay extends Phaser.Scene {

  constructor(){
      super("HowToPlay");
  }
   

  create() {
    this.add.image(640, 360, 'sea')
  }
}