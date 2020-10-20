class scoreScene extends Phaser.Scene {

    constructor(){
        super("ScoreScene");
    }    
  
    create() {
 
        this.add.image(640, 360, 'sea')
        this.add.text(420, 80, 'HIGH SCORES', { fontFamily: 'bubble_bobbleregular', fontSize: '100px' })
        this.add.text(500, 220, 'Name:', { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })
        this.add.text(750, 220, 'Score:', { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })

        this.leaderboard = JSON.parse(localStorage.getItem('leaderboard'))
        this.sortLeaderboard(this.leaderboard);
        this.displayLeaderboard(this.leaderboard);
        this.resetLocalStorage(this.leaderboard)

        var playAgainButton = this.add.image(640, 600, 'playAgain')
        playAgainButton.setInteractive();
        playAgainButton.on('pointerdown', () => { this.scene.start("PlayGame")});
    }

    sortLeaderboard(leaderboard) {
        leaderboard.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0)); 
    }

    displayLeaderboard(leaderboard) {
        var height = 270
        for(var i = 0; i < leaderboard.length && i < 5; i++) { 
            var nameToDisplay = leaderboard[i].name
            var scoreToDisplay = leaderboard[i].score
            this.add.text(500, height, nameToDisplay, { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })
            this.add.text(750, height, scoreToDisplay, { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })
            height += 50;
        }
    }

    resetLocalStorage(leaderboard) {
        if (this.leaderboard.length > 6) {
            localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard.slice(0, 5)))
        }
    }
}
