class startMenu extends Phaser.Scene {

    constructor(){
        super("StartMenu");
    }
     

    create() {
        this.add.image(640, 360, 'sea')
        var play = this.add.image(640, 360, 'playButton')
        play.setInteractive();

        play.on('pointerdown', () => { 
       
        this.scene.start("PlayGame");
    
    });
  }
    }


