import Background  from "./backgrounds";
import levels from "./levels";
import '../style/style.css';

import {
    Floor, 
    Player, 
    Enemy, 
    BreakableBrick,
    Brick, 
    FloorWithBottom,
    Bush
} from "./sprites/";



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
            this.garbageCollectionInterval = setInterval(clearUnusedSprites, 5000);
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    gameArea.start();
    document.addEventListener('keydown', typeLetter);
    document.addEventListener('keyup', releaseLetter);
  
    let background;
    let allObstacles = [];
    let allEnemies = [];
    let player;
    let jumpPressed = false;
    let jumpDuration = 0;
    let spriteId = 0;
    let xScrollOffset = 0;

    
    //level select
    const levelObjects = levels[1](canvasHeight);  
    createLevel();



    function updateGameArea() {

        gameArea.clear();

        background.update(xScrollOffset);
        for (let obstacle of allObstacles) {
            obstacle.update(xScrollOffset);
        }
        for (let enemy of allEnemies) {
            enemy.update(xScrollOffset);
            enemy.obstacles = [...allObstacles, ...allEnemies, player];
        }
        if (jumpPressed) {
            jumpDuration++;
        }
        if (jumpDuration == 5) {
            player.longJumping = true;
        }
        
        xScrollOffset = player.update(xScrollOffset);

        player.obstacles = [...allObstacles, ...allEnemies];
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

    function createLevel() {
        Object.keys(levelObjects).forEach(key => {
            switch (key) {
                case "background": {
                    createBackground(levelObjects.background);
                    break;
                }
                case "player": {
                    createPlayer(...levelObjects.player);
                    break;
                }
                case "floors": {
                    for (let params of levelObjects.floors) {
                        createFloor(...params);
                    }
                    break;
                }
                case "floorsWithBottom": {
                    for (let params of levelObjects.floorsWithBottom) {
                        createFloorWithBottom(...params);
                    }
                    break;
                }
                case "breakableBricks": {
                    for (let params of levelObjects.breakableBricks) {
                        createBreakableBrick(...params);
                    }
                    break;
                }
                case "bricks": {
                    for (let params of levelObjects.bricks) {
                        createBrick(...params);
                    }
                    break;
                }
                case "bushes": {
                    for (let params of levelObjects.bushes) {
                        createBush(...params);
                    }
                    break;
                }
                case "enemies": {
                    for (let params of levelObjects.enemies) {
                        createEnemy(...params);
                    }
                    break;
                }
            }
        });
    }

    

    function createBackground(bgSelect) {
        background = new Background(gameArea.context, bgSelect);
    } 
    
    function createFloor(x,y,width) {
        const floor = new Floor(gameArea.context, x, canvasHeight-y, spriteId, width);
        allObstacles.push(floor);
        spriteId++;
    }
    function createFloorWithBottom(x,y,width) {
        const floor = new FloorWithBottom(gameArea.context, x, canvasHeight-y,spriteId, width);
        allObstacles.push(floor);
        spriteId++;
    }
    function createPlayer(x, y) {
        player = new Player(gameArea.context, x, canvasHeight-y, spriteId);
        spriteId++;
    }
    function createEnemy(x,y) {
        const enemy = new Enemy(gameArea.context, x, canvasHeight-y, spriteId);
        allEnemies.push(enemy);
        spriteId++;
    }
    function createBreakableBrick(x, y) {
        const brick = new BreakableBrick(gameArea.context, x, canvasHeight-y, spriteId)
        allObstacles.push(brick);
        spriteId++;
    }
    function createBrick(x, y) {
        const brick = new Brick(gameArea.context, x, canvasHeight-y, spriteId)
        allObstacles.push(brick);
        spriteId++;
    }
    function createBush(x, y) {
        const bush = new Bush(gameArea.context, x, canvasHeight-y, spriteId)
        allObstacles.push(bush);
        spriteId++;
    }
    function clearUnusedSprites() {
        allEnemies = allEnemies.filter(enemy => !enemy.isDead);
        allObstacles = allObstacles.filter(obstacle => !obstacle.isDead);
    }
   
}



window.onload = main;