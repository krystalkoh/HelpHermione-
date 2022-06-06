class Hero {
  constructor({
    name,
    health,
    spells = { wing: 30, petrify: 40, obliviate: 50 },
  }) {
    (this.name = name), (this.health = health), (this.spells = spells);
  }
  announceHealth() {
    return this.health;
  }
  attack(enemy) {
    const spellsArr = this.spells;
    const spellSelected =
      spellsArr[Math.floor(Math.random() * spellsArr.length)];
    const spellPoints = this.spells[spellSelected];
    const finalHealth = (enemy.health -= spellPoints);
    console.log(
      `${this.name} attacks! ${enemy.name} health is now at ${enemy.health}! Remaining health is ${finalHealth}`
    );
  }
}
class Enemy {
  constructor(name, health, weapons = { pepperoniStars: 5, cheeseGrease: 10 }) {
    this.name = name;
    this.health = health;
    this.weapons = weapons;
  }
  announceHealth() {
    return this.health;
  }
  fight(enemy) {
    console.log("i'm gonna flatten you like a slice of pepperoni!");
    const weaponArr = Object.keys(this.weapons);
    const weaponSelected =
      weaponArr[Math.floor(Math.random() * weaponArr.length)];
    const weaponPoints = this.weapons[weaponSelected];
    const finalHealthPizzaRat = (enemy.health -= weaponPoints);
    console.log(
      `${this.name} fights  using ${weaponSelected}. ${enemy.name} health is now at ${enemy.health}! remaining health is ${finalHealthPizzaRat}`
    );
  }
}
