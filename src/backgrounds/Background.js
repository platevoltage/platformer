export default class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.height = 480;
        this.width = 1000;
        this.color = "#000033";
    }
    update(xScrollOffset) {
        //sets ratio of scrolling to sprite layer.
        this.xScrollOffset = (xScrollOffset*.5 % this.width);
        this.render();
    }
    render() {
    for (let i = 0; i < 2; i++) { 
        //sky
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(
                this.xScrollOffset + this.width*i,
                0,
                this.width + this.width*i,
                this.height
            );
            this.ctx.fillStyle = this.color;
        //clouds
            this.ctx.fillStyle = "#333388dd";
            this.ctx.fillRect(
                200+this.xScrollOffset + this.width*i,
                100,
                100,
                60
            );
            this.ctx.fillRect(
                230+this.xScrollOffset + this.width*i,
                130,
                100,
                60
            );
        }
    }
}