class scoreScene extends Phaser.Scene {

    constructor(){
        super("ScoreScene");
    }
     
  
    create() {
 
        this.add.image(640, 360, 'sea')
  
        this.add.text(550, 60, 'HIGH SCORES', { fontFamily: 'Helvetica Neue' })
        this.add.text(550, 90, 'Name:', { fontFamily: 'Helvetica Neue' })
        
        this.add.text(550, 110, gameOptions.scores)


    
  
        var again = this.add.image(640, 360, 'playAgain')
  
        again.setInteractive();
  
        again.on('pointerdown', () => { 
        this.scene.start("PlayGame");
    
    });
  }
    }