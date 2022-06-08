import Sprite from "./sprites/Sprite";

const width = 1000;
const height = 480;




function main() {
    var gameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = width;
            this.canvas.height = height;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    gameArea.start();
    const player = new Sprite(gameArea.context, "player" ,20, height);
    const obstacle = new Sprite(gameArea.context, "wall" , 500 , height);
    
    function updateGameArea() {
        gameArea.clear();
        player.update();
        obstacle.update();
        player.obstacles = obstacle;
    }
    document.addEventListener('keydown', typeLetter);
        
    function typeLetter(e) {
        if (e.key == "ArrowLeft" && !e.repeat) {
            // console.log("ArrowLeft");
            player.movingLeft = true;
        }
        if (e.key == "ArrowRight" && !e.repeat) {
            // console.log("ArrowRight");
            player.movingRight = true;
        }
        if (e.key == " " && !e.repeat) {
            // console.log("Space");
            player.jumping = true
            // sprite.jump();
        }

    }

    document.addEventListener('keyup', releaseLetter);
    function releaseLetter(e) {
        if (e.key == "ArrowLeft") {
            // console.log("ArrowLeftxx");
            player.movingLeft = false;
        }
        if (e.key == "ArrowRight") {
            // console.log("ArrowRightxx");
            player.movingRight = false;
        }
        if (e.key == " " && !e.repeat) {
            // console.log("Space");
            player.jumping = false;

        }
    }
    player.init();
    obstacle.init();
    

    
    
}


window.onload = main;