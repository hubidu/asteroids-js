var _ = require('lodash');

var geo = require('./geo');
var Ship = require('./ship');
var Asteroid = require('./asteroid');
var Game = require('./game');


window.onload = function() {

  var canvas = document.getElementById("canvas");

  var game,
      ship,
      asteroids;

  // Initialize game
  function init() {
    game = new Game(canvas);
    ship = new Ship();
    asteroids = [ new Asteroid(), new Asteroid(), new Asteroid(), new Asteroid() ];
  }
  init();

  /**
   * Game render loop
   */
  function render(timestamp) {
      // Check collisions with ship
      var collisionWithAsteroid = _.any(asteroids, function(asteroid) {
        return ship.collisionWith(asteroid);
      });
      if(collisionWithAsteroid) {
        // Restart game
        init();
      }

      // Reset canvas
      // TODO: Optimize: Just clear areas which need to be redrawn
      game.clear();

      // Draw objects
      ship = game.flipOver(ship);
      game.draw(ship);

      asteroids.forEach(function(asteroid) {
        game.flipOver(asteroid);
        game.draw(asteroid);
      });

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
