class scoreScene extends Phaser.Scene {

    constructor(){
        super("ScoreScene");
    }
     
  
    create() {
 
        this.add.image(640, 360, 'sea')
  
        this.add.text(420, 80, 'HIGH SCORES', { fontFamily: 'bubble_bobbleregular', fontSize: '100px' })
        this.add.text(500, 220, 'Name:', { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })

        this.add.text(750, 220, 'Score:', { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })
        
        this.add.text(500, 260, gameOptions.scores, { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })

  
        var again = this.add.image(640, 500, 'playAgain')
  
        again.setInteractive();
  
        again.on('pointerdown', () => { 
        this.scene.start("PlayGame");
    
    });
  }
    }