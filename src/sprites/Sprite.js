export default class Sprite {
    constructor(ctx, type ,x,y) {
        this.ctx = ctx;
        this.height = 100;
        this.width = 50;
        this.float = 0;
        this.x = x;
        this.y = y;
        this.movingLeft = false;
        this.movingRight = false;
        this.jumping = false;
        this.xLeftVelocity = 0;
        this.xRightVelocity = 0;
        this.yUpVelocity = 0;
        this.yDownVelocity = 0;
        this.jumpTime = 0;
        this.obstacles;
        this.color;
        console.log(this.ctx.canvas.attributes.height.textContent);
        switch (type) {
            case "player" : {
                this.color = "#ff0000";
                break;
            }
            case "wall" : {
                this.color = "#ffff00";
                break;
            }
        }
    }
    init() { 
        console.log("new sprite");
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        
        
    }
    update() {
        //falling
        // if (this.float > 0) {
        //     this.yDownVelocity++;
        //     this.float-=this.yDownVelocity;
        // } 
        // else {
        //     this.yDownVelocity = 0;
        //     this.float= 0;
        // }
        //jumping
        this.y-=this.yUpVelocity;
        console.log(this.yUpVelocity);
        if(this.yUpVelocity > 0) this.yUpVelocity--;
        if (this.jumping && this.yDownVelocity <= 0) {
            this.jump();
        }
        else {
            this.fall();
        }
        // if (this.yUpVelocity > 0) {
        //     this.float+=this.yUpVelocity*4;
        //     this.yUpVelocity--;
        // }
        // if (this.jumping) {
        //     if (this.jumpTime < 10) this.jumpTime++;
        //     this.jump();
        // }
        // else {
        //     this.jumpTime = 0;
        // }
        //moving left
        if (this.movingLeft) {
            this.moveLeft();
            if (this.xLeftVelocity < 20) this.xLeftVelocity++;

        }
        else if (this.xLeftVelocity > 0) {
            this.moveLeft();
            this.xLeftVelocity--;
        }
        //moving right
        if (this.movingRight) {
            this.moveRight();
            if (this.xRightVelocity < 20) this.xRightVelocity++;      
        }
        else if (this.xRightVelocity > 0) {
            this.moveRight();
            this.xRightVelocity--;
        }
        //falling
        // if (this.y < this.ctx.canvas.attributes.height.textContent) this.fall();
        
        //render
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            this.x,
            this.y-this.height-this.float,
            this.width,
            this.height
        );
        
    }
    moveLeft() {
        if (
            this.obstacles.x+this.obstacles.width < this.x ||
            this.obstacles.y-this.obstacles.height > this.y-this.float ||
            this.x < this.obstacles.x
        ) {

            this.x-=this.xLeftVelocity;
        } else {
            this.x = this.obstacles.x+this.obstacles.width+1;
            this.xLeftVelocity = 0;
        }
    }
    moveRight() {
        if (
            this.obstacles.x-this.obstacles.width > this.x+10 || 
            this.obstacles.y-this.obstacles.height > this.y-this.float ||
            this.x > this.obstacles.x
        ) {

            this.x+=this.xRightVelocity;
        } else {
            this.x = this.obstacles.x-this.width-1;
            this.xRightVelocity = 0;
        }

        
    }
    jump() {
        // this.y -= 300;
        this.jumping = false;
        this.yUpVelocity = 30;
        // if (this.float <= 0) {
        //     this.yDownVelocity = 0;
        //     this.yUpVelocity = 10;
        // }
    }
    fall() {

        if (
            this.y >= this.ctx.canvas.attributes.height.textContent-1 ||
            (
                this.y >= this.obstacles?.y-this.obstacles?.height-1 && 
                this.x+this.width >= this.obstacles?.x && 
                this.x < this.obstacles?.x+this.obstacles?.width
            )
        ) {
            // console.log(this.yDownVelocity);
            if (this.yDownVelocity>1) this.y-=this.yDownVelocity;
            this.yDownVelocity = 0;
            
        } 
        else {
            if (this.yDownVelocity < 20) this.yDownVelocity+=1;
            this.y+=this.yDownVelocity;
        }
        // if (
        //     // this.y < this.obstacles?.y-this.obstacles?.height &&
        //     this.x > this.obstacles?.x
        // ) {

        //     console.log(this.obstacles.x);
        //     this.y+=1;
        // }
        // else if (this.y < this.ctx.canvas.attributes.height.textContent) {

        //     // this.y+=1;
        // }
        // console.log("miss");
        // if (this.obstacles?.y < this.y) {
        //     console.log("hit");
        // }
    }
    

}