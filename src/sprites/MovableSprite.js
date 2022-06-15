import Sprite from "./Sprite";

export default class MovableSprite extends Sprite {
    constructor(ctx ,x,y) {
        super(ctx, x, y);
        this.movingLeft = false;
        this.movingRight = false;
        this.shortJumping = false;
        this.longJumping = false;
        this.standing = true;
        this.crouching = false;
        this.xLeftVelocity = 0;
        this.xRightVelocity = 0;
        this.yUpVelocity = 0;
        this.yDownVelocity = 0;
        this.obstacles = [];
    } 
    update() {

        this.ctx.fillText(this.yUpVelocity, 840, 100);
        this.ctx.fillText(this.standing, 860, 100);
        this.ctx.fillText(this.shortJumping, 930, 100);
        this.ctx.fillText(this.longJumping, 930, 130);
        //jumping
        this.y-=this.yUpVelocity;
        if (this.yUpVelocity > 0) this.yUpVelocity--;

        if (this.shortJumping && this.standing) {
            this.shortJump();   
        }
        else if (this.longJumping && this.shortJumping) {
            this.fullJump();
        }
        //falling
        else  {

            if ( !this.checkObstacleSurfaces() ) {
                this.standing = false;
                this.moveDown();
            }
            else { 
                this.yDownVelocity = 0;
                this.standing = true;
            }
        }
        //moving left
        if (this.movingLeft && (!this.crouching || this.yUpVelocity > 0)) {
            this.moveLeft();
            if (this.xLeftVelocity < 20) this.xLeftVelocity+=.3;

        }
        else if (this.xLeftVelocity > 0) {
            this.moveLeft();
            this.xLeftVelocity--;
        }
        else this.xLeftVelocity = 0;
        //moving right
        if (this.movingRight && (!this.crouching || this.yUpVelocity > 0)) {
            this.moveRight();
            if (this.xRightVelocity < 20) this.xRightVelocity+=.3;      
        }
        else if (this.xRightVelocity > 0) {
            this.moveRight();
            
            this.xRightVelocity--;
        }
        else this.xRightVelocity=0;
        //crouching
        if (this.crouching) {
            this.height = 50;
        }
        else {
            this.height = 100;
        }        
        //render
        this.displayStats();
        this.render();
        
    }
    moveLeft() {
        for (let obstacle of this.obstacles) {
            if (
                obstacle.x+obstacle.width < this.x ||
                obstacle.y-obstacle.height > this.y ||
                this.y-this.height > obstacle.y ||
                this.x < obstacle.x
            ) {

                this.x-=Math.floor(this.xLeftVelocity);
            } else {
                this.x = obstacle.x+obstacle.width;
                this.xLeftVelocity = 0;
            }
        }
    }
    moveRight() {

        for (let obstacle of this.obstacles) {

            if (
                obstacle.x-this.width-1 > this.x || 
                obstacle.y-obstacle.height > this.y ||
                this.y-this.height > obstacle.y ||
                this.x > obstacle.x
            ) {
                    
                this.x+=Math.floor(this.xRightVelocity);
            } else {
                this.x = obstacle.x-this.width-1;
                this.xRightVelocity = 0;
            }
                
        }
                
    }
    shortJump() {
        this.yUpVelocity += 20;
        this.standing = false;      
    }
    
    fullJump() {
        this.shortJumping = false;
        this.standing = false;
        this.yUpVelocity += 10;
        this.longJumping = false;
 
    }  
    checkObstacleSurfaces() {
            //create surfaces array with floor in index 0
            const surfaces = [this.y >= this.ctx.canvas.attributes.height.textContent-1];
            //check every obstacle for top surfaces and push into surfaces array

            for (let obstacle of this.obstacles) {
                let isObstacleUnderneath = 
                    this.y >= obstacle.y-obstacle.height-1 && 
                    this.x+this.width >= obstacle.x && 
                    this.x < obstacle.x+obstacle.width && 
                    this.y-this.height < obstacle.y;

                surfaces.push(isObstacleUnderneath);
            }
            //if play is hitting any surface, return true
            return surfaces.some( (surface) => surface );
    }
    moveDown() {
        for (let i = 0; i < this.yDownVelocity; i++) {

            this.y++;
            if (this.checkObstacleSurfaces()) break;
        }
        if (this.yDownVelocity < 20) this.yDownVelocity++;
    }



    displayStats() {
        this.ctx.fillStyle = this.color;
        this.ctx.font = "30px Arial";

        //render stats for player
        this.ctx.fillText(`(x) ${this.x} - ${this.x + this.width} (y) ${this.y} - ${this.y - this.height}`, 10,30);

        //render stats for obstacles
        let spacing = 0;
        for (let obstacle of this.obstacles) {
            this.ctx.fillStyle = obstacle.color;
            this.ctx.fillText(`(x) ${obstacle.x} - ${obstacle.x + obstacle.width} (y) ${obstacle.y} - ${obstacle.y - obstacle.height}`, 10,60+spacing);
            spacing+=30;
        }
    }
        
}