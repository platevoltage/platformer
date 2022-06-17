
import Background from "./background/Background";
import Floor from "./sprites/Floor";
import FloorWithBottom from "./sprites/FloorWithBottom";
import Player from "./sprites/Player";
import Enemy from "./sprites/Enemy";
import BreakableBrick from "./sprites/BreakableBrick";

const canvasWidth = 1000;
const canvasHeight = 480;



function main() {
    const gameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = canvasWidth;
            this.canvas.height = canvasHeight;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);
            this.garbageCollectionInterval = setInterval(clearUnusedEnemies, 5000);
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    gameArea.start();
    let background;
    const obstacles = [];
    let enemies = [];
    let player;
    let jumpPressed = false;
    let jumpDuration = 0;
    let spriteId = 0;
    let xScrollOffsetBackground = 0;
    let xScrollOffset = 0;

    createBackground();
    createPlayer();
    createBreakableBrick(100, 150);
    createBreakableBrick(150, 150);
    createBreakableBrick(200, 150);
    createBreakableBrick(250, 150);
    createBreakableBrick(250, 200);
    createBreakableBrick(300, 200);
    createBreakableBrick(350, 200);

    createFloor(-100, 20, 6000);
    createFloorWithBottom(-100, 40, 100);
    // createFloorWithBottom(200, 190, 100);
    createFloorWithBottom(1000, 40, 100);
    // createFloor(700, 223, 100);
    createEnemy(800, 430);
    createEnemy(920, 430);
    createEnemy(1030, 430);
    


    document.addEventListener('keydown', typeLetter);
    document.addEventListener('keyup', releaseLetter);
    function updateGameArea() {
        // xScrollOffset-=.5; 
        // xScrollOffsetBackground-=3;
        gameArea.clear();
        // if (player.x > 450) {
        //     xScrollOffset = -(player.x - 650); 
        // }
        background.update(xScrollOffset);
        for (let obstacle of obstacles) {
            obstacle.update(xScrollOffset);
        }
        for (let enemy of enemies) {
            enemy.update(xScrollOffset);
            enemy.obstacles = [...obstacles, ...enemies, player];
        }
        if (jumpPressed) {
            jumpDuration++;
        }
        if (jumpDuration == 5) {
            player.longJumping = true;
        }
        // player.update(xScrollOffset);
        
        xScrollOffset = player.update(xScrollOffset);

        player.obstacles = [...obstacles, ...enemies];
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
        if (e.key == "ArrowDown") {
            player.crouching = false;
        }
        if (e.key == " ") {
            jumpPressed = false;
            jumpDuration = 0;
            player.shortJumping = false;
            player.longJumping = false;

        }
    }



    

    function createBackground() {
        background = new Background(gameArea.context);
    } 
    
    function createFloor(x,y,width) {
        const floor = new Floor(gameArea.context, x, canvasHeight-y, spriteId, width);
        obstacles.push(floor);
        spriteId++;
    }
    function createFloorWithBottom(x,y,width) {
        const floor = new FloorWithBottom(gameArea.context, x, canvasHeight-y,spriteId, width);
        obstacles.push(floor);
        spriteId++;
    }
    function createPlayer() {
        player = new Player(gameArea.context, 20, canvasHeight-21, spriteId);
        spriteId++;
    }
    function createEnemy(x,y) {
        const enemy = new Enemy(gameArea.context, x, y, spriteId);
        enemies.push(enemy);
        spriteId++;
    }
    function createBreakableBrick(x, y) {
        const brick = new BreakableBrick(gameArea.context, x, canvasHeight-y, spriteId)
        obstacles.push(brick);
        spriteId++;
    }

    function clearUnusedEnemies() {
        enemies = enemies.filter(enemy => !enemy.isDead);
    }
}



window.onload = main;