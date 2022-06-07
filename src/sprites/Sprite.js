export default class Sprite {
    constructor(ctx,x,y) {
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
    }
    init() { 
        console.log("new sprite");
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        
        
    }
    update() {
        // console.log(this.float);
        if (this.float > 0) {
            this.yDownVelocity++;
            this.float-=this.yDownVelocity;
        } 
        else {
            this.yDownVelocity = 0;
            this.float= 0;
        }
        if (this.yUpVelocity > 0) {
            this.float+=this.yUpVelocity*4;
            this.yUpVelocity--;
            // console.log(this.yUpVelocity);
        }
        if (this.movingLeft) {
            this.moveLeft();
            if (this.xLeftVelocity < 20) this.xLeftVelocity++;

        }
        else if (this.xLeftVelocity > 0) {
            this.moveLeft();
            this.xLeftVelocity--;

        }
        if (this.movingRight) {
            this.moveRight();
            if (this.xRightVelocity < 20) this.xRightVelocity++;
  
         
        }
        else if (this.xRightVelocity > 0) {
            this.moveRight();
            this.xRightVelocity--;

        }
        if (this.jumping) {
            if (this.jumpTime < 10) this.jumpTime++;
            this.jump();
            // console.log(this.jumpTime);
        }
        else {
            this.jumpTime = 0;
        }
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(
            this.x,
            this.y-this.height-this.float,
            this.width,
            this.height
        );
        
    }
    moveLeft() {
        this.x-=this.xLeftVelocity;
    }
    moveRight() {
        console.log(this.obstacles.y, this.y-this.float);
        if (
            this.obstacles.x-this.obstacles.width > this.x || 
            this.obstacles.y-this.obstacles.height > this.y-this.float ||
            this.x > this.obstacles.x
        ) {

            this.x+=this.xRightVelocity;
        }

        
    }
    jump() {
        if (this.float <= 0) {
            // this.float = 200; 
            this.yDownVelocity = 0;
            this.yUpVelocity = 10;
        }
    }
    

}