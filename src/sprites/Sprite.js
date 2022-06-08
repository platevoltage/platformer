export default class Sprite {
    constructor(ctx ,x,y) {
        this.ctx = ctx;
        this.height = 100;
        this.width = 50;
        this.x = x;
        this.y = y;
        this.color = "#ff0000";
        // switch (type) {
        //     case "player" : {
        //         this.color = "#ff0000";
        //         break;
        //     }
        //     case "wall" : {
        //         this.color = "#ffff00";
        //         break;
        //     }
        // }
    }
    init() { 
        console.log("new sprite");
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.width,this.height); 
    }
    update() {      
        //render
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            this.x,
            this.y-this.height,
            this.width,
            this.height
        );
        
    }

    

}