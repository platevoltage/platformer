import day from "./day";
import night from "./night";

export default class Background {
    constructor(ctx, bgSelect) {
        this.ctx = ctx;
        this.windowWidth = ctx.canvas.attributes.width.textContent;
        this.windowHeight = ctx.canvas.attributes.height.textContent;
        this.bgSelect = bgSelect;
        this.background = [
            night, //dummy
            day,
            night 
        ]
    }
    update(xScrollOffset) {
        //sets ratio of scrolling to sprite layer.
        this.xScrollOffset = (xScrollOffset*.5 % this.windowWidth);
        this.render();
    }
    render() {
        for (let i = 0; i < 2; i++) { 
            this.background[this.bgSelect](this.ctx, this.xScrollOffset, this.windowWidth, this.windowHeight, i);
        }
    }
}