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

const battlePatch = new Boundary({
  position: { x: 750, y: 300 },
});

//might not need mandrake image...refactor

const player = new Sprite({
  position: {
    x: canvas.width - 510,
    y: canvas.height - 250,
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

////////colliding zone///////////
// creating collisions array
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

///////drawing boundaries/////////

const boundaries = [];

//////colliding zone///////////
//looping over each row, i=index of the subarray
collisionsMap.forEach((row, i) => {
  //within each row, j=index that is looping over each symbol [0,1,0]
  row.forEach((symbol, j) => {
    //so that only pushing in boundaries that i want 1025
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * 48 + offset.x,
            y: i * 48 + offset.y,
          },
        })
      );
  });
});

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height
  );
}

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
  health: 500,
});

const mandrake = new Hero({
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
  //   overlay.classList.add("blink");
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

  button1.addEventListener("click", (e) => {
    console.log(battleHermione.announceHealth());
    // if this is working correctly??

    //    while (battleHermione.health>0 && mandrake.health>0){
    battleHermione.attack(mandrake);
    if (mandrake.health < 0) {
      alert("mandrake died");
      overlay.remove();
    } else {
      mandrake.attack(battleHermione);
    }

    //   console.log(battleHermione.announceHealth());

    //   overlay.remove();
    //   animate();

    if (battleHermione.health < 0) {
      alert("game over");
    }
  });

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

const battle = {
  initiated: false,
};

// creating movables array

const movables = [background, battlePatch, ...boundaries];

function animate() {
  //adding infinite loop so character can move
  const animationId = window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();

    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: boundary,
      })
    ) {
      console.log("colliding boundary");
    }
  });
  player.draw();
  battlePatch.draw();

  //   console.log(boundaries);

  //transition to battle scene
  if (battle.initiated) return;
  //activating battle

  if (
    player.position.x + player.width >= battlePatch.position.x &&
    player.position.x <= battlePatch.position.x + battlePatch.width &&
    player.position.y + player.height >= battlePatch.position.y &&
    player.position.y <= battlePatch.position.y + battlePatch.height
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

  //////////forboundarycollision////////////
  let moving = true;
  if (keys.ArrowUp.pressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        // console.log("colliding boundary");
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
    //   (mandrake.position.y += 3),
    //   (battlePatch.position.y += 3);
  } else if (keys.ArrowDown.pressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        console.log("colliding boundary");
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
    //   (mandrake.position.y -= 3),
    //   (battlePatch.position.y -= 3);
  } else if (keys.ArrowLeft.pressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        // console.log("colliding boundary");
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
    //   (mandrake.position.x += 3),
    //   (battlePatch.position.x += 3);
  } else if (keys.ArrowRight.pressed) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log("colliding boundary");
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
    //   (mandrake.position.x -= 3),
    //   (battlePatch.position.x -= 3);
  }
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
//   collision(player, battlePatch);
//   console.log(mandrake.position.x);
//   console.log(player.position.x);

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
