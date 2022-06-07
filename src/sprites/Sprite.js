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
        this.xLeftVelocity = 0;
        this.xRightVelocity = 0;
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
        } 
        else {
            this.yVelocity = 0;
        }
        if (this.movingLeft) {
            this.moveLeft();
            if (this.xLeftVelocity < 10) this.xLeftVelocity++;
        }
        else if (this.xLeftVelocity > 1) {
            this.xLeftVelocity--;
        }
        if (this.movingRight) {
            this.moveRight();
            if (this.xRightVelocity < 10) this.xRightVelocity++;
         
        }
        else if (this.xRightVelocity > 1) {
            this.xRightVelocity--;
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
        this.x-=this.xLeftVelocity;
    }
    moveRight() {
        this.x+=this.xRightVelocity;
    }
    jump() {
        if (this.float <= 0) {
            this.float = 200;
            this.yVelocity = 0;
        }
    }
    

}