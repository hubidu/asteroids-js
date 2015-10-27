var geo = require('./geo');

var Angle = Math.PI / 64;
var MaxSize = 8;
var MinSize = 2;

function Asteroid(options) {
  options = options || {};

  this.area = options.area;

  // Choose a random size
  this.size = options.size || Math.random() * MaxSize + MinSize;
  var rnd = 2 - Math.random() * 4;
  this.centerPoint = geo.Vector.create([6 + rnd, 7 + rnd]);
  this.shape = new geo.Polygon([ geo.Vector.create([2, 4]), geo.Vector.create([2, 6]), geo.Vector.create([3, 8]), geo.Vector.create([4, 10]), geo.Vector.create([3, 11]), geo.Vector.create([6, 12]), geo.Vector.create([10, 10]), geo.Vector.create([11, 8]), geo.Vector.create([11, 6]), geo.Vector.create([9, 4]), geo.Vector.create([6, 1]), geo.Vector.create([3, 2]), geo.Vector.create([2, 4]) ], this.centerPoint);
  this.shape.scale(this.size);

  // Choose a random position
  this.pos = options.pos || geo.Vector.create([ Math.random() * 600, Math.random() * 480]);
  // Choose a random direction
  this.dir = geo.Vector.create([ Math.random(), Math.random() ]);
  // Choose a random speed
  this.speed = geo.randomVector().multiply(MaxSize / this.size);

  var rotSign = Math.random() > .5 ? 1 : -1;
  this.angle = rotSign * Angle * MaxSize / this.size;
}

Asteroid.prototype = {

  /**
   * When hit the asteroid will explode and split up
   * in smaller parts
   */
  explode: function() {
    if(this.size <= 2)
      return [];

    var size = this.size / 2;
    if(size <= 2) size = 2;

    var asteroids = [];
    for(var i = 0; i < this.size; i += size) {
        asteroids.push(new Asteroid({area: this.area, size: size, pos: this.pos}));
    }
    return asteroids;
  },

  /**
   * Move the asteroid
   */
  step: function() {
    // Rotate the asteroid slowly while moving
    this.shape.rotate(this.angle / this.size);
    // Move it
    this.pos = this.pos.add(this.speed);
  },

  draw: function() {
    this.area.ctx.strokeStyle = "rgb(104, 83, 240)";
    this.area.ctx.fillStyle = "rgba(104, 83, 240, 0.4)";
    this.area._drawPolygon(this.pos, this.shape, this.speed);
  }
};

module.exports = Asteroid;
