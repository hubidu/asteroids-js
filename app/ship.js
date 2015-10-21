var geo = require('./geo');

var Angle = Math.PI / 16;
var Accel = 1; // px per time unit
var NullVector = geo.Vector.create([0, 0]);

function Ship() {
  this.shape = new geo.Polygon([ geo.Vector.create([0, 0]), geo.Vector.create([10, 0]), geo.Vector.create([5, 15]), geo.Vector.create([0, 0]) ], geo.Vector.create([5, 5]));
  this.shape.scale(2);

  // Current position of the ship
  this.pos = geo.Vector.create([200, 100]);
  // Direction into which ship is heading
  this.dir = geo.Vector.create([0, 1]);
  // Ship speed vector
  this.speed = geo.Vector.create([0, 0]);

  setInterval(function() {
    // Move ship with current speed vector
    this.pos = this.pos.add(this.speed);
  }.bind(this), 20);
}


Ship.prototype = {

    turnLeft: function() {
      this.shape.rotate(-Angle);
      this.dir = this.dir.rotate(-Angle, NullVector);
    },

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
      console.log('Should be firing!');
    },

    /**
     * Check if ship collides with given object
     */
    collisionWith: function(obj) {
      return this.shape.intersects(obj.shape);
    }

};

module.exports = Ship;
