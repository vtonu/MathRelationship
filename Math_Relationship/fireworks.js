window.human = false;

var canvasEl = document.querySelector('.fireworks');
var ctx = canvasEl.getContext('2d');
var numberOfParticules = 30;
var pointerX = 0;
var pointerY = 0;
var tap =
  'ontouchstart' in window || navigator.msMaxTouchPoints
    ? 'touchstart'
    : 'mousedown';
var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

// Set the canvas size and scaling
function setCanvasSize() {
  canvasEl.width = window.innerWidth * 2;
  canvasEl.height = window.innerHeight * 2;
  canvasEl.style.width = window.innerWidth + 'px';
  canvasEl.style.height = window.innerHeight + 'px';
  canvasEl.getContext('2d').scale(2, 2);
}

// Update the pointer coordinates when interacting with the canvas
function updateCoords(e) {
  pointerX = e.clientX || e.touches[0].clientX;
  pointerY = e.clientY || e.touches[0].clientY;
}

// Calculate the end position for a particule
function setParticuleDirection(p) {
  var angle = (anime.random(0, 360) * Math.PI) / 180;
  var value = anime.random(50, 180);
  var radius = [-1, 1][anime.random(0, 1)] * value;
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle),
  };
}

// Create a particule object
function createParticule(x, y) {
  var p = {
    x: x,
    y: y,
    color: colors[anime.random(0, colors.length - 1)],
    radius: anime.random(16, 32),
    endPos: null,
    draw: function () {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = p.color;
      ctx.fill();
    },
  };
  p.endPos = setParticuleDirection(p);
  return p;
}

// Create a circle object
function createCircle(x, y) {
  var circle = {
    x: x,
    y: y,
    color: '#FFF',
    radius: 0.1,
    alpha: 0.5,
    lineWidth: 6,
    draw: function () {
      ctx.globalAlpha = circle.alpha;
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, true);
      ctx.lineWidth = circle.lineWidth;
      ctx.strokeStyle = circle.color;
      ctx.stroke();
      ctx.globalAlpha = 1;
    },
  };
  return circle;
}

// Render a set of particules
function renderParticule(anim) {
  for (var i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw();
  }
}

// Animate the particules and circle on user interaction
function animateParticules(x, y) {
  var circle = createCircle(x, y);
  var particules = [];
  for (var i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(x, y));
  }
  anime
    .timeline()
    .add({
      targets: particules,
      x: function (p) {
        return p.endPos.x;
      },
      y: function (p) {
        return p.endPos.y;
      },
      radius: 0.1,
      duration: anime.random(1200, 1800),
      easing: 'easeOutExpo',
      update: renderParticule,
    })
    .add({
      targets: circle,
      radius: anime.random(80, 160),
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: anime.random(600, 800),
      },
      duration: anime.random(1200, 1800),
      easing: 'easeOutExpo',
      update: renderParticule,
      offset: 0,
    });
}

var render = anime({
  duration: Infinity,
  update: function () {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  },
});

document.addEventListener(
  tap,
  function (e) {
    window.human = true;
    render.play();
    updateCoords(e);
    animateParticules(pointerX, pointerY);
  },
  false
);

var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;

function autoClick() {
  if (window.human) return;
  animateParticules(
    anime.random(centerX - 50, centerX + 50),
    anime.random(centerY - 50, centerY + 50)
  );
  anime({ duration: 200 }).finished.then(autoClick);
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize, false);
