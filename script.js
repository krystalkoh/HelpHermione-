const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

//creating the canvas
canvas.width = 1024;
canvas.height = 576;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

//drawing image in canvas
const backgroundImg = document.createElement("img");
backgroundImg.src = "./assets/img/backgroundMap.png";
// context.drawImage(backgroundImg, -1100, -630);
const hermione = document.createElement("img");
hermione.src = "./assets/img/hermioneDown2.png";

//drawing hermione sprite in canvas
class SpriteMoving {
  constructor(image, position) {
    this.image = image;
    this.position = position;
  }
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

//creating background moving class
const background = new SpriteMoving(backgroundImg, { x: -1100, y: -630 });

//adding keys object --> default = false
const keys = {
  ArrowUp: { pressed: false },
  ArrowDown: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};

//add animation loop
function animate() {
  //adding infinite loop so character can move
  window.requestAnimationFrame(animate);
  background.draw();
  context.drawImage(
    hermione,
    0,
    0,
    hermione.width / 4.6,
    hermione.height,
    415,
    280,
    hermione.width / 4,
    hermione.height
  );
  if (keys.ArrowUp.pressed) {
    background.position.y = background.position.y + 3;
  } else if (keys.ArrowDown.pressed) {
    background.position.y = background.position.y - 3;
  } else if (keys.ArrowLeft.pressed) {
    background.position.x = background.position.x + 3;
  } else if (keys.ArrowRight.pressed) {
    background.position.x = background.position.x - 3;
  }
}
animate();
//logging the arrow keys
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    keys.ArrowDown.pressed = true;
  } else if (e.key === "ArrowUp") {
    keys.ArrowUp.pressed = true;
  } else if (e.key === "ArrowRight") {
    keys.ArrowRight.pressed = true;
  } else if (e.key === "ArrowLeft") {
    keys.ArrowLeft.pressed = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowDown") {
    keys.ArrowDown.pressed = false;
  } else if (e.key === "ArrowUp") {
    keys.ArrowUp.pressed = false;
  } else if (e.key === "ArrowRight") {
    keys.ArrowRight.pressed = false;
  } else if (e.key === "ArrowLeft") {
    keys.ArrowLeft.pressed = false;
  }
});
