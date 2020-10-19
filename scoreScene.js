class scoreScene extends Phaser.Scene {

    constructor(){
        super("ScoreScene");
    }
     
  
    create() {
 
        this.add.image(640, 360, 'sea')
  
        this.add.text(450, 130, 'HIGH SCORES', { fontFamily: 'Helvectiva Neue', fontSize: '50px' })
        this.add.text(450, 220, 'Name:', { fontFamily: 'Helvetica Neue', fontSize: '20px' })

        this.add.text(700, 220, 'Score:', { fontFamily: 'Helvetica Neue', fontSize: '20px' })
        
        this.add.text(450, 260, gameOptions.scores, { fontFamily: 'Helvetica Neue', fontSize: '20px' })

        console.log('showing gameOptions.scores')
        console.log(gameOptions.scores)

  
        var again = this.add.image(640, 500, 'playAgain')
  
        again.setInteractive();
  
        again.on('pointerdown', () => { 
        this.scene.start("PlayGame");
    
    });
  }
    }