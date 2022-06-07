export default class Sprite {
    constructor(ctx,x,y) {
        this.ctx = ctx;
        this.height = 100;
        this.width = 50;
        this.x = x;
        this.y = y-this.height;
    }
    init() {
        console.log("new sprite");
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }
    update() {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        // console.log(this.x);
    }
    moveLeft() {
        this.x++;
        this.update();
    }
    moveRight() {
        this.x--;
        this.update();
    }

}