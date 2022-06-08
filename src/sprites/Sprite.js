export default class Sprite {
    constructor(ctx, type ,x,y) {
        this.ctx = ctx;
        this.height = 100;
        this.width = 50;
        this.x = x;
        this.y = y;
        this.movingLeft = false;
        this.movingRight = false;
        this.jumping = false;
        this.xLeftVelocity = 0;
        this.xRightVelocity = 0;
        this.yUpVelocity = 0;
        this.yDownVelocity = 0;
        this.jumpTime = 0;
        this.obstacles = [];
        this.color;
        console.log(this.ctx.canvas.attributes.height.textContent);
        switch (type) {
            case "player" : {
                this.color = "#ff0000";
                break;
            }
            case "wall" : {
                this.color = "#ffff00";
                break;
            }
        }
    }
    init() { 
        console.log("new sprite");
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        
        
    }
    update() {

        //jumping
        this.y-=this.yUpVelocity;
        if(this.yUpVelocity > 0) this.yUpVelocity--;
        if (this.jumping && this.yDownVelocity <= 0) {
            this.jump();
        }
        else {
            this.fall();
        }
        //moving left
        if (this.movingLeft) {
            this.moveLeft();
            if (this.xLeftVelocity < 20) this.xLeftVelocity++;

        }
        else if (this.xLeftVelocity > 0) {
            this.moveLeft();
            this.xLeftVelocity--;
        }
        //moving right
        if (this.movingRight) {
            this.moveRight();
            if (this.xRightVelocity < 20) this.xRightVelocity++;      
        }
        else if (this.xRightVelocity > 0) {
            this.moveRight();
            this.xRightVelocity--;
        }        
        //render
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
            this.x,
            this.y-this.height,
            this.width,
            this.height
        );
        
    }
    moveLeft() {
        for (let i in this.obstacles) {
            if (
                this.obstacles[i].x+this.obstacles[i].width < this.x ||
                this.obstacles[i].y-this.obstacles[i].height > this.y ||
                this.x < this.obstacles[i].x
            ) {

                this.x-=this.xLeftVelocity;
            } else {
                this.x = this.obstacles[i].x+this.obstacles[i].width+1;
                this.xLeftVelocity = 0;
            }
        }
    }
    moveRight() {
        for (let i in this.obstacles) {

            if (
                this.obstacles[i].x-this.obstacles[i].width > this.x+10 || 
                this.obstacles[i].y-this.obstacles[i].height > this.y ||
                this.x > this.obstacles[i].x
            ) {
                    
                this.x+=this.xRightVelocity;
            } else {
                this.x = this.obstacles[i].x-this.width-1;
                this.xRightVelocity = 0;
            }
                
        }
                
    }
    jump() {
        this.jumping = false;
        this.yUpVelocity = 30;
    }
    fall() {

        if (
            this.y >= this.ctx.canvas.attributes.height.textContent-1 ||
            (
                this.y >= this.obstacles[0]?.y-this.obstacles[0]?.height-1 && 
                this.x+this.width >= this.obstacles[0]?.x && 
                this.x < this.obstacles[0]?.x+this.obstacles[0]?.width
            )
        ) {
            if (this.yDownVelocity>1) this.y-=this.yDownVelocity;
            this.yDownVelocity = 0;
            
        } 
        else {
            if (this.yDownVelocity < 20) this.yDownVelocity+=1;
            this.y+=this.yDownVelocity;
        }
    }
    

}