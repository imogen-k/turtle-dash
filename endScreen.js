class endScreen extends Phaser.Scene {
  
    constructor(){
        super("EndScreen");
    }

    init(data) {
        this.score = data.score
        this.timeLeft = data.time
    }
   
    create() {
      
        this.add.image(640, 360, 'sea')
        this.add.image(680, 250, 'turtlesad')
        this.add.text(420, 80, 'GAME OVER', { fontFamily: 'bubble_bobbleregular', fontSize: '120px' })
        this.add.text(450, 370, 'SCORE: ' + this.score, { fontFamily: 'bubble_bobbleregular', fontSize: '80px' })
        this.add.text(450, 470, 'Enter your name:', { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })  
        
        this.name = this.add.rexInputText(770, 486, {
            type: 'text',
            text: '<your name>',
            color: '#62b9f6',
            fontSize: '30px',
            fontFamily: 'bubble_bobbleregular',
        });
        this.name.resize(200, 200);
        this.name.on('textchange', (inputText) => {inputText.setStyle(color,'#FFFFFF')});
        this.name.on('click', (inputText) => {inputText.setText('')});


        var submitScoreButton = this.add.image(550, 582, 'submitScore')
        submitScoreButton.setInteractive();
        submitScoreButton.on('pointerdown', () => {
            this.addToLeadboard();
            this.scene.start("ScoreScene");
        })

        var playAgainButton = this.add.image(770, 582, 'playAgain')
        playAgainButton.setInteractive();
        playAgainButton.on('pointerdown', () => { this.scene.start("PlayGame")});

        console.log(this.timeLeft)
        if (this.timeLeft <= 0) {
            this.add.text(450, 300, 'The timer ran out!', { fontFamily: 'bubble_bobbleregular', fontSize: '55px'})
        }
        else {
            this.add.text(450, 300, 'You got eaten!', { fontFamily: 'bubble_bobbleregular', fontSize: '55px' })
        }
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
