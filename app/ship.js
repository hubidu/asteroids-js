var geo = require("./geo");
var Bullet = require("./bullet");
/**
 * Constants
 */
var Angle = Math.PI / 16;
var Accel = 1; // px per time unit
var NullVector = geo.Vector.create([0, 0]);

function Ship(area) {
  // The game area
  this.area = area;

  // The shape of the ship and its center position
  this.centerPoint = geo.Vector.create([5, 5]);
  this.shape = new geo.Polygon([ geo.Vector.create([0, 0]), geo.Vector.create([10, 0]), geo.Vector.create([5, 15]), geo.Vector.create([0, 0]) ], this.centerPoint);
  this.shape.scale(1.5);

  // Engine fire shape when thrusting
  this.showEngineFire = false;
  this.engineFire = new geo.Polygon([ geo.Vector.create([1, -2]), geo.Vector.create([3, -4]), geo.Vector.create([5, -2]), geo.Vector.create([7, -4]), geo.Vector.create([9, -2]) ], this.centerPoint);
  this.engineFire.scale(1.5);

  // Current position of the ship
  this.pos = geo.Vector.create([Math.random() * area.width, Math.random() * area.height]);
  // Direction into which ship is heading
  this.dir = geo.Vector.create([0, 1]);
  // Ship speed vector
  this.speed = geo.Vector.create([0, 0]);
  // Center of the object
  this.center = this.pos.add(this.shape.center);
}


Ship.prototype = {
    /**
     * Turn the ship to the left
     */
    turnLeft: function() {
      this.shape.rotate(-Angle);
      this.engineFire.rotate(-Angle);
      this.dir = this.dir.rotate(-Angle, NullVector);
    },

    /**
     * Turn the ship to the right
     */
    turnRight: function() {
      this.shape.rotate(Angle);
      this.engineFire.rotate(Angle);
      this.dir = this.dir.rotate(Angle, NullVector);
    },

    /**
     * Accelerate the ship in current heading direction
     */
    thrust: function() {
      // Scale the direction vector using the acceleration
      // and add to speed vector
      this.speed = this.speed.add(this.dir.multiply(Accel));
      this.showEngineFire = true;
      setTimeout(function() {
        this.showEngineFire = false;
      }.bind(this), 500);
    },

    /**
     * Fire laser
     */
    fire: function() {
      // TODO: center is obviously not correct
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
    },

    /**
     * Move the ship
     */
    step: function() {
      this.pos = this.pos.add(this.speed);
      this.center = this.pos.add(this.shape.center);
    },

    /**
     * Draw the ship
     */
    draw: function() {
      this.area.draw(this);
      if(this.showEngineFire) {
          this.area._drawPolygon(this.pos, this.engineFire, NullVector);
      }
    }

};

module.exports = Ship;
