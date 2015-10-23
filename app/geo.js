var geo = require('sylvester');

/**
 * Construct a rectangle from the lower left
 * point and the upper right point
 */
function Rect(p1, p2) {
  this.p1 = p1;
  this.p2 = p2;
}

Rect.prototype = {
  /**
   * Check if two rectangles overlap
   * (see http://stackoverflow.com/questions/13390333/two-rectangles-intersection)
   *
   *    p1    p2          o.p1    o.p2
   * ((X,Y),(A,B)) and ((X1,Y1),(A1,B1))
   */
  intersects: function(another) {
    if (this.p2.e(1) < another.p1.e(1) || another.p2.e(1) < this.p1.e(1) || this.p2.e(2) < another.p1.e(2) || another.p2.e(2) < this.p1.e(2))
      return false;
    else
      return true;
  },

  /**
   * Move the rectangle to the specified position
   */
  translate: function(pos) {
    return new Rect(this.p1.add(pos), this.p2.add(pos));
  },

  width: function() {
    return this.p2.e(1) - this.p1.e(1);
  },

  height: function() {
    return this.p2.e(2) - this.p1.e(2);
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

function Circle(center, radius) {
  this.center = center;
  this.radius = radius;
}

Circle.prototype = {

  rect: function() {
      var p1 = this.center;
      var p2 = this.center;
      return new Rect(p1, p2);
  }
};

//
// EXPORTS
//

/**
 * Create a random unit vector
 */
module.exports.randomVector = function() {
  var x = Math.random();
  var xsign = Math.random() > .5 ? 1: -1;
  var y = Math.random();
  var ysign = Math.random() > .5 ? 1: -1;

  return geo.Vector.create([xsign * x, ysign * y]);
};

module.exports.Circle = Circle;
module.exports.Rect = Rect;
module.exports.Polygon = Polygon;
module.exports.Vector = geo.Vector;
