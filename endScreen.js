class endScreen extends Phaser.Scene {

  constructor(){
      super("EndScreen");
  }
   

  create() {

      
      this.add.image(640, 360, 'sea')
  
      
      this.add.text(290, 170, 'SCORE: ' + gameOptions.lastScore, { fontFamily: 'Helvectiva Neue', fontSize: '50px' })
      this.add.text(450, 300, 'Enter your name:', { fontFamily: 'Helvectiva Neue', fontSize: '30px' })
      
      
    this.inputText = this.add.rexInputText(560, 420, {
        type: 'textarea',
        text: 'your name',
        fontSize: '30px',
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


        var scores = this.add.image(500, 500, 'submitScore')

        scores.setInteractive();
        scores.on('pointerdown', () => {
        gameOptions.scores.push({name: this.inputText.text, score: gameOptions.lastScore})
          this.scene.start("ScoreScene");
        })

    
      var again = this.add.image(800, 500, 'playAgain')

      again.setInteractive();

      again.on('pointerdown', () => { 
      gameOptions.lastScore = 0;
      this.scene.start("PlayGame");
  
  });
}
  }