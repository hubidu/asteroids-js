var geo = require('./geo');
var Game = require('./game');

window.onload = function() {

  var ship = new geo.Polygon([ geo.Vector.create([0, 0]), geo.Vector.create([0, 10]), geo.Vector.create([10, 5]), geo.Vector.create([0, 0]) ], geo.Vector.create([5, 5]));
  ship.scale(10);
  var pos = geo.Vector.create([200, 100]);

  var canvas = document.getElementById("canvas");
  var game = new Game(canvas);

  console.log(game);

  /**
   * Game loop
   */
  setInterval(function() {
    ship.rotate(20);

    // Draw the ship
    game.draw(pos, ship);
  }, 200);

};
