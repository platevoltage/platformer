import Sprite from "./Sprite";

export default class BreakableBrick extends Sprite {
    constructor(ctx ,x,y, id) {
        super(ctx,x,y, id);
        this.isBreakableBrick = true;
        this.height = 50; 
        this.width = 50;
        this.color = "#880000";
        this.isKillable = true;
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




}