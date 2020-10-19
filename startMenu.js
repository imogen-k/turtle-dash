class startMenu extends Phaser.Scene {

    constructor(){
        super("StartMenu");
    }
     

    create() {
        this.add.image(640, 360, 'sea')
        this.add.image(640, 260, 'logo')
        var play = this.add.image(640, 500, 'playButton')
        var howtoplay = this.add.image(640, 580, 'howtoplayButton')
        play.setInteractive();
        howtoplay.setInteractive();

        // play button
        play.on('pointerdown', () => { 
       
        this.scene.start("PlayGame");
    
        });

        // how to play button
        howtoplay.on('pointerdown', () => { 
       
            this.scene.start("HowToPlay");
        
            });
  }
    }


