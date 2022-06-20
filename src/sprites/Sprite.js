export default class Sprite {
    constructor(ctx ,x,y, id) {
        this.ctx = ctx;
        this.windowWidth = ctx.canvas.attributes.width.textContent;
        this.windowHeight = ctx.canvas.attributes.height.textContent;
        this.xScrollOffset = 0;
        this.height = 100;
        this.width = 50;
        this.x = x + this.xScrollOffset;
        this.y = y;
        this.color = "#ff0000";
        this.id = id;
        this.isObstacle = true;
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