export default class Sprite {
    constructor(ctx ,x,y) {
        this.ctx = ctx;
        this.xScrollOffset = 0;
        this.height = 100;
        this.width = 50;
        this.x = x + this.xScrollOffset;
        this.y = y;
        this.color = "#ff0000";
    }
    update(xScrollOffset) {
        this.xScrollOffset = xScrollOffset;
        this.render();
    }
    render() {      
        //render
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            this.x + this.xScrollOffset,
            this.y-this.height,
            this.width,
            this.height
        );
        
    }

    

}