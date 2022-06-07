export default class Sprite {
    constructor(ctx,x,y) {
        this.ctx = ctx;
        this.height = 100;
        this.width = 50;
        this.x = x;
        this.y = y-this.height;
        this.movingLeft = false;
        this.movingRight = false;
        this.velocity = 0;
    }
    init() {
        console.log("new sprite");
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        
        
    }
    update() {
        if(this.movingLeft) {
            this.moveLeft();
            this.velocity++;
        
        }
        else if(this.movingRight) {
            this.moveRight();
            this.velocity++;
         
        }
        else if (this.velocity > 1) {
            this.velocity--;
        }
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        
    }
    moveLeft() {
        console.log(this.velocity);
        this.x-=this.velocity;
    }
    moveRight() {
        this.x+=this.velocity;
    }

}