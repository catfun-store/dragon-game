const startButton = document.getElementById("start-button");
const playButton = document.getElementById("play-button");
const dragon = document.getElementById("dragon");
const blackHole = document.getElementById("black-hole");
const gameScreen = document.getElementById("game-screen");

let mouseX = 0, mouseY = 0;
let dragonX = 100, dragonY = 100;
let lastMoveTime = Date.now();
let gameOver = false;
let clickTimer;

function randomPosition() {
  const w = window.innerWidth - 100;
  const h = window.innerHeight - 100;
  return [Math.random() * w, Math.random() * h];
}

function movePlayButton() {
  const [x, y] = randomPosition();
  playButton.style.left = `${x}px`;
  playButton.style.top = `${y}px`;

  clearTimeout(clickTimer);
  clickTimer = setTimeout(triggerGameOver, 2500); // 2.5 sec to click
}

function triggerGameOver() {
  if (gameOver) return;
  gameOver = true;

  blackHole.style.left = `${mouseX}px`;
  blackHole.style.top = `${mouseY}px`;
  blackHole.style.width = "300px";
  blackHole.style.height = "300px";
  blackHole.style.transition = "all 2s ease-out";

  dragon.style.transform = "scale(3)";
  playButton.style.display = "none";

  setTimeout(() => {
    alert("Game Over!");
    location.reload();
  }, 3000);
}

function animateDragon() {
  if (gameOver) return;

  const dx = mouseX - dragonX;
  const dy = mouseY - dragonY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 5) return;

  const speed = 0.05;
  dragonX += dx * speed;
  dragonY += dy * speed;

  dragon.style.left = `${dragonX}px`;
  dragon.style.top = `${dragonY}px`;

  const now = Date.now();
  if (now - lastMoveTime > 1500) { // idle > 1.5s
    triggerGameOver();
  }

  requestAnimationFrame(animateDragon);
}

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  lastMoveTime = Date.now();
});

startButton.addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  gameScreen.style.display = "block";
  movePlayButton();
  animateDragon();
});

playButton.addEventListener("click", () => {
  playButton.style.transform = "scale(1.2)";
  setTimeout(() => playButton.style.transform = "scale(1)", 100);
  movePlayButton();
});
