var geo = require('./geo');

function Bullet(start, direction) {
  this.shape = new geo.Polygon([ geo.Vector.create([0, 0])], geo.Vector.create([0, 0]));

  this.pos = start;
  this.dir = direction;
  this.speed = direction.multiply(5);
}

Bullet.prototype = {

  move: function() {
    this.pos = this.pos.add(this.speed);
  }

};

module.exports = Bullet;
