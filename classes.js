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
class Boundary {
  constructor({ position }) {
    (this.position = position), (this.width = 48), (this.height = 48);
  }

  draw() {
    context.fillStyle = "rgba(255,0,0,0.5)";
    context.fillRect(this.position.x, this.position.y, 48, 48);
  }
}

class Sprite {
  //   static width = 53;
  //   static height = 60;
  constructor({ image, position, width = 70, height = 80 }) {
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
class Hero {
  constructor({
    name,
    health,
    spells = [{ wing: 30 }, { petrify: 40 }, { obliviate: 50 }],
  }) {
    (this.name = name), (this.health = health), (this.spells = spells);
  }

  attack(enemy) {
    const spellsArr = this.spells;
    const spellSelected =
      spellsArr[Math.floor(Math.random() * spellsArr.length)];
    const spellPoints = Object.values(spellSelected);
    console.log(spellPoints);
    let finalHealth = (enemy.health -= spellPoints);
    console.log(
      `${this.name} attacks! ${enemy.name} health is now at ${enemy.health}! Remaining health is ${finalHealth}`
    );
    finalHealth = this.health;
  }
  announceHealth() {
    return this.health;
  }
}
// class Enemy {
//   constructor({name, health, weapons = [{ pepperoniStars: 5}, {cheeseGrease: 10 }]), {
//     this.name = name;
//     this.health = health;
//     this.weapons = weapons;
//   }
//   announceHealth() {
//     return this.health;
//   }
//   fight(enemy) {
//     const weaponArr = Object.keys(this.weapons);
//     const weaponSelected =
//       weaponArr[Math.floor(Math.random() * weaponArr.length)];
//     const weaponPoints = this.weapons[weaponSelected];
//     const finalHealthPizzaRat = (enemy.health -= weaponPoints);
//     console.log(
//       `${this.name} fights  using ${weaponSelected}. ${enemy.name} health is now at ${enemy.health}! remaining health is ${finalHealthPizzaRat}`
//     );
//   }
// }
