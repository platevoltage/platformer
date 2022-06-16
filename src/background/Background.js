export default class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.height = 480;
        this.width = 2000;
        this.color = "#000033";
    }
    update(xScrollOffset) {
        this.xScrollOffset = xScrollOffset % this.width/2;
        this.render();
    }
    render() {      
    //sky
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            0+this.xScrollOffset,
            0,
            this.width,
            this.height
        );
    //clouds
        this.ctx.fillStyle = "#333388";
        this.ctx.fillRect(
            200+this.xScrollOffset,
            100,
            100,
            60
        );
        this.ctx.fillRect(
            1200+this.xScrollOffset,
            100,
            100,
            60
        );
        
    }
}