//////battlezone///////////
const battleZones = [];
battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});
console.log(battleZones);

const battleZonesMap = [];
for (let i = 0; i < battleZoneArr.length; i += 70) {
  battleZonesMap.push(battleZoneArr.slice(i, 70 + i));
}

// class Boundary {
//     static width = 48;
//     static height = 48;
//     constructor({ position }) {
//       (this.position = position), (this.width = 48), (this.height = 48);
//     }

//     draw() {
//       context.fillStyle = "rgba(255,0,0,0.5)";
//       context.fillRect(this.position.x, this.position.y, 48, 48);
//     }
//   }
