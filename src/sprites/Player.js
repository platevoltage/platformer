import MovableSprite from "./MovableSprite";

export default class Player extends MovableSprite {
    constructor(ctx,x,y, id) {
        super(ctx,x,y, id);
        this.color = "#ff00ff"; 
        this.isPlayer = true;
        this.offset = 0;
    }
    determineView() {
        // let offset = 0
        if (this.x > 400) this.offset = -(this.x - 400);
        return this.offset;
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
            
        return this.determineView();
            
    }


}