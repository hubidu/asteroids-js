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
  draw: function(pos, shape) {
    var ctx = this.ctx;

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
