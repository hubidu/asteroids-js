var geo = require('./geo');
var Game = require('./game');

window.onload = function() {

  var ship = new geo.Polygon([ geo.Vector.create([0, 0]), geo.Vector.create([10, 0]), geo.Vector.create([5, 15]), geo.Vector.create([0, 0]) ], geo.Vector.create([5, 5]));
  ship.scale(2);
  var pos = geo.Vector.create([200, 100]);

  var canvas = document.getElementById("canvas");
  var game = new Game(canvas);

  function render(timestamp) {
      // Reset canvas
      game.clear();

      // Draw the ship
      game.draw(pos, ship);

      window.requestAnimationFrame(render);
  }

  /**
   * Game loop
   */
   window.requestAnimationFrame(render);

   /**
    * Keyboard Events
    */
    var Angle = Math.PI / 16;
    window.onkeydown = function(e) {
      if(e.keyCode === 37) {
        ship.rotate(-Angle);
      } else if(e.keyCode === 39) {
        ship.rotate(Angle);
      }
    };

};
