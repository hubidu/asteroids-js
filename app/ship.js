var geo = require('./geo');
var Bullet = require('./bullet');
/**
 * Constants
 */
var Angle = Math.PI / 16;
var Accel = 1; // px per time unit
var NullVector = geo.Vector.create([0, 0]);

function Ship() {
  // The shape of the ship and its center position
  var centerPoint = geo.Vector.create([5, 5]);
  this.shape = new geo.Polygon([ geo.Vector.create([0, 0]), geo.Vector.create([10, 0]), geo.Vector.create([5, 15]), geo.Vector.create([0, 0]) ], centerPoint);
  this.shape.scale(2);

  // Current position of the ship
  this.pos = geo.Vector.create([200, 100]);
  // Direction into which ship is heading
  this.dir = geo.Vector.create([0, 1]);
  // Ship speed vector
  this.speed = geo.Vector.create([0, 0]);

  // TODO: Move this to game.step()
  setInterval(function() {
    // Move ship with current speed vector
    this.pos = this.pos.add(this.speed);
    this.center = this.pos.add(centerPoint);
  }.bind(this), 20);
}


Ship.prototype = {
    /**
     * Turn the ship to the left
     */
    turnLeft: function() {
      this.shape.rotate(-Angle);
      this.dir = this.dir.rotate(-Angle, NullVector);
    },

    /**
     * Turn the ship to the right
     */
    turnRight: function() {
      this.shape.rotate(Angle);
      this.dir = this.dir.rotate(Angle, NullVector);
    },

    /**
     * Accelerate the ship in current heading direction
     */
    thrust: function() {
      // TODO: Scale the direction vector using the acceleration
      // and add to speed vector
      this.speed = this.speed.add(this.dir.multiply(Accel));
      console.log(this.speed);
    },

    /**
     * Fire laser
     */
    fire: function() {
      return new Bullet(this.center, this.dir);
    },

    /**
     * Check if ship collides with given object
     */
    collisionWith: function(obj) {
      // Make a quick check using the objects bounding rectangles
      var rect1 = this.shape.rect().translate(this.pos);
      var rect2 = obj.shape.rect().translate(obj.pos);
      return rect1.intersects(rect2);
    }


};

module.exports = Ship;
