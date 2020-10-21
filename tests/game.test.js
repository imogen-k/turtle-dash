const Phaser = require('../dist/phaser.js')
const Game = require('../game.js');


test('sets the shark velocity', () => {
  Phaser = new Phaser.Game;
  expect(Game.shark.setVelocityX(100)).toBe(100);
});