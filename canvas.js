var canvas = document.querySelector("canvas");

var push = window.innerHeight;
var rows = document.getElementsByClassName("row");

for (var i = 0; i < rows.length; i++) {
    rows[i].style.paddingTop = push + "px";
}

var height = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight);

canvas.width = window.innerWidth;
canvas.height = height;

var c = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = 'rgba(255, 255, 255, 0.75)';
    c.fill();
  }

  this.update = function() {
    if (this.x + this. radius > window.innerWidth || this.x - radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this. radius > height || this.y - radius < 0) {
      this.dy = -this.dy;
    }  
    this.x += this.dx;
    this.y += this.dy;

    if (mouse.x - this.x < 100 && mouse.x - this.x > -100
        && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
          let ddx = this.x - mouse.x;
          let ddy = this.y - mouse.y;
          let angle = Math.atan2(ddy, ddx);
          let dist = 75 / Math.sqrt(ddx * ddx + ddy * ddy);
          this.x += Math.cos(angle) * dist;
          this.y += Math.sin(angle) * dist;
    }
    this.draw();
  }
}

var circleArray = [];

for (var i = 0; i < 500; i++) {
  var radius = Math.random() * 3;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (height - radius * 2) + radius;
  var dx = (Math.random() - 0.5) * 0.5;
  var dy = (Math.random() - 0.5) * 0.5;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, height);

for (var i = 0; i < circleArray.length; i++) {
  circleArray[i].update();
}

}

animate();