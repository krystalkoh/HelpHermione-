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
