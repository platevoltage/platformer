import Sprite from "./sprites/Sprite";

const width = 1000;
const height = 480;

function main() {
    const canvas = document.querySelector("#glCanvas");
    const ctx = canvas.getContext("2d");
    const sprite = new Sprite(20, 20);
      
    // Only continue if WebGL is available and working
    if (ctx === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    // ctx.fillStyle = "#FF0000";
    // ctx.fillRect(0,height-20,20,20);

    console.log(sprite.x);



}


window.onload = main;