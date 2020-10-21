class endScreen extends Phaser.Scene {
  
    constructor(){
        super("EndScreen");
    }

    init(data) {
        this.score = data.score
    }
   
    create() {
      
        this.add.image(640, 360, 'sea')
        this.add.image(680, 170, 'turtlesad')
        this.add.text(450, 220, 'GAME OVER', { fontFamily: 'bubble_bobbleregular', fontSize: '100px' })
        this.add.text(450, 320, `SCORE: ${this.score}`, { fontFamily: 'bubble_bobbleregular', fontSize: '80px' })
        this.add.text(450, 420, 'Enter your name:', { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })  
        
        this.name = this.add.rexInputText(770, 492, {
            type: 'textarea',
            text: '<your name>',
            color: '#78758d',
            fontSize: '30px',
            fontFamily: 'bubble_bobbleregular',
        });
        this.name.resize(200, 150);
        this.name.on('textchange', (inputText) => {inputText.setStyle(color,'#FFFFFF')});
        this.name.on('click', (inputText) => {inputText.setText('')});


        var submitScoreButton = this.add.image(550, 532, 'submitScore')
        submitScoreButton.setInteractive();
        submitScoreButton.on('pointerdown', () => {
            this.addToLeadboard();
            this.scene.start("ScoreScene");
        })

        var playAgainButton = this.add.image(770, 532, 'playAgain')
        playAgainButton.setInteractive();
        playAgainButton.on('pointerdown', () => { this.scene.start("PlayGame")});
    }

    addToLeadboard() {
        var newEntry = {name: this.name.text, score: this.score}
        if (localStorage.getItem('leaderboard')) {
            var currentLeaderboard = JSON.parse(localStorage.getItem('leaderboard'))
            currentLeaderboard.push(newEntry)
            localStorage.setItem('leaderboard', JSON.stringify(currentLeaderboard))
        } else {
            localStorage.setItem('leaderboard', '[' + JSON.stringify(newEntry) + ']');
        }
    }
}
module.exports = endScreen;