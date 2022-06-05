const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

//creating the canvas
canvas.width = 1024;
canvas.height = 576;
////////colliding zone///////////
// creating collisions array
// const collisionsMap = [];
// for (let i = 0; i < collisions.length; i += 70) {
//   collisionsMap.push(collisions.slice(i, 70 + i));
// }
// console.log(collisionsMap);

/////////drawing boundaries/////////
// class Boundary {
//   static width = 48;
//   static height = 48;
//   constructor({ position }) {
//     (this.position = position), (this.width = 48), (this.height = 48);
//   }

//   draw() {
//     context.fillStyle = "rgba(255,0,0,0.5)";
//     context.fillRect(this.position.x, this.position.y, 48, 48);
//   }
// }

// const boundaries = [];
const offset = {
  x: -1000,
  y: -650,
};
////////colliding zone///////////
// //looping over each row, i=index of the subarray
// collisionsMap.forEach((row, i) => {
//   //within each row, j=index that is looping over each symbol [0,1,0]
//   row.forEach((symbol, j) => {
//     //so that only pushing in boundaries that i want 1025
//     if (symbol === 1025)
//       boundaries.push(
//         new Boundary({
//           position: {
//             x: j * Boundary.width + offset.x,
//             y: i * Boundary.height + offset.y,
//           },
//         })
//       );
//   });
// });

// console.log(boundaries);

// const battleZonesMap = [];
// for (let i = 0; i < battleZoneArr.length; i += 70) {
//   battleZonesMap.push(battleZoneArr.slice(i, 70 + i));
// }

////////battlezone///////////
// const battleZones = [];
// battleZonesMap.forEach((row, i) => {
//   row.forEach((symbol, j) => {
//     if (symbol === 1025)
//       battleZones.push(
//         new Boundary({
//           position: {
//             x: j * Boundary.width + offset.x,
//             y: i * Boundary.height + offset.y,
//           },
//         })
//       );
//   });
// });
// console.log(battleZones);
//drawing image in canvas
// const backgroundImg = document.querySelector(".background");
const backgroundImg = document.createElement("img");
backgroundImg.src = "./assets/img/backgroundMap.png";
// context.drawImage(backgroundImg, -1100, -630);
// const hermione = document.getElementById("hermioneDown");
const hermione = document.createElement("img");
hermione.src = "./assets/img/singleHermione.png";

//drawing hermione sprite in canvas
class SpriteMoving {
  constructor({ image, position }) {
    this.image = image;
    this.position = position;
  }
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

class Enemy {
  constructor({ image, position }) {
    (this.image = image), (this.position = position);
  }
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}
const mandrakeImg = document.createElement("img");
mandrakeImg.src = "./assets/img/mandrake.png";

const mandrake = new Enemy({
  image: mandrakeImg,
  position: { x: 400, y: 300 },
});

const player = new SpriteMoving({
  position: { x: 444, y: 250 },
  image: hermione,
});
//creating background moving class
const background = new SpriteMoving({
  image: backgroundImg,
  position: { x: offset.x, y: offset.y },
});
//adding keys object --> default = false
const keys = {
  ArrowUp: { pressed: false },
  ArrowDown: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};
////// insert ...battleZones below////
const movables = [background, mandrake];

//creating movables array
function animate() {
  //adding infinite loop so character can move
  window.requestAnimationFrame(animate);
  background.draw();
  //   battleZones.forEach((battleZone) => {
  //     battleZone.draw();
  //   });
  player.draw();
  mandrake.draw();

  if (keys.ArrowUp.pressed) {
    movables.forEach((movable) => {
      movable.position.y += 3;
    });
  } else if (keys.ArrowDown.pressed) {
    movables.forEach((movable) => {
      movable.position.y -= 3;
    });
  } else if (keys.ArrowLeft.pressed) {
    movables.forEach((movable) => {
      movable.position.x += 3;
    });
  } else if (keys.ArrowRight.pressed) {
    movables.forEach((movable) => {
      movable.position.x -= 3;
    });
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
// const testing = document.getElementById("mandrake");
// testing.addEventListener("click", function (e) {
//   console.log(e.target, "mandrake works");
// });
