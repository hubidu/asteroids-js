var geo = require('./geo');

function Game(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
}

Game.prototype = {

  /**
   * Draw a shape at the specified position on the canvas
   *
   * @param  {[type]} pos   [description]
   * @param  {[type]} shape [description]
   */
  draw: function(obj) {
    var pos = obj.pos;
    var shape = obj.shape;
    var speed = obj.shape.center.add(obj.speed.multiply(3)) || obj.shape.center;

    var ctx = this.ctx;

    ctx.strokeStyle = "black";
    ctx.beginPath();

    shape.points.forEach(function(point) {
     var p = geo.Vector.create(pos);
     p = p.add(point);

     if (point === shape.points[0]) {
       ctx.moveTo(p.e(1), p.e(2));
     } else {
       ctx.lineTo(p.e(1), p.e(2));
     }
    } );
    ctx.stroke();

    // Draw the speed vector
    ctx.strokeStyle = "red";
    ctx.beginPath();
    var x1 = pos.add(obj.shape.center);
    var x2 = pos.add(speed);
    ctx.moveTo(x1.e(1), x1.e(2));
    ctx.lineTo(x2.e(1), x2.e(2));
    ctx.stroke();
  },

  /**
   * Clear the game canvas for redrawing
   */
  clear: function() {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

};

module.exports = Game;
