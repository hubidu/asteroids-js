var geo = require('./geo');
var Ship = require('./ship');
var Game = require('./game');

window.onload = function() {

  var canvas = document.getElementById("canvas");
  var game = new Game(canvas);
  var ship = new Ship();

  function render(timestamp) {
      // Reset canvas
      // TODO: Optimize: Just clear areas which need to be redrawn
      game.clear();

      // Draw the ship
      ship = game.flipOver(ship);
      game.draw(ship);

      window.requestAnimationFrame(render);
  }

  /**
   * Game loop
   */
   window.requestAnimationFrame(render);

   /**
    * Keyboard Events
    */
    window.onkeydown = function(e) {
      if(e.keyCode === 37) {
        ship.turnLeft();
      } else if(e.keyCode === 39) {
        ship.turnRight();
      } else if(e.keyCode === 38) {
        ship.thrust();
      } else if(e.keyCode === 30) {
        ship.fire();
      } else {
        console.log(e);
      }
    };

};
