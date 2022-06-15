import MovableSprite from "./MovableSprite";

export default class Enemy extends MovableSprite {
    constructor(ctx,x,y,id) {
        super(ctx,x,y);
        this.id = id;
        this.color = "#ff0044";
        this.movingRight = false;
        this.movingLeft = true;
        this.xLeftVelocity = 1;
        this.xRightVelocity = 1;

    }
    standUp() {
        this.height = 50;
    }
    update(xScrollOffset) {
        this.xScrollOffset = xScrollOffset;

        //falling
        if ( !this.checkObstacleSurfaces() ) {
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

                this.x-=Math.floor(this.xLeftVelocity);
            } else {
                this.x = obstacle.x+obstacle.width+obstacle.xScrollOffset-this.xScrollOffset;
                // this.xLeftVelocity = 0;
                this.movingLeft = false;
                this.movingRight = true;
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
                    
                this.x+=Math.floor(this.xRightVelocity);
            } else {
                this.x = obstacle.x-this.width+obstacle.xScrollOffset-this.xScrollOffset-1;
                // this.xRightVelocity = 0;
                this.movingRight = false;
                this.movingLeft = true;
            }
                
        }
                
    }



}