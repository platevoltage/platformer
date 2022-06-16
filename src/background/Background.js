export default class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.color = "#000033";
    }
    update(xScrollOffset) {
        this.xScrollOffset = xScrollOffset;
        this.render();
    }
    render() {      
        //render
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            0+this.xScrollOffset,
            0,
            1000,
            480
        );
        
    }
}