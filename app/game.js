var geo = require('./geo');
var Ship = require('./ship');
var Asteroid = require('./asteroid');

var TWOPI = 2*Math.PI;

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
  isOutOfArea: function(obj) {
    var pos = obj.pos;

    var x1 = pos.e(1);
    var x2 = pos.e(2);

    return x1 > this.width || x1 < 0 || x2 > this.height || x2 < 0;
  },

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
    ctx.fillRect(0, 0, this.width, this.height);
  },

  /**
   * Draw a shape at the specified position on the canvas
   *
   * @param  {[type]} pos   [description]
   * @param  {[type]} shape [description]
   */
  draw: function(obj) {
    // TODO: REFACTOR this. Ugly and not object-oriented
    if(obj.shape instanceof geo.Polygon) {
        this._drawPolygon(obj);
    } else if(obj.shape instanceof geo.Circle) {
        this._drawCircle(obj);
    }
  },

  _drawCircle: function(obj) {
    var ctx = this.ctx;
    var shape = obj.shape;
    var pos = obj.pos.add(obj.shape.center);

    //ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(pos.e(1), pos.e(2), shape.radius, 0, TWOPI);
    ctx.stroke();
  },

  _drawPolygon: function(obj) {
    var pos = obj.pos;
    var shape = obj.shape;
    var speed = obj.shape.center.add(obj.speed.multiply(3)) || obj.shape.center;

    var ctx = this.ctx;

    ctx.strokeStyle = "white";
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
    this.ship = new Ship();
    this.asteroids = [];
    for(var i=0; i<8 + this.level; i++) {
      this.asteroids.push(new Asteroid());
    }

    this.objects = {
      ship: this.ship,
      asteroids: this.asteroids,
      bullets: []
    };
    //this.objects.push(this.ship);
    //this.objects = this.objects.concat(this.asteroids);
  },

  nextLevel: function() {
    this.level++;
    this.init();
  },

  /**
   * Advance the game (e. g. move game objects)
   */
  step: function() {
      var ship = this.objects.ship;
      var asteroids = this.objects.asteroids;
      var bullets = this.objects.bullets;

      if(asteroids.length === 0) {
        this.nextLevel();
      }

      // Check collisions with ship
      var collisionWithAsteroid = _.any(asteroids, function(asteroid) {
        return ship.collisionWith(asteroid);
      }.bind(this));
      if(collisionWithAsteroid) {
        // Restart game
        this.init();
      }

      // Check game boundaries
      ship = this.area.flipOver(ship);
      this.objects.asteroids.forEach(function(asteroid) {
        this.area.flipOver(asteroid);
      }.bind(this));

      bullets.forEach(function(bullet) {
        // TODO: Check if bullet hits an asteroid
        var asteroidBeingHit = _.find(asteroids, function(asteroid) {
          return bullet.hits(asteroid);
        });

        if(asteroidBeingHit) {
          // TODO: Explode asteroid
          asteroidBeingHit.explode();

          var idx = asteroids.indexOf(asteroidBeingHit);
          asteroids.splice(idx, 1);
        }

        // Remove bullet when hit or out-of-bounds
        if(asteroidBeingHit || this.area.isOutOfArea(bullet)) {
          idx = this.objects.bullets.indexOf(bullet);
          this.objects.bullets.splice(idx, 1);
        }
      }.bind(this));


      // Advance the game objects
      function moveObj(obj) {
          obj.step();
      }
      ship.step();
      asteroids.forEach(moveObj.bind(this));
      bullets.forEach(moveObj.bind(this));
  },

  /**
   * Render the game state
   */
  render: function() {
      function drawObj(obj) {
        this.area.draw(obj);
      }
      // Reset canvas
      // TODO: Optimize: Just clear areas which need to be redrawn
      this.area.clear();

      // Draw objects
      this.area.draw(this.objects.ship);
      this.objects.asteroids.forEach(drawObj.bind(this));
      this.objects.bullets.forEach(drawObj.bind(this));
  },

  /**
   * Ship fires a bullet
   */
  onShipFires: function() {
    // TODO: Add to bullets
    this.objects.bullets.push(this.ship.fire());
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
