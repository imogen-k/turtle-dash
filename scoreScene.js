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

        console.log(localStorage)

        this.leaderboard = JSON.parse(localStorage.getItem('leaderboard'))
        

        
        for(var i = 0; i < leaderboard.length && i < 5; i++) { 
            var nameToDisplay = leaderboard[i].name
            var scoreToDisplay = leaderboard[i].score
            this.add.text(500, height, nameToDisplay, { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })
            this.add.text(750, height, scoreToDisplay, { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })
            height += 50;
        }
        

        var again = this.add.image(640, 600, 'playAgain')
  
        again.setInteractive();
  
        again.on('pointerdown', () => { 
        //gameOptions.lastScore = 0;
        this.scene.start("PlayGame");
        });
    }
}