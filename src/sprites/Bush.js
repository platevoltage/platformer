import Sprite from "./Sprite";

export default class Bush extends Sprite {
    constructor(ctx, x, y, id) {
        super(ctx, x, y, id);
        this.height = 80; 
        this.width = 200;
        this.color = "#159d06";
        this.isKillable = false;
        this.isDead = false;
        this.isObstacle = false;
    } 
    
    render() {      
        //render
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            this.x + this.xScrollOffset + this.width/4,
            this.y-this.height,
            this.width/2,
            this.height/2
        );
        this.ctx.fillRect(
            this.x + this.xScrollOffset,
            this.y-this.height/2,
            this.width,
            this.height/2
        );  
    }
}