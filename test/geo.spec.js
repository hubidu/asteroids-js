var assert = require('chai').assert;
var geo = require("../app/geo.js");

describe("Rect", function() {

  it('should determine intersection', function() {
    var rect1  = new geo.Rect(geo.Vector.create([10, 10]), geo.Vector.create([20, 20]));
    var rect2  = new geo.Rect(geo.Vector.create([5, 5]), geo.Vector.create([30, 30]));
    var rect3  = new geo.Rect(geo.Vector.create([20, 20]), geo.Vector.create([30, 30]));

    var rect4  = new geo.Rect(geo.Vector.create([21, 21]), geo.Vector.create([30, 30]));
    var rect5  = new geo.Rect(geo.Vector.create([10, 5]), geo.Vector.create([10, 9]));

    assert.isTrue(rect1.intersects(rect2));
    assert.isTrue(rect1.intersects(rect3));
    
    assert.isFalse(rect1.intersects(rect4));
    assert.isFalse(rect1.intersects(rect5));
  });

});
