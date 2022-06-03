const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

//creating the canvas
canvas.width = 1024;
canvas.height = 576;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

//removing HTML img
const img = document.getElementById("background");
img.remove();

//drawing image in canvas
context.drawImage(img, -1100, -630);
