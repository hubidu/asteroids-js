
function Animation(duration, drawFn, easeFn) {
  this.x = 0;
  this.y = 0;
  this.started = undefined;
  this.duration = duration;
  this.drawFn = drawFn;
  this.easeFn = easeFn;
  this.finishCallbackFn = undefined;
}

/**
 * t = time
 * b = begin
 * c = change
 * d = duration
 */
Animation.easeInQuad = function (progress) {
  return progress * progress;
};

Animation.easeOutQuad = function (progress) {
  return Math.sqrt(progress);
};

Animation.prototype = {

  /**
   * Start the animation
   */
  start: function(x, y, finishCallbackFn) {
    this.started = Date.now();
    this.x = x;
    this.y = y;
    this.finishCallbackFn = finishCallbackFn;
  },

  /**
   * Render the current state of the animation
   * on a canvas context
   */
  render: function(ctx) {
    var time = Date.now() - this.started;
    var progress = time / this.duration;

    this.drawFn(ctx, [this.x, this.y], progress, this.easeFn(progress));
  },

  /**
   * Determine if animation is finished
   */
  isFinished: function() {
    if(!this.started) return true;

    var progress = Date.now() - this.started;
    var res = progress > this.duration;
    if(res) {
      this.started = undefined;
      if(this.finishCallbackFn) this.finishCallbackFn();
    }

    return res;
  }

};


module.exports = Animation;
