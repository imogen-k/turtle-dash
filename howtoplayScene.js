class howToPlay extends Phaser.Scene {

  constructor(){
      super("HowToPlay");
  }
   

  create() {
    this.add.image(640, 360, 'sea');
    this.add.text(540, 20, 'How to play', { fontFamily: 'bubble_bobbleregular', fontSize: '50px' });
    this.add.text(410, 80, 'Controls: Use Spacebar/tap to swim up & down', { fontFamily: 'bubble_bobbleregular', fontSize: '25px' });
    this.add.text(250, 110, 'Aim of the game: Swim for as long as possible before the timer reaches zero', { fontFamily: 'bubble_bobbleregular', fontSize: '25px' });
    this.add.image(640, 380, 'howtoplay');

    var play = this.add.image(640, 660, 'playButton');
    play.setInteractive();
    // play button
    play.on('pointerdown', () => { 
       
      this.scene.start("PlayGame");
  
      });

  }
}