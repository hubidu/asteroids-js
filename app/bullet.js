var geo = require('./geo');

function Bullet(start, direction) {
  this.shape = new geo.Circle(geo.Vector.create([0, 0]), 1);

  this.pos = start;
  this.dir = direction;
  this.speed = direction.multiply(5);
}

Bullet.prototype = {

  hits: function(obj) {
    // Make a quick check using the objects bounding rectangles
    var rect1 = this.shape.rect().translate(this.pos);
    var rect2 = obj.shape.rect().translate(obj.pos);
    return rect1.intersects(rect2);
  },

  /**
   * Move the bulleet
   */
  step: function() {
    this.pos = this.pos.add(this.speed);
  }

};

module.exports = Bullet;
