var geo = require('./geo');

var Angle = Math.PI / 64;

function Asteroid() {
  // Choose a random size
  this.size = Math.random() * 10 + 2;
  var center = geo.Vector.create([6, 7]);
  this.shape = new geo.Polygon([ geo.Vector.create([2, 4]), geo.Vector.create([2, 6]), geo.Vector.create([3, 8]), geo.Vector.create([4, 10]), geo.Vector.create([3, 11]), geo.Vector.create([6, 12]), geo.Vector.create([10, 10]), geo.Vector.create([11, 8]), geo.Vector.create([11, 6]), geo.Vector.create([9, 4]), geo.Vector.create([6, 1]), geo.Vector.create([3, 2]), geo.Vector.create([2, 4]) ], center);
  this.shape.scale(this.size);

  // Choose a random position
  this.pos = geo.Vector.create([ Math.random() * 600, Math.random() * 480]);
  // Choose a random direction
  this.dir = geo.Vector.create([ Math.random(), Math.random() ]);
  // Choose a random speed
  this.speed = geo.randomVector().multiply(10 / this.size);
}

Asteroid.prototype = {

  /**
   * Move the asteroid
   */
  step: function() {
    // Rotate the asteroid slowly while moving
    this.shape.rotate(Angle / this.size);
    // Move it
    this.pos = this.pos.add(this.speed);
  }
};

module.exports = Asteroid;
