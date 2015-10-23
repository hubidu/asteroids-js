var geo = require('./geo');

function Bullet(start, direction) {
  this.shape = new geo.Circle(geo.Vector.create([0, 0]), 2);

  this.pos = start;
  this.dir = direction;
  this.speed = direction.multiply(5);
}

Bullet.prototype = {

  /**
   * Move the bulleet
   */
  step: function() {
    this.pos = this.pos.add(this.speed);
  }

};

module.exports = Bullet;
