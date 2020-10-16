class endScreen extends Phaser.Scene {

  constructor(){
      super("EndScreen");
  }
   

  create() {
      this.add.image(640, 360, 'sea')
      var again = this.add.image(640, 360, 'playAgain')

      again.setInteractive();

      again.on('pointerdown', () => { 
     
      this.scene.start("PlayGame");
  
  });
}
  }