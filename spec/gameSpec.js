describe("Player", function() {

  var Game = require('../game');
  
  var game;


  beforeEach(function() {
    
    game = new Phaser.Game(400, 400, Phaser.AUTO, '', { preload: preload, create: create, render:render}, false, true);

  });

  it("some test", function() {
   

    //demonstrates use of custom matcher
    expect(game).toBe(song);
  });

  
});
