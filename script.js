const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

//creating the canvas
canvas.width = 824;
canvas.height = 500;

// context.fillStyle = "white";
// context.fillRect(0, 0, canvas.width, canvas.height);

//making collisions array --> how to make collisions?!
// const collisionsMap = [];
// for (let i = 0; i < collisions.length; i += 70) {
//   collisionsMap.push(collisions.slice(i, 70 + i));
// }

// class Boundary {
//   static width = 48;
//   static height = 48;
//   constructor({ position, width, height }) {
//     (this.position = position), (this.width = 48), (this.height = 48);
//   }

//   draw() {
//     context.fillStyle = "red";
//     context.fillRect(
//       this.position.x,
//       this.position.y,
//       this.position.width,
//       this.position.height
//     );
//   }
// }

// const boundaries = [];

// collisionsMap.forEach((row, i) => {
//   row.forEach((symbol, j) => {
//     if (symbol === 1025)
//       boundaries.push(
//         new Boundary({
//           position: { x: j * Boundary.width, y: i * Boundary.height },
//         })
//       );
//   });
// });
//

//drawing image in canvas
const backgroundImg = document.getElementById("background");
// backgroundImg.src = "./assets/img/backgroundMap.png";
// context.drawImage(backgroundImg, -1100, -630);
const hermione = document.getElementById("hermioneDown");
const mandrake = document.getElementById("mandrake");
// const hermione = document.createElement("img");
// hermione.src = "./assets/img/hermioneDown2.png";

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
// const background = new SpriteMoving(backgroundImg, { x: -1100, y: -630 });
const background = new SpriteMoving(backgroundImg, { x: 0, y: 0 });
const hermioneMoving = new SpriteMoving(hermione, { x: 296, y: 180 });
const mandrakeAppears = new SpriteMoving(mandrake, { x: 80, y: 50 });
//adding keys object --> default = false
const keys = {
  ArrowUp: { pressed: false },
  ArrowDown: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};

// const mandrake = document.createElement("img");
// mandrake.src = "./assets/img/mandrake.png";

// const mandrakeClass = new SpriteMoving(mandrake, { x: 200, y: 80 });

// function beast() {
//   window.requestAnimationFrame(beast);
//   mandrake.draw();
// }

//add animation loop
function animate() {
  //adding infinite loop so character can move
  window.requestAnimationFrame(animate);
  background.draw();
  mandrakeAppears.draw();
  hermioneMoving.draw();
  //   context.drawImage(mandrake, 200, 60);
  //   context.drawImage(
  //     //drawing hermione
  //     hermione,
  //     //cropping hermione
  //     176,
  //     0,
  //     hermione.width / 4.6,
  //     hermione.height,
  //     //posiiton of hermione
  //     200,
  //     0,
  //     hermione.width / 4,
  //     hermione.height
  //   );
  //What happens when keys are pressed
  if (keys.ArrowUp.pressed) {
    hermioneMoving.position.y = hermioneMoving.position.y - 1;
    // mandrakeClass.position.y = background.position.y - 1;
  } else if (keys.ArrowDown.pressed) {
    hermioneMoving.position.y = hermioneMoving.position.y + 1;
    // mandrakeClass.position.y = background.position.y + 1;
  } else if (keys.ArrowLeft.pressed) {
    hermioneMoving.position.x = hermioneMoving.position.x - 1;
    // mandrakeClass.position.x = background.position.x - 1;
  } else if (keys.ArrowRight.pressed) {
    hermioneMoving.position.x = hermioneMoving.position.x + 1;
    // mandrakeClass.position.x = background.position.x + 1;
  }
}

animate();
// beast();
//when keys are key down
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
//when keys are keyup
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

//

//battle
