var geo = require('./geo');
var Ship = require('./ship');
var Game = require('./game');

window.onload = function() {

  var canvas = document.getElementById("canvas");
  var game = new Game(canvas);
  var ship = new Ship();

  function render(timestamp) {
      // Reset canvas
      game.clear();

      // Draw the ship
      game.draw(ship.pos, ship.shape);

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
