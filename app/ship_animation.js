var Animation  = require("./animation.js");

var TWOPI = Math.PI * 2;

var ShipExplodes = new Animation(1500, function(ctx, pos, progress, eased) {

  var radius = 60 * eased;
  var opacity = Math.max(.8, 1 - eased);
  var lineWidth = 10 * (1- eased);

  ctx.save();

  var gradient = ctx.createRadialGradient(pos[0], pos[1], 10, pos[0], pos[1], 60);
  gradient.addColorStop(0, "rgba(207, 34, 30, " + opacity + ")");
  gradient.addColorStop(1, "rgba(251, 204, 114, " + opacity + ")");

  //ctx.fillStyle = "rgba(251, 204, 114, " + opacity + ")";
  ctx.fillStyle = gradient;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.arc(pos[0], pos[1], radius, 0, TWOPI);
  ctx.fill();

  ctx.restore();
}, Animation.easeOutQuad);


module.exports.ShipExplodes = ShipExplodes;
