var _ = require('lodash');
var geo = require('./geo');
var Ship = require('./ship');
var Asteroid = require('./asteroid');

var TWOPI = 2*Math.PI;

function GameArea(canvas, background, options) {
  this.options = options || {};
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");

  // Background image
  this.background = background;

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
  clear: function(shipVelocity) {
    // Trying to make the background a little dynamic by translating it
    // slightly against current ship velocity
    shipVelocity = shipVelocity.multiply(-1);

    var ctx = this.ctx;
    //ctx.fillRect(0, 0, this.width, this.height);
    // Using a nice image as background
    ctx.drawImage(this.background, shipVelocity.e(1), shipVelocity.e(2), this.width, this.height);
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
        this._drawPolygon(obj.pos, obj.shape, obj.speed);
    } else if(obj.shape instanceof geo.Circle) {
        this._drawCircle(obj);
    }
  },

  _drawCircle: function(obj) {
    var ctx = this.ctx;
    var shape = obj.shape;
    var pos = obj.pos.add(obj.shape.center);

    ctx.beginPath();
    ctx.arc(pos.e(1), pos.e(2), shape.radius, 0, TWOPI);
    ctx.stroke();
  },

  _drawPolygon: function(pos, shape, speed) {
    //var pos = obj.pos;
    //var shape = obj.shape;
    var speed = shape.center.add(speed.multiply(3)) || shape.center;
    var center = pos.add(shape.center);

    var ctx = this.ctx;

    var actualPoints = shape.points.map(function(point) {
      var p = geo.Vector.create(pos);
      return p.add(point);
    });

    // Outline
    //ctx.strokeStyle = "#ddd";
    //ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 2;
    ctx.beginPath();

    actualPoints.forEach(function(p) {
     if (p === actualPoints[0]) {
       ctx.moveTo(p.e(1), p.e(2));
     } else {
       ctx.lineTo(p.e(1), p.e(2));
     }
    } );
    ctx.fill();
    ctx.lineJoin = "bevel";
    ctx.stroke();

    // Fill
    /*
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 1;
    ctx.beginPath();
    actualPoints.forEach(function(p) {
     if (p === actualPoints[0]) {
       ctx.moveTo(p.e(1), p.e(2));
     } else {
       ctx.lineTo(center.e(1), center.e(2));
       ctx.moveTo(p.e(1), p.e(2));
     }
    } );
    ctx.stroke();
    */

    // DEBUG: Draw the speed vector
    if(this.options.debug) {
      ctx.strokeStyle = "red";
      ctx.beginPath();
      var x1 = center;
      var x2 = pos.add(speed);
      ctx.moveTo(x1.e(1), x1.e(2));
      ctx.lineTo(x2.e(1), x2.e(2));
      ctx.stroke();
    }
    // DEBUG: Draw the bounding rect
    if(this.options.debug) {
      var rect = shape.rect().translate(pos);
      ctx.strokeRect(rect.p1.e(1), rect.p1.e(2), rect.width(), rect.height());
    }
  }

};

function Game(canvas, background, options) {
  // The game area
  this.area = new GameArea(canvas, background, options);

  // Game level
  this.level = 1;
}

Game.prototype = {

  /**
   * Initialize the game
   */
  init: function() {
    var ship = new Ship(this.area);
    var asteroids = [];
    for(var i = 0; i < 2 + this.level; i++) {
      asteroids.push(new Asteroid({ area: this.area }));
    }

    this.objects = {
      ship: ship,
      asteroids: asteroids,
      bullets: []
    };
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

      // Successfully completed a level
      var NUM_ASTEROIDS = asteroids.length;
      if(NUM_ASTEROIDS === 0) {
        this.nextLevel();
      }

      // Check collisions with ship
      var collisionWithAsteroid = false;
      for(var i = 0; i < NUM_ASTEROIDS; i++) {
        collisionWithAsteroid = ship.collisionWith(asteroids[i]);
        if(collisionWithAsteroid) break;
      }
      /*
      var collisionWithAsteroid = _.any(asteroids, function(asteroid) {
        return ship.collisionWith(asteroid);
      }.bind(this));
      */
      if(collisionWithAsteroid) {
        ship.explode(function() {
          // Restart game
          this.init();
        }.bind(this));
      }

      // Check game boundaries
      ship = this.area.flipOver(ship);
      this.objects.asteroids.forEach(function(asteroid) {
        this.area.flipOver(asteroid);
      }.bind(this));

      // Bullet hit an asteroid?
      bullets.forEach(function(bullet) {
        var asteroidBeingHit = _.find(asteroids, function(asteroid) {
          return bullet.hits(asteroid);
        });

        // We have an hit
        if(asteroidBeingHit) {
          // The asteroid will be split up in parts
          this.objects.asteroids = asteroids = asteroids.concat(asteroidBeingHit.explode());

          // The hit asteroid will be removed
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
      /*
      function drawObj(obj) {
        this.area.draw(obj);
      }
      */
      var ship = this.objects.ship;

      // Reset canvas
      this.area.clear(ship.speed);

      // Draw objects
      //this.area.draw(ship);
      ship.draw();

      var NumAsteroids = this.objects.asteroids.length;
      for(var i = 0; i < NumAsteroids; i++) {
        this.objects.asteroids[i].draw();
      }
      var NumBullets = this.objects.bullets.length;
      for(i = 0; i < NumBullets; i++) {
        this.objects.bullets[i].draw();
      }
      /*
       * Seems to be a few ms slower
      this.objects.asteroids.forEach(drawObj.bind(this));
      this.objects.bullets.forEach(drawObj.bind(this));
      */
  },

  /**
   * Ship fires a bullet
   */
  onShipFires: function() {
    // TODO: Add to bullets
    this.objects.bullets.push(this.objects.ship.fire());
  },

  onShipTurnLeft: function() {
    this.objects.ship.turnLeft();
  },

  onShipTurnRight: function() {
    this.objects.ship.turnRight();
  },

  onShipThrust: function() {
    this.objects.ship.thrust();
  }

};

module.exports = Game;
