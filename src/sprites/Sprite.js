export default class Sprite {
    constructor(ctx,x,y) {
        this.ctx = ctx;
        this.height = 100;
        this.width = 50;
        this.float = 0;
        this.x = x;
        this.y = y-this.height-this.float;
        this.movingLeft = false;
        this.movingRight = false;
        this.xVelocity = 0;
        this.yVelocity = 0;
    }
    init() { 
        console.log("new sprite");
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        
        
    }
    update() {
        if (this.float > 0) {
            this.yVelocity++;
            this.float-=this.yVelocity;
        } else {
            this.yVelocity = 0;
        }
        if(this.movingLeft) {
            this.moveLeft();
            this.xVelocity++;
        }
        else if(this.movingRight) {
            this.moveRight();
            this.xVelocity++;
         
        }
        else if (this.velocity > 1) {
            this.xVelocity--;
        }
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(
            this.x,
            this.y-this.float,
            this.width,
            this.height
        );
        
    }
    moveLeft() {
        console.log(this.xVelocity);
        this.x-=this.xVelocity;
    }
    moveRight() {
        this.x+=this.xVelocity;
    }
    jump() {
        this.float = 200;
        this.yVelocity = 0;
        console.log(this.float);

    }
    

}