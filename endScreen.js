class endScreen extends Phaser.Scene {

  constructor(){
      super("EndScreen");
  }
   

  create() {

      
      this.add.image(640, 360, 'sea')
      this.add.image(680, 170, 'turtlesad')
      this.add.text(450, 220, 'GAME OVER', { fontFamily: 'bubble_bobbleregular', fontSize: '100px' })
      this.add.text(450, 320, 'SCORE: ' + gameOptions.lastScore, { fontFamily: 'bubble_bobbleregular', fontSize: '80px' })
      this.add.text(450, 420, 'Enter your name:', { fontFamily: 'bubble_bobbleregular', fontSize: '30px' })  
      
    this.inputText = this.add.rexInputText(770, 492, {
        type: 'textarea',
        text: '<your name>',
        color: '#78758d',
        fontSize: '30px',
        fontFamily: 'bubble_bobbleregular',
    }).resize(200, 150)
        .on('textchange', function (inputText) {
            console.log('showing what user is typing')
            console.log(inputText.text)
        })
        .on('focus', function (inputText) {
            console.log('On focus');
        })
        .on('blur', function (inputText) {
            console.log('On blur');
        })
        .on('click', function (inputText) {
            console.log('On click');
        })
        .on('dblclick', function (inputText) {
            console.log('On dblclick');
        })


        var scores = this.add.image(550, 530, 'submitScore')


        scores.setInteractive();
        scores.on('pointerdown', () => {
        gameOptions.scores.push({name: this.inputText.text, score: gameOptions.lastScore})
          this.scene.start("ScoreScene");
        })


    
      var again = this.add.image(770, 532, 'playAgain')

      again.setInteractive();

      again.on('pointerdown', () => { 
      gameOptions.lastScore = 0;
      this.scene.start("PlayGame");
  
  });

}
  }