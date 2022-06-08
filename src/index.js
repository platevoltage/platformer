import Sprite from "./sprites/Sprite";
import StationarySprite from "./sprites/StationarySprite";
import Player from "./sprites/Player";

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
    const player = new Player(gameArea.context, 20, height);
    const obstacle = new Sprite(gameArea.context, 500, height);
    const obstacle2 = new StationarySprite(gameArea.context, 300, height-100);

    document.addEventListener('keydown', typeLetter);
    document.addEventListener('keyup', releaseLetter);
    
    function updateGameArea() {
        gameArea.clear();
        player.update();
        obstacle.update();
        obstacle2.update();
        player.obstacles = [ obstacle, obstacle2 ];
    }
        
    function typeLetter(e) {
        if (e.key == "ArrowLeft" && !e.repeat) {
            player.movingLeft = true;
        }
        if (e.key == "ArrowRight" && !e.repeat) {
            player.movingRight = true;
        }
        if (e.key == "ArrowDown" && !e.repeat) {
            player.crouching = true;
        }
        if (e.key == " " && !e.repeat) {
            player.jumping = true
        }

    }

    function releaseLetter(e) {
        if (e.key == "ArrowLeft") {
            player.movingLeft = false;
        }
        if (e.key == "ArrowRight") {
            player.movingRight = false;
        }
        if (e.key == "ArrowDown" && !e.repeat) {
            player.crouching = false;
        }
        if (e.key == " " && !e.repeat) {
            player.jumping = false;

        }
    }
    player.init();
    obstacle.init();
    obstacle2.init();
    

    
    
}


window.onload = main;