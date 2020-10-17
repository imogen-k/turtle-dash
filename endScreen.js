class endScreen extends Phaser.Scene {

  constructor(){
      super("EndScreen");
  }
   

  create() {

      
      this.add.image(640, 360, 'sea')

      this.add.text(640, 60, 'SCORE: (enter last score here)', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' })
      this.add.text(640, 80, 'Enter your name:')
      
      
    this.inputText = this.add.rexInputText(400, 150, 10, 10, {
        type: 'textarea',
        text: 'your name',
        fontSize: '12px',
    })
        .resize(100, 100)
        .setOrigin(0.5)
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



        var scores = this.add.image(600, 200, 'submitScore')

        scores.setInteractive();
        scores.on('pointerdown', () => {
        gameOptions.scores.push(this.inputText.text)
          this.scene.start("ScoreScene");
        })

    

      



      var again = this.add.image(640, 360, 'playAgain')

      again.setInteractive();

      again.on('pointerdown', () => { 
     
      this.scene.start("PlayGame");
  
  });
}
  }