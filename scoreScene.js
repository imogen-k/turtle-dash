class scoreScene extends Phaser.Scene {

    constructor(){
        super("ScoreScene");
    }
     
  
    create() {
  
        
        this.add.image(640, 360, 'sea')
  
        this.add.text(640, 60, 'SCORE: (enter last score here)', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
        this.add.text(640, 80, 'Enter your name:')

        
        
     
        var text2 = game.add.text(32, 120, '', style);
         text2.parseList(this.scoreList);
      
  

  
        var again = this.add.image(640, 360, 'playAgain')
  
        again.setInteractive();
  
        again.on('pointerdown', () => { 
       
        this.scene.start("PlayGame");
    
    });
  }
    }