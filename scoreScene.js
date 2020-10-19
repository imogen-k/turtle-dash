class scoreScene extends Phaser.Scene {

    constructor(){
        super("ScoreScene");
    }
     
  
    create() {
 
        this.add.image(640, 360, 'sea')
  
        this.add.text(450, 130, 'HIGH SCORES', { fontFamily: 'Helvectiva Neue', fontSize: '50px' })
        this.add.text(450, 220, 'Name:', { fontFamily: 'Helvetica Neue', fontSize: '20px' })

        this.add.text(700, 220, 'Score:', { fontFamily: 'Helvetica Neue', fontSize: '20px' })
        
        var height = 270

        for(var i = 0; i < gameOptions.scores.length || i === 5; i++) { 
            console.log(gameOptions.scores[i].score)   
            var nameToDisplay = gameOptions.scores[i].name
            var scoreToDisplay = gameOptions.scores[i].score
            this.add.text(450, height, nameToDisplay, { fontFamily: 'Helvetica Neue', fontSize: '20px' })
            this.add.text(700, height, scoreToDisplay, { fontFamily: 'Helvetica Neue', fontSize: '20px' })
            height += 50;
        }
        

        var again = this.add.image(640, 500, 'playAgain')
  
        again.setInteractive();
  
        again.on('pointerdown', () => { 
        this.scene.start("PlayGame");
    
    });
  }
    }