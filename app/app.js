var _ = require('lodash');

var Game = require('./game');


window.onload = function() {

  var canvas = document.getElementById("canvas");

  var game = new Game(canvas);
  game.init();

  /**
   * Game render loop
   */
  function render(timestamp) {
      game.render();
  }

  /**
   * Game loop
   */
  setInterval(function() {
      game.step();

      window.requestAnimationFrame(render);
  }, 20);
  // window.requestAnimationFrame(render);

   /**
    * Keyboard Events
    */
    window.onkeydown = function(e) {
      if(e.keyCode === 37) {
        game.onShipTurnLeft();
        //ship.turnLeft();
      } else if(e.keyCode === 39) {
        game.onShipTurnRight();
        //ship.turnRight();
      } else if(e.keyCode === 38) {
        game.onShipThrust();
        //ship.thrust();
      } else if(e.keyCode === 32) {
        game.onShipFires();
      } else {
        console.log(e);
      }
    };

};
