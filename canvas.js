// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

//Size Setup
var height = document.documentElement.scrollHeight;
var width = window.innerWidth;

canvas.width = width;
canvas.height = height;

// CSS Styling
canvas.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';

//Variables
var mouse = {
  x: undefined,
  y: undefined
}

var colours = [
  '#FFFFFF',
  '#808080',
]

// Event Listeners
window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y + document.documentElement.scrollTop + document.documentElement.offsetTop;
})

window.addEventListener('resize',
  function(event) {
    canvas.width = window.innerWidth;
    width = window.innerWidth;
    
    canvas.height = window.innerHeight;
    height = window.innerHeight;

    c.clearRect(0, 0, width, height);
})

//Utility Functions
function randomColour(colors){
  return colours[Math.floor(Math.random() * colours.length)];
}

//Objects
function Circle(x, y, dx, dy, radius, colour) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.colour = colour;
  this.blur = 0;
  this.opacity = 0.6;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.globalAlpha = this.opacity;
    c.shadowColor = '#FFFFE6';
    c.shadowBlur = this.blur;
    c.fillStyle = this.colour;
    c.fill();
  }

  this.update = function() {
    if (this.x + this.radius > width || this.x - radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this. radius > height || this.y - radius < 0) {
      this.dy = -this.dy;
    }  
    this.x += this.dx;
    this.y += this.dy;

    //Mouse Collision Detection
    if (mouse.x - this.x < 100 && mouse.x - this.x > -100
        && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
          let ddx = this.x - mouse.x;
          let ddy = this.y - mouse.y;
          let angle = Math.atan2(ddy, ddx);
          let dist = 75 / Math.sqrt(ddx * ddx + ddy * ddy);
          this.x += Math.cos(angle) * dist;
          this.y += Math.sin(angle) * dist;
          this.blur = 10;
          this.opacity = 1;
          this.colour = '#FFFFE6';
    } else {
      this.blur = 0;
      this.opacity = 0.6;
      this.colour = colour;
    }
    this.draw();
  }
}

//Implementation
var circleArray = [];

for (var i = 0; i < 350; i++) {
  var radius = Math.random() * 3;
  var x = Math.random() * (width - radius * 2) + radius;
  var y = Math.random() * (height - radius * 2) + radius;
  var dx = (Math.random() - 0.5) * 0.5;
  var dy = (Math.random() - 0.5) * 0.5;
  var colour = randomColour(colours);
  circleArray.push(new Circle(x, y, dx, dy, radius, colour));
}

//Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, width, height);

for (var i = 0; i < circleArray.length; i++) {
  circleArray[i].update();
}

}

animate();