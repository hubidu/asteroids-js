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
      game.step();

      game.render();

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
        game.onShipTurnLeft();
        //ship.turnLeft();
      } else if(e.keyCode === 39) {
        game.onShipTurnRight();
        //ship.turnRight();
      } else if(e.keyCode === 38) {
        game.onShipThrust();
        //ship.thrust();
      } else if(e.keyCode === 30) {
        game.onShipFires();
      } else {
        console.log(e);
      }
    };

};
