import MovableSprite from "./MovableSprite";

export default class Enemy extends MovableSprite {
    constructor(ctx,x,y, id) {
        super(ctx,x,y, id);
        this.isEnemy = true;
        this.color = "#ff0044";
        this.movingRight = false;
        this.movingLeft = true;
        this.xLeftVelocity = 1;
        this.xRightVelocity = 1;
    }

    update(xScrollOffset) {
        this.xScrollOffset = xScrollOffset;

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
        //crouching
        if (this.crouching) {
            this.crouch();
        }
        else {
            this.standUp();
        }        
        //render
        this.render();
        
    }    
    standUp() {
        this.height = 50;
    }
}