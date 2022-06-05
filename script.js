const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

//creating the canvas
canvas.width = 1024;
canvas.height = 576;

const offset = {
  x: -1000,
  y: -650,
};

//drawing image in canvas

const backgroundImg = document.createElement("img");
backgroundImg.src = "./assets/img/backgroundMap.png";
const hermione = document.createElement("img");
hermione.src = "./assets/img/singleHermione2.png";

//drawing hermione sprite in canvas
class backgroundClass {
  constructor({ image, position }) {
    this.image = image;
    this.position = position;
  }
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

class Sprite {
  //   static width = 53;
  //   static height = 60;
  constructor({ image, position, width = 60, height = 70 }) {
    this.image = image;
    this.position = position;
    this.width = this.image.width;
    this.height = this.image.height;
  }
  draw() {
    context.drawImage(
      this.image,
      0,
      0,
      this.image.width,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width,
      this.image.height
    );
  }
}

class Enemy {
  constructor({ image, position, width, height }) {
    (this.image = image),
      (this.position = position),
      (this.width = width),
      (this.height = height);
  }
  draw() {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class Boundary {
  constructor({ position }) {
    (this.position = position), (this.width = 60), (this.height = 60);
  }

  draw() {
    context.fillStyle = "rgba(255,0,0,0.5)";
    context.fillRect(this.position.x, this.position.y, 48, 48);
  }
}

const testBoundary = new Boundary({
  position: { x: 205, y: 300 },
});

const mandrakeImg = document.createElement("img");
mandrakeImg.src = "./assets/img/mandrake.png";

const mandrake = new Enemy({
  image: mandrakeImg,
  position: { x: 200, y: 300 },
  width: 60,
  height: 60,
});

const player = new Sprite({
  position: {
    x: canvas.width - 300,
    y: canvas.height - 300,
  },
  image: hermione,
  //   width: this.width,
  //   height: this.height,
});
//creating background moving class
const background = new backgroundClass({
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
// const movables = [background, mandrake];

function activateBattle() {
  const element = document.querySelector(".battleBackgroundOff");
  element.classList.toggle("battleBackgroundOn");
}

const battle = {
  initiated: false,
};

//creating movables array
function animate() {
  //adding infinite loop so character can move
  window.requestAnimationFrame(animate);
  background.draw();
  //   battleZones.forEach((battleZone) => {
  //     battleZone.draw();
  //   });
  mandrake.draw();
  player.draw();
  testBoundary.draw();

  if (battle.initiated) return;
  //activating battle
  if (
    player.position.x + player.width >= testBoundary.position.x &&
    player.position.x <= testBoundary.position.x + testBoundary.width
  ) {
    console.log("collide");
    battle.initiated = true;
    activateBattle();
    // return true;
  }

  if (keys.ArrowUp.pressed) {
    (background.position.y += 3),
      (mandrake.position.y += 3),
      (testBoundary.position.y += 3);
  } else if (keys.ArrowDown.pressed) {
    (background.position.y -= 3),
      (mandrake.position.y -= 3),
      (testBoundary.position.y -= 3);
  } else if (keys.ArrowLeft.pressed) {
    (background.position.x += 3),
      (mandrake.position.x += 3),
      (testBoundary.position.x += 3);
  } else if (keys.ArrowRight.pressed) {
    (background.position.x -= 3),
      (mandrake.position.x -= 3),
      (testBoundary.position.x -= 3);
  }

  //   function collision(rect1, rect2) {
  //     const left1 = rect1.position.x;
  //     const top1 = rect1.position.y;
  //     const right1 = rect1.position.x + this.width;
  //     const bottom1 = rect1.position.y + this.height;

  //     // const myLeft = this.aLeft;
  //     // const myRight = this.aRight;
  //     // const myTop = this.aTop;
  //     // const myBottom = this.aBottom;

  //     const left2 = rect2.position.x;
  //     const top2 = rect2.position.y;
  //     const right2 = rect2.position.x + this.width;
  //     const bottom2 = rect2.position.y + this.height;
  //     // const otherLeft = this.bLeft;
  //     // const otherRight = this.bRight;
  //     // const otherBottom = this.bBottom;
  //     // const otherTop = this.bTop;

  //     if (bottom1 < top2) console.log("collide");
  //     if (top1 > bottom2) console.log("collide");
  //     if (right1 < left2) console.log("collide");
  //     if (left1 > right2) console.log("collide");
  //     // console.log("did not collide");
  //   }
  //   //   console.log(player.position.x);
  //   //   console.log(mandrake.position.x);
  //   collision(player, testBoundary);
  //   console.log(mandrake.position.x);
  //   console.log(player.position.x);
}
//mandrake position changes, but hermione position always stays at 444
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
