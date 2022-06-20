import Sprite from "./Sprite";

export default class Brick extends Sprite {
    constructor(ctx ,x,y, id) {
        super(ctx,x,y, id);
        this.height = 50; 
        this.width = 50;
        this.color = "#888800";
        this.isKillable = false;
        this.isDead = false;
    }
    update(xScrollOffset) {
        this.xScrollOffset = xScrollOffset;

        if (this.isDead) {
            this.y-=40;
            this.color = "#555555";
  
        }

        this.render();
    }
    render() {      
        //render
        this.ctx.fillStyle = "#111111";
        this.ctx.fillRect(
            this.x + this.xScrollOffset,
            this.y-this.height,
            this.width,
            this.height
        );
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            this.x + this.xScrollOffset+2,
            this.y-this.height+2,
            this.width-4,
            this.height-4
        );
        return 0;
        
    }



}