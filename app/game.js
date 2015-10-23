var geo = require('./geo');
var Ship = require('./ship');
var Asteroid = require('./asteroid');

function GameArea(canvas, options) {
  this.options = options || {};
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");

  // Game area width
  this.width = canvas.width;
  // Game area height
  this.height = canvas.height;
}

GameArea.prototype = {

  /**
   * Check if the game object reached the game area
   * boundaries. If it did flip it to opposite side.
   */
  flipOver: function(obj) {
    var pos = obj.pos;

    var x1 = pos.e(1);
    if(x1 > this.width)
      x1 = 0;
    if(x1 < 0)
      x1 = this.width;

    var x2 = pos.e(2);
    if(x2 > this.height)
      x2 = 0;
    if(x2 < 0)
      x2 = this.height;


    obj.pos = geo.Vector.create([x1, x2]);

    return obj;
  },


  /**
   * Clear the game canvas for redrawing
   */
  clear: function() {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
  },

  /**
   * Draw a shape at the specified position on the canvas
   *
   * @param  {[type]} pos   [description]
   * @param  {[type]} shape [description]
   */
  draw: function(obj) {
    var pos = obj.pos;
    var shape = obj.shape;
    var speed = obj.shape.center.add(obj.speed.multiply(3)) || obj.shape.center;

    var ctx = this.ctx;

    ctx.strokeStyle = "black";
    ctx.beginPath();

    shape.points.forEach(function(point) {
     var p = geo.Vector.create(pos);
     p = p.add(point);

     if (point === shape.points[0]) {
       ctx.moveTo(p.e(1), p.e(2));
     } else {
       ctx.lineTo(p.e(1), p.e(2));
     }
    } );
    ctx.stroke();

    // DEBUG: Draw the speed vector
    if(this.options.debug) {
      ctx.strokeStyle = "red";
      ctx.beginPath();
      var x1 = pos.add(obj.shape.center);
      var x2 = pos.add(speed);
      ctx.moveTo(x1.e(1), x1.e(2));
      ctx.lineTo(x2.e(1), x2.e(2));
      ctx.stroke();
    }
    // DEBUG: Draw the bounding rect
    if(this.options.debug) {
      var rect = obj.shape.rect().translate(obj.pos);
      ctx.strokeRect(rect.p1.e(1), rect.p1.e(2), rect.width(), rect.height());
    }
  }

};

function Game(canvas, options) {
  // The game area
  this.area = new GameArea(canvas, options);

  // Game level
  this.level = 1;
}

Game.prototype = {

  /**
   * Initialize the game
   */
  init: function() {
    this.level++;
    this.ship = new Ship();
    this.asteroids = [];
    for(var i=0; i<8; i++) {
      this.asteroids.push(new Asteroid());
    }

    this.objects = [];
    this.objects.push(this.ship);
    this.objects = this.objects.concat(this.asteroids);
  },

  /**
   * Advance the game (e. g. move game objects)
   */
  step: function() {
      // Check collisions with ship
      var collisionWithAsteroid = _.any(this.asteroids, function(asteroid) {
        return this.ship.collisionWith(asteroid);
      }.bind(this));
      if(collisionWithAsteroid) {
        // Restart game
        this.init();
      }

      // Check game boundaries
      this.ship = this.area.flipOver(this.ship);
      this.asteroids.forEach(function(asteroid) {
        this.area.flipOver(asteroid);
      }.bind(this));

      // Advance the game objects
      this.objects.forEach(function(obj) {
        if(obj.step) obj.step();

        // TODO: Remove objects when dead/killed

      }.bind(this));
  },

  /**
   * Render the game state
   */
  render: function() {
      // Reset canvas
      // TODO: Optimize: Just clear areas which need to be redrawn
      this.area.clear();

      // Draw objects
      this.objects.forEach(function(obj) {
        this.area.draw(obj);
      }.bind(this));
  },

  /**
   * Ship fires a bullet
   */
  onShipFires: function() {
    this.objects.push(this.ship.fire());
  },

  onShipTurnLeft: function() {
    this.ship.turnLeft();
  },

  onShipTurnRight: function() {
    this.ship.turnRight();
  },

  onShipThrust: function() {
    this.ship.thrust();
  }

};

module.exports = Game;
