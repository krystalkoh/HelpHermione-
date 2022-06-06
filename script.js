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

//drawing background class in canvas
class backgroundClass {
  constructor({ image, position }) {
    this.image = image;
    this.position = position;
  }
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

const battleBackgroundImage = document.createElement("img");
battleBackgroundImage.src = "./assets/img/battleBackground.png";

// const attackDiv = document.getElementById("attack");
// const attackOn = document.createElement("div");
// attackOn.className = "attackBar";

const battleBackground = new backgroundClass({
  image: battleBackgroundImage,
  position: { x: 0, y: 0 },
});

//creating hermione class in canvas
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

//might not need mandrake image...refactor

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

// class HealthBar{
//     constructor(element, initialValue=100){
//         this.fillElem=document.querySelector(".hermioneFullHealth");
//         console.log(this.fellElem)
//         this.setValue(initialValue)
// setValue(newValue) {
// this.value = newValue;
// this.update();
//     }
//     update(){
//         const percentage = this.value -%
//         this.fillElem.style.width=percentage
//     }
// }   }
// }

//   attack({ attack, recipient }) {
//     const enemyHealthBar = document.querySelector(".enemyFullHealth");

//pizzaRat e.g lets fight
// console.log(battleHermione);
// //let's fight!
// function letsFight() {
//   while (battleHermione.health > 0 && mandrake.health > 0) {
//     battleHermione.fight(mandrake);

//     if (battleHermione.health <= 0) {
//       console.log(`Hermione has fainted!`);
//       break;
//     }

//     mandrake.fight(battleHermione);
//     if (mandrake.health <= 0) {
//       console.log(`Mandrake has fainted!`);
//       break;
// }
//   }
// }

// wingardium.addEventListener("click", attack(mandrake));

const battleHermione = new Hero({
  name: "Hermione",
  health: 100,
});

const mandrake = new Enemy({
  name: "Mandrake",
  health: 100,
});

/////////////BATTLE SCENE/////////////////////
const container = document.getElementById("container");
// const attackBtn = document.createElement("div");
// attackBtn.innerText = "Hello";
// canvas.prepend(attackBtn);
const insertOverlay = document.getElementById("insertOverlay");
function animateBattle() {
  const overlay = document.createElement("div");
  overlay.setAttribute("id", "overlay");
  container.append(overlay);

  const mandrakeImg = document.createElement("img");
  mandrakeImg.src = "./assets/img/mandrake.png";
  mandrakeImg.className = "mandrake";
  overlay.appendChild(mandrakeImg);

  const battleHermioneImg = document.createElement("img");
  battleHermioneImg.src = "./assets/img/hermioneBattle.png";
  battleHermioneImg.className = "hermione";
  overlay.appendChild(battleHermioneImg);

  const divId = document.createElement("div");
  divId.setAttribute("id", "attackButtons");
  overlay.appendChild(divId);

  const button1 = document.createElement("button");
  button1.className = "attack1";
  button1.innerText = "Wingardium Leviosa";
  overlay.appendChild(button1);

  const button2 = document.createElement("button");
  button2.className = "attack2";
  button2.innerText = "Obliviate";
  overlay.appendChild(button2);

  const button3 = document.createElement("button");
  button3.className = "attack3";
  button3.innerText = "Petrificus Totalus";
  overlay.appendChild(button3);

  //   const attackBtn = (e) => {
  //     console.log(e.currentTarget);
  //     e.currentTarget.addEventListener("click", (e) => {
  //       e.currentTarget.innerText = "Attacked!";
  //       battleHermione.attack(mandrake);
  //     });
  //   };
  //   attackBtn();
}
//   const mandrake = new Enemy({
//     name: "Mandrake",
//     image: mandrakeImg,
//     //   position: { x: 650, y: 80 },
//     //
//     weapons: { cry: 40 },
//     health: 50,
//   });

//   window.requestAnimationFrame(animateBattle);
//   battleBackground.draw();
//   //   attackDiv.appendChild(attackOn);
//   mandrake.draw();
//   battleHermione.draw();

////// insert ...battleZones below////
//creating movables array

// const movables = [background, mandrake];

const battle = {
  initiated: false,
};

function animate() {
  //adding infinite loop so character can move
  const animationId = window.requestAnimationFrame(animate);
  background.draw();
  //   battleZones.forEach((battleZone) => {
  //     battleZone.draw();
  //   });
  player.draw();
  testBoundary.draw();

  //transition to battle scene
  if (battle.initiated) return;
  //activating battle

  if (
    player.position.x + player.width >= testBoundary.position.x &&
    player.position.x <= testBoundary.position.x + testBoundary.width &&
    player.position.y + player.height >= testBoundary.position.y &&
    player.position.y <= testBoundary.position.y + testBoundary.height
  ) {
    console.log("collide");
    battle.initiated = true;
    // transition to battle background
    //deactivate current animation loop
    window.cancelAnimationFrame(animationId);

    ///FOLLOWING IS TRANSITION TO BATTLE SCENE...HAFTA USE CSS..THINK AGAIN
    // function activateBattle() {
    //   const element = document.querySelector(".battleBackgroundOff");
    //   element.classList.toggle("battleBackgroundOn");
    // }
    // activateBattle();

    //activate a new animation loop
    animateBattle();

    // return true;
  }

  if (keys.ArrowUp.pressed) {
    (background.position.y += 3),
      //   (mandrake.position.y += 3),
      (testBoundary.position.y += 3);
  } else if (keys.ArrowDown.pressed) {
    (background.position.y -= 3),
      //   (mandrake.position.y -= 3),
      (testBoundary.position.y -= 3);
  } else if (keys.ArrowLeft.pressed) {
    (background.position.x += 3),
      //   (mandrake.position.x += 3),
      (testBoundary.position.x += 3);
  } else if (keys.ArrowRight.pressed) {
    (background.position.x -= 3),
      //   (mandrake.position.x -= 3),
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

//beast

//

//battle
