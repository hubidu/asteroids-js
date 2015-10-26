var _ = require('lodash');

var Game = require('./game');


window.onload = function() {

  var canvas = document.getElementById("canvas");
  var img  = document.getElementById("space");

  //var ctx = canvas.getContext("2d");
  //ctx.drawImage(img, 20, 20, 150, 180);

  var options = {
    debug: false
  };
  var game = new Game(canvas, img, options);
  game.init();

  /**
   * Game render loop
   */
  function render(timestamp) {
      var start = Date.now();
      game.render();
      var duration = Date.now() - start;
      if(duration > 5) console.warn("Render duration: " + duration);
  }

  /**
   * Game loop
   */
  setInterval(function() {
      var start = Date.now();
      game.step();
      var duration = Date.now() - start;
      if(duration > 5) console.warn("Game step duration: " + duration);

      window.requestAnimationFrame(render);
  }, 20);
  //window.requestAnimationFrame(render);

   /**
    * Keyboard Events
    */
    window.onkeydown = function(e) {
      // TODO: Auto-repeat keys here to prevent a lag. Stop repeating on keyup
      if(e.keyCode === 37) {
        game.onShipTurnLeft();
      } else if(e.keyCode === 39) {
        game.onShipTurnRight();
      } else if(e.keyCode === 38) {
        game.onShipThrust();
      } else if(e.keyCode === 32) {
        game.onShipFires();
      } else {
        //console.log(e);
      }
    };

};
