var geo = require('./geo');
var animations = require("./asteroid_animation");

function Bullet(area, start, direction) {
  this.area = area;
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
    var hit = rect1.intersects(rect2);

    if(hit) animations.AsteroidExplodes.start(this.pos.e(1), this.pos.e(2));

    return hit;
  },

  /**
   * Move the bulleet
   */
  step: function() {
    this.pos = this.pos.add(this.speed);
  },

  draw: function() {
    this.area.ctx.strokeStyle = "rgb(237, 222, 69)";
    this.area.ctx.fillStyle = "rgba(237, 222, 69, 0.2)";
    this.area._drawCircle(this);

    animations.AsteroidExplodes.render(this.area.ctx);
  }

};

module.exports = Bullet;
