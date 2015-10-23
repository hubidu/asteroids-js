# Asteroids

Another crappy asteroids game in the browser

## Skills to be trained
- [js] Javascript(< ES 5)
- [testing] Unit Tests
- [problemsolving]Refresher on highschool Math
- [frontend] HTML canvas/Animations
- [agile] Evolving a project in an agile way

## Resources
- eshint
- [1 hr] Egghead canvas videos: https://egghead.io/series/learn-html5-graphics-and-animation
- [0.5 hr] Egghead webpack videos: https://egghead.io/series/angular-and-webpack-for-modular-applications
- [? hr] https://developers.google.com/web/fundamentals/performance/performance-codelab/?hl=en

## Project Backlog

- Setup an npm/webpack project
  * initialize a git repository
  * setup a proper .gitignore file
  * configure eshint
  * use webpack-dev-server and hot reload
  * implement an npm watch script
- Display a space ship
  * the space ship can be a simple triangle
  * it should be clear in which direction the space ship is heading
- Allow rotating the space ship using the arrow keys
- Accelerate the space ship (thrust)/Move the ship around with arrow up.
  * the ship should always accelerate in the direction it is currently heading
  * the ship should deccelarate when thrust is released and
  * should only accelerate to a maximum speed
  * when the ship leaves the game area it should reappear on the opposite side of the game area
- Display asteroids on the game area
  * Asteroids should have different sizes (at least 3)
  * Asteroids should drift in a random direction and
  * with a constant speed depending on it's size (smaller is faster)
  * when an asteroid leaves the game area it will reappear at the opposite side of the game area
- When the space ship collides with an asteroid it should explode
  * and the game should start over
  * add debugging capabilities to the game so one can see if collision detection works properly
- The space ship should be able to fire shots
  * there should only be one short visible at the same time
  * if the shot leaves the game area it should disappear
- Big asteroids should break up into smaller asteroids when shot, small asteroids should disappear
- The game should have levels with increasing difficulty
  * a level is finished successfully if there are no more asteroids
  * there should be a short success message displayed to the user at the end of a level
  * the new level should have more or faster asteroids
- From time to time a flying saucer should show up and home into the space ship

## More Backlog ideas

- Physics: Asteroids should bounce-off each other
- Physics: Asteroids should attract the space ship
- Network/Multiplayer asteroids
- AI: Asteroids Bot which can play the game
