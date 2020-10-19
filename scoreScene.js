class scoreScene extends Phaser.Scene {

    constructor(){
        super("ScoreScene");
    }
     
  
    create() {
 
        this.add.image(640, 360, 'sea')
 
        this.add.text(420, 80, 'HIGH SCORES', { fontFamily: 'bubble_bobbleregular', fontSize: '100px' })
        this.add.text(500, 220, 'Name:', { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })

        this.add.text(750, 220, 'Score:', { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })
        
        var height = 270


        gameOptions.scores.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0)); 
        
        for(var i = 0; i < gameOptions.scores.length && i < 5; i++) { 
            var nameToDisplay = gameOptions.scores[i].name
            var scoreToDisplay = gameOptions.scores[i].score
            this.add.text(450, height, nameToDisplay, { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })
            this.add.text(700, height, scoreToDisplay, { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })
            height += 50;
        }
        

        var again = this.add.image(640, 600, 'playAgain')
  
        again.setInteractive();
  
        again.on('pointerdown', () => { 
        gameOptions.lastScore = 0;
        this.scene.start("PlayGame");
    
    });
  }
    }