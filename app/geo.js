var geo = require('sylvester');

function Polygon(points, center) {
  this.points = points;
  this.center = center || geo.Vector.create([0, 0]);
}

Polygon.prototype = {
  scale: function(factor) {
    this.points = this.points.map(function(p) {
      return p.multiply(factor);
    });
    this.center = this.center.multiply(factor);
  },

  rotate: function(angle) {
    var center = this.center;

    this.points = this.points.map(function(p) {
      return p.rotate(angle, center);
    });
  }
};



//
// EXPORTS
//

module.exports.Polygon = Polygon;
module.exports.Vector = geo.Vector;
