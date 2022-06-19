import MovableSprite from "./MovableSprite";

export default class Enemy extends MovableSprite {
    constructor(ctx,x,y, id) {
        super(ctx,x,y, id);
        this.isActivated = false;
        this.isEnemy = true;
        this.color = "#ff0044";
        this.movingRight = false;
        this.movingLeft = true;
        this.xLeftVelocity = 1;
        this.xRightVelocity = 1;
        this.height = 46;
        this.width = 46;
    }

    update(xScrollOffset) {
        this.xScrollOffset = xScrollOffset;
        //activates enemy when it is 400 pixels past the window boundary
        if (-xScrollOffset > this.x-this.ctx.canvas.attributes.width.textContent-400) {
            this.isActivated = true;
        }
        if (this.isActivated) {
            if (this.isDead) {
                this.y+=10;
                this.color = "#555555";
                this.movingRight = false;
                this.movingLeft = false;
            }

            //falling
            else if ( !this.checkObstacleSurfaces() ) {
                this.standing = false;
                this.moveDown();
            }
            else if (this.yUpVelocity == 0) { 
                this.yDownVelocity = 0;
                this.standing = true;
            }
            
            //moving left
            if (this.movingLeft) {
                this.moveLeft();
            }
            //moving right
            if (this.movingRight) {
                this.moveRight();    
            }
        
            //render
            this.render();
        }
    }    
}