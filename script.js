//creating the canvas
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

//offset for the picture position
const offset = {
  x: -1000,
  y: -650,
};

//adding keys object --> default = false
const keys = {
  ArrowUp: { pressed: false },
  ArrowDown: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
};

//creating constants in image
const backgroundImg = document.createElement("img");
backgroundImg.src = "./assets/img/backgroundMap.png";
const hermione = document.createElement("img");
hermione.src = "./assets/img/singleHermione2.png";
const battleBackgroundImage = document.createElement("img");
battleBackgroundImage.src = "./assets/img/battleBackground.png";

//creating background moving class
const background = new backgroundClass({
  image: backgroundImg,
  position: { x: offset.x, y: offset.y },
});

//creating battleBackground class
const battleBackground = new backgroundClass({
  image: battleBackgroundImage,
  position: { x: 0, y: 0 },
});

//creating hermione class in canvas
const battlePatch = new Boundary({
  position: { x: 900, y: 300 },
});
const player = new Sprite({
  position: {
    x: canvas.width - 510,
    y: canvas.height - 250,
  },
  image: hermione,
});

////////colliding zone///////////
// creating collisions array
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}
const boundaries = [];
//looping over each row, i=index of the subarray
//forEach calls a function for each element in an array
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

///////BATTLE PATCH///////
// store it within an array
const battleZonesMap = [];
//70 is the width of the tiled map
for (let i = 0; i < battleZoneArr.length; i += 70) {
  //slice items out at 0, then 70 because want =0- 70, so that it'll slice out 0-70/70-140
  battleZonesMap.push(battleZoneArr.slice(i, 70 + i));
}
//only push in 1025 because that's what we want to draw
const battleZones = [];
//create a constructor class
//forEach row, i indicates the index of the array row we looking at
battleZonesMap.forEach((row, i) => {
  //for each row, j is the index of the subarray. We push in a new Boundary class only for the symbols with 1025. j is the index we're looping over
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(
        new Boundary({
          position: {
            //this gives the position based on the indices. 48 is the px width. y= i because it's going down. x is the x axis.
            //  [
            //0 [0, 1, 0]
            //1 [1,0, 1 ]
            //2 [0, 1, 0]
            //   ]
            x: j * 48 + offset.x,
            y: i * 48 + offset.y,
          },
        })
      );
  });
});
// console.log(battleZones);

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height
  );
}

const battleHermione = new Hero({
  name: "Hermione",
  health: 500,
});

const mandrake = new Hero({
  name: "Mandrake",
  health: 200,
});

/////////////BATTLE SCENE/////////////////////
const container = document.getElementById("container");
const x = document.querySelector("audio");
// creating movables array
const movables = [background, battlePatch, ...boundaries, ...battleZones];

const battle = {
  initiated: false,
};
let moving = true;
// player.moving = true;

//////////ANIMATE FUNCTION/////////////

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  battleZones.forEach((battleZone) => {
    battleZone.draw();
  });

  player.draw();
  x.play();

  //if battle initiated =false, stop the rest of this function
  // if ((battle.initiated = false)) return;
  //boundary

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
        console.log("colliding boundary");
        moving = false;
        //Breaks out of the loop and continues executing the code after the loop
        // break;
      }
    }
    if ((moving = true))
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
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
        // break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
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
        console.log("colliding boundary");
        moving = false;
        // break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
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
        // break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }
  if (
    keys.ArrowDown.pressed ||
    keys.ArrowLeft.pressed ||
    keys.ArrowRight.pressed ||
    keys.ArrowUp.pressed
  ) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone,
        }) &&
        Math.random() < 0.005
      ) {
        console.log("activate battle");
        // battle.initiated = true;
        animateBattle();
      }
    }
  }
}
animate();

function animateBattle() {
  const insertOverlay = document.querySelector("#insertOverlay");
  const overlay = document.createElement("div");
  overlay.setAttribute("id", "overlay");
  insertOverlay.append(overlay);

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

  const hermioneFullHealth = document.createElement("div");
  hermioneFullHealth.className = "hermioneFullHealth";
  hermioneFullHealth.innerText = battleHermione.health;
  overlay.appendChild(hermioneFullHealth);

  const mandrakeFullHealth = document.createElement("div");
  mandrakeFullHealth.className = "enemyFullHealth";
  mandrakeFullHealth.innerText = mandrake.health;
  overlay.appendChild(mandrakeFullHealth);

  const dialogueBox = document.createElement("div");
  dialogueBox.className = "dialogueBox";
  overlay.appendChild(dialogueBox);

  function dialogue() {
    mandrake.attack(battleHermione);
    dialogueBox.style.display = "block";
    dialogueBox.innerHTML = `${battleHermione.name} attacked ${
      mandrake.name
    }! ${mandrake.name}'s health is now at ${mandrake.announceHealth()}.
 <br>
    ${mandrake.name} attacked  ${battleHermione.name}!
  ${battleHermione.name}'s health is now ${battleHermione.announceHealth()}.`;
  }

  button1.addEventListener("click", (e) => {
    console.log(battleHermione.announceHealth());
    battleHermione.attack(mandrake);
    mandrake.announceHealth();
    hermioneFullHealth.innerText = battleHermione.announceHealth();

    if (mandrake.health <= 0) {
      alert("Mandrake died! Head back to capture more beasts.");
      const allOverlays = document.querySelectorAll("#overlay");
      for (let eachOverlay of allOverlays) {
        eachOverlay.remove();
      }
    } else {
      dialogue();

      mandrakeFullHealth.innerText = mandrake.announceHealth();
    }
    if (battleHermione.health <= 0) {
      alert("game over");
    }
  });

  button2.addEventListener("click", (e) => {
    console.log(battleHermione.announceHealth());
    battleHermione.attack(mandrake);
    hermioneFullHealth.innerText = battleHermione.announceHealth();
    if (mandrake.health <= 0) {
      alert("Mandrake died! Head back to capture more beasts.");
      const allOverlays = document.querySelectorAll("#overlay");
      for (let eachOverlay of allOverlays) {
        eachOverlay.remove();
      }
    } else {
      dialogue();
      mandrakeFullHealth.innerText = mandrake.announceHealth();
    }
    if (battleHermione.health <= 0) {
      alert("game over");
    }
  });
  button3.addEventListener("click", (e) => {
    console.log(battleHermione.announceHealth());
    battleHermione.attack(mandrake);
    hermioneFullHealth.innerText = battleHermione.announceHealth();
    if (mandrake.health <= 0) {
      alert("Mandrake died! Head back to capture more beasts.");
      // insertOverlay.style.opacity = 0;
      // document.querySelector("#dialogueBox").style.display = "none";
      const allOverlays = document.querySelectorAll("#overlay");
      for (let eachOverlay of allOverlays) {
        eachOverlay.remove();
      }
    } else {
      dialogue();
      mandrakeFullHealth.innerText = mandrake.announceHealth();
    }
    if (battleHermione.health <= 0) {
      alert("game over");
    }
  });
}

// }
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
