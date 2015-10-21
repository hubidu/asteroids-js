var geo = require('sylvester');

function Rect(x1, x2) {
  this.x1 = x1;
  this.x2 = x2;
}

Rect.prototype = {
  /**
   * Check if two rectangles overlap
   */
  intersects: function(another) {
      return (this.x1.e(1) <= another.x1.e(1) && another.x1.e(1) <= this.x2.e(1) &&
             this.x1.e(2) <= another.x1.e(2) && another.x1.e(2) <= this.x2.e(2)) ||
             (this.x1.e(1) <= another.x2.e(1) && another.x2.e(1) <= this.x2.e(1) &&
             this.x1.e(2) <= another.x2.e(2) && another.x2.e(2) <= this.x2.e(2));
  }
};

/**
 * A polygon consists of a collection of points(Vectors)
 * and a center point.
 *
 * @param {[type]} points [description]
 * @param {[type]} center [description]
 */
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

  /**
   * Rotate the polygon around the center point
   */
  rotate: function(angle) {
    var center = this.center;

    this.points = this.points.map(function(p) {
      return p.rotate(angle, center);
    });
  },

  /**
   * Check if the polygon overlaps with the given
   * other polygon.
   */
  intersects: function(another) {
    return this.rect().intersects(another.rect());
  },

  /**
   * Return the bounding rectangle of this polygon
   */
  rect: function() {
    var max = this.points.reduce(function(agg, point) {
      var x1 = agg.e(1);
      var x2 = agg.e(2);

      if(point.e(1) > x1) x1 = point.e(1);
      if(point.e(2) > x2) x2 = point.e(2);

      return geo.Vector.create([x1, x2]);
    }, geo.Vector.create([0, 0]));

    var min = this.points.reduce(function(agg, point) {
      var x1 = agg.e(1);
      var x2 = agg.e(2);

      if(point.e(1) < x1) x1 = point.e(1);
      if(point.e(2) < x2) x2 = point.e(2);

      return geo.Vector.create([x1, x2]);
    }, geo.Vector.create([0, 0]));

    return new Rect(min, max);
  }
};



//
// EXPORTS
//

module.exports.Rect = Rect;
module.exports.Polygon = Polygon;
module.exports.Vector = geo.Vector;
