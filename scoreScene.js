class scoreScene extends Phaser.Scene {

    constructor(){
        super("ScoreScene");
    }
     
  
    create() {

        // var printText = this.add.text(400, 200, '', {
        //     fontSize: '12px',
        // }).setOrigin(0.5).setFixedSize(100, 100);


  
        
        this.add.image(640, 360, 'sea')
  
        this.add.text(550, 60, 'HIGH SCORES', { fontFamily: 'Helvetica Neue' })
        this.add.text(550, 90, 'Name:', { fontFamily: 'Helvetica Neue' })
        
        this.add.text(550, 110, gameOptions.scores)


       







  

  
        var again = this.add.image(640, 360, 'playAgain')
  
        again.setInteractive();
  
        again.on('pointerdown', () => { 
        this.y += 100
        this.scene.start("PlayGame");
    
    });
  }
    }