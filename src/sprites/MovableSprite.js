import Sprite from "./Sprite";

export default class MovableSprite extends Sprite {
    constructor(ctx ,x,y) {
        super(ctx, x, y);
        this.movingLeft = false;
        this.movingRight = false;
        this.jumping = false;
        this.crouching = false;
        this.xLeftVelocity = 0;
        this.xRightVelocity = 0;
        this.yUpVelocity = 0;
        this.yDownVelocity = 0;
        this.jumpTime = 0;
        this.obstacles = [];
    }
    update() {

        //jumping
        this.y-=this.yUpVelocity;
        if(this.yUpVelocity > 0) this.yUpVelocity--;
        if (this.jumping && this.yDownVelocity <= 0) {
            this.jump();
        }
        else {
            this.fall();
        }
        //moving left
        if (this.movingLeft && !this.crouching) {
            this.moveLeft();
            if (this.xLeftVelocity < 20) this.xLeftVelocity++;

        }
        else if (this.xLeftVelocity > 0) {
            this.moveLeft();
            this.xLeftVelocity--;
        }
        //moving right
        if (this.movingRight && !this.crouching) {
            this.moveRight();
            if (this.xRightVelocity < 20) this.xRightVelocity++;      
        }
        else if (this.xRightVelocity > 0) {
            this.moveRight();
            this.xRightVelocity--;
        }
        //crouching
        if (this.crouching) {
            this.height = 50;
        }
        else {
            this.height = 100;
        }        
        //render
        this.render();
        
    }
    moveLeft() {
        for (let obstacle of this.obstacles) {
            if (
                obstacle.x+obstacle.width < this.x ||
                obstacle.y-obstacle.height > this.y ||
                this.x < obstacle.x
            ) {

                this.x-=this.xLeftVelocity;
            } else {
                this.x = obstacle.x+obstacle.width;
                this.xLeftVelocity = 0;
            }
        }
    }
    moveRight() {
        for (let obstacle of this.obstacles) {

            if (
                obstacle.x-obstacle.width > this.x+10 || 
                obstacle.y-obstacle.height > this.y ||
                this.x > obstacle.x
            ) {
                    
                this.x+=this.xRightVelocity;
            } else {
                this.x = obstacle.x-this.width-1;
                this.xRightVelocity = 0;
            }
                
        }
                
    }
    jump() {
        this.jumping = false;
        this.yUpVelocity = 30;
    }
    fall() {
        //create surfaces array with floor in index 0
        let surfaces = [this.y >= this.ctx.canvas.attributes.height.textContent-1];
        //check every obstacle for top surfaces and push into surfaces array
        for (let obstacle of this.obstacles) {
            surfaces.push( 
                this.y >= obstacle.y-obstacle.height-1 && 
                this.x+this.width >= obstacle.x && 
                this.x < obstacle.x+obstacle.width
            )
        }
        //if any element in surfaces is true
        if ( surfaces.some( (surface) => surface ) ) {
            if (this.yDownVelocity>1) this.y-=this.yDownVelocity;
            this.yDownVelocity = 0;
            
        } 
        else {
            if (this.yDownVelocity < 20) this.yDownVelocity+=1;
            this.y+=this.yDownVelocity;
        }
    }

}