import MovableSprite from "./MovableSprite";

export default class Enemy extends MovableSprite {
    constructor(ctx,x,y, id) {
        super(ctx,x,y, id);
        this.isEnemy = true;
        this.color = "#ff0044";
        this.movingRight = false;
        this.movingLeft = true;
        this.xLeftVelocity = .2;
        this.xRightVelocity = .2;
        // this.isKillable = true;
    

    }

    update(xScrollOffset) {
        this.xScrollOffset = xScrollOffset;

        if (this.isDead) {
            this.y+=10;
            this.color = "#555555";
            this.movingRight = false;
            this.movingLeft = false;
        }

        //falling
        else if ( !this.checkObstacleSurfaces() ) {
            this.standing = false;
            this.moveDown();
        }
        else if (this.yUpVelocity == 0) { 
            this.yDownVelocity = 0;
            this.standing = true;
        }
        
        //moving left
        if (this.movingLeft) {
            this.moveLeft();
        }
        //moving right
        if (this.movingRight) {
            this.moveRight();    
        }
        //crouching
        if (this.crouching) {
            this.crouch();
        }
        else {
            this.standUp();
        }        
        //render
        this.render();
        
    }    
    standUp() {
        this.height = 50;
    }
    moveLeft() {
        for (let obstacle of this.obstacles) {
            if (
                obstacle.x+obstacle.width+obstacle.xScrollOffset < this.x+this.xScrollOffset ||
                obstacle.y-obstacle.height > this.y ||
                this.y-this.height > obstacle.y ||
                this.x+this.xScrollOffset < obstacle.x+obstacle.xScrollOffset ||
                obstacle.height <= 1 ||
                obstacle.id == this.id
            ) {

                this.x-=this.xLeftVelocity;
            } else {
                this.x = obstacle.x+obstacle.width+obstacle.xScrollOffset-this.xScrollOffset;
                // this.xLeftVelocity = 0;
                this.movingLeft = false;
                this.movingRight = true;
                if (obstacle.isPlayer) obstacle.isDead = true;
            }
        }
    }
    moveRight() {

        for (let obstacle of this.obstacles) {

            if (
                obstacle.x-this.width+obstacle.xScrollOffset-1 > this.x+this.xScrollOffset || 
                obstacle.y-obstacle.height > this.y ||
                this.y-this.height > obstacle.y ||
                this.x+this.xScrollOffset > obstacle.x+obstacle.xScrollOffset ||
                obstacle.height <= 1 ||
                obstacle.id == this.id
            ) {
                    
                this.x+=this.xRightVelocity;
            } else {
                this.x = obstacle.x-this.width+obstacle.xScrollOffset-this.xScrollOffset-1;
                // this.xRightVelocity = 0;
                this.movingRight = false;
                this.movingLeft = true;
                if (obstacle.isPlayer) obstacle.isDead = true;
            }
                
        }
                
    }



}