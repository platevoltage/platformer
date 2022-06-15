
import Floor from "./sprites/Floor";
import FloorWithBottom from "./sprites/FloorWithBottom";
import Player from "./sprites/Player";

const canvasWidth = 1000;
const canvasHeight = 480;



function main() {
    var gameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = canvasWidth;
            this.canvas.height = canvasHeight;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    gameArea.start();
    const obstacles = [];
    let player;
    let jumpPressed = false;
    let jumpDuration = 0;

    createFloor(-100, 20, 6000);
    createPlayer();

    createFloor(200, 90, 100);
    createFloorWithBottom(500, 223, 100);
    createFloor(700, 223, 100);



    document.addEventListener('keydown', typeLetter);
    document.addEventListener('keyup', releaseLetter);
    function updateGameArea() {
        gameArea.clear();

        for (let obstacle of obstacles) {
            obstacle.update(100);
        }
        if (jumpPressed) {
            jumpDuration++;
        }
        if (jumpDuration == 5) {
            player.longJumping = true;
        }
        player.update();
        player.obstacles = obstacles;
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
            jumpPressed = true;
            player.shortJumping = true;
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
            jumpPressed = false;
            jumpDuration = 0;
            player.shortJumping = false;
            player.longJumping = false;

        }
    }



    

    
    
    function createFloor(x,y,width) {
        const floor = new Floor(gameArea.context, x, canvasHeight-y, width)
        obstacles.push(floor);
    }
    function createFloorWithBottom(x,y,width) {
        const floor = new FloorWithBottom(gameArea.context, x, canvasHeight-y, width)
        obstacles.push(floor);
    }
    function createPlayer() {
        player = new Player(gameArea.context, 20, canvasHeight-21);
    }
}

window.onload = main;