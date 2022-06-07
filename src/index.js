import Sprite from "./sprites/Sprite";

const width = 1000;
const height = 480;

function main() {
    gameArea.start();
    // const canvas = document.querySelector("#glCanvas");
    // const ctx = canvas.getContext("2d");
    const sprite = new Sprite(gameArea.context, 20, height);
      
    // Only continue if WebGL is available and working
    // if (ctx === null) {
    //     alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    //     return;
    // }

    sprite.init();

    // setInterval(() => {
    //     gameArea.clear();
    //     sprite.moveLeft();

    // },100);
    document.addEventListener('keydown', typeLetter);
    
    function typeLetter(e) {
        if (e.key == "ArrowLeft") {   
            gameArea.clear();
            sprite.moveLeft();          
        }
        if (e.key == "ArrowRight") {   
            gameArea.clear();
            sprite.moveRight();          
        }

    }
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}




window.onload = main;