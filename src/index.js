import Sprite from "./sprites/Sprite";

const width = 1000;
const height = 480;





function main() {
    var gameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = 1000;
            this.canvas.height = 500;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    gameArea.start();
    const sprite = new Sprite(gameArea.context, 20, height);
    
    function updateGameArea() {
        gameArea.clear();
        sprite.update();
    }
    document.addEventListener('keydown', typeLetter);
        
    function typeLetter(e) {
        if (e.key == "ArrowLeft" && !e.repeat) {
            // console.log("ArrowLeft");
            sprite.movingLeft = true;
        }
        if (e.key == "ArrowRight" && !e.repeat) {
            // console.log("ArrowRight");
            sprite.movingRight = true;
        }
        if (e.key == " " && !e.repeat) {
            // console.log("Space");
            sprite.jumping = true
            // sprite.jump();
        }

    }

    document.addEventListener('keyup', releaseLetter);
    function releaseLetter(e) {
        if (e.key == "ArrowLeft") {
            // console.log("ArrowLeftxx");
            sprite.movingLeft = false;
        }
        if (e.key == "ArrowRight") {
            // console.log("ArrowRightxx");
            sprite.movingRight = false;
        }
        if (e.key == " " && !e.repeat) {
            // console.log("Space");
            sprite.jumping = false;

        }
    }
    sprite.init();

    
    
}


window.onload = main;