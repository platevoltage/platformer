import Sprite from "./Sprite";

export default class Floor extends Sprite {
    constructor(ctx ,x,y, id ,width) {
        super(ctx,x,y, id);
        this.height = 1; 
        this.width = width;
        this.color = "#ffff00";

        this.bgHeight = 20;
        this.bgColor = "#003333";
    }
    render() {      
        //overrides parent class to add background element
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(
            this.x + this.xScrollOffset,
            this.y,
            this.width,
            this.bgHeight
        );


        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            this.x + this.xScrollOffset,
            this.y-this.height,
            this.width,
            this.height
        );
        
        return 0;
    }




}