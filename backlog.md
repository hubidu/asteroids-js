# Asteroids

Another crappy asteroids game in the browser

## Resources
- [1 hr] Egghead canvas videos: https://egghead.io/series/learn-html5-graphics-and-animation
- [0.5 hr] Egghead webpack videos: https://egghead.io/series/angular-and-webpack-for-modular-applications

## Project Backlog

- Setup an npm/webpack project
  * use webpack-dev-server and hot reload
- Display a space ship
  * the space ship can be a simple triangle
  * it should be clear in which direction the space ship is heading
- Allow rotating the space ship using the arrow keys
- Accelerate the space ship (thrust)/Move the ship around with arrow up.
  * the ship should always accelerate in the direction it is currently heading
  * the ship should deccelarate when thrust is released and
  * should only accelerate to a maximum speed
  * when the ship leaves the game area it should reappear at the opposite side of the game area
- Display asteroids on the game area
  * Asteroids should have different sizes (at least 3)
  * Asteroids should drift in a random direction and
  * with a constant speed depending on it's size (smaller is faster)
  * when an asteroid leaves the game area it will reappear at the opposite side of the game area
- When the space ship collides with an asteroid it should explode
- The space ship should be able to shoot asteroids (by pressing the space bar)
- Big asteroids should break up into smaller asteroids when shot, small asteroids should disappear
