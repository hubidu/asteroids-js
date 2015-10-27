var Animation  = require("./animation.js");

var TWOPI = Math.PI * 2;

var AsteroidExplodes = new Animation(1500, function(ctx, pos, progress, eased) {

  var radius = 10 * eased;
  var opacity = 1 - eased;
  var lineWidth = 1;

  ctx.save();

  //ctx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
  //ctx.strokeStyle = "rgb(237, 222, 69)";
  ctx.fillStyle = "rgba(237, 222, 69)";
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.arc(pos[0], pos[1], radius, 0, TWOPI);
  ctx.fill();

  ctx.restore();
}, Animation.easeOutQuad);


module.exports.AsteroidExplodes = AsteroidExplodes;
