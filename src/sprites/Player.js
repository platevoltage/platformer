import MovableSprite from "./MovableSprite";

export default class Player extends MovableSprite {
    constructor(ctx,x,y, id) {
        super(ctx,x,y, id);
        this.color = "#ff00ff"; 
        this.isPlayer = true;
        this.offset = 0;
        this.height = 100;
        this.width = 46;
    }
    determineView() {
        // let offset = 0
        if (this.x > 400) this.offset = -(this.x - 400);
        return this.offset;
    }
    update(xScrollOffset) {
        this.xScrollOffset = xScrollOffset;
        // this.ctx.fillText(this.xRightVelocity, 840, 100);
        // this.ctx.fillText(this.standing, 860, 100);
        // this.ctx.fillText(this.shortJumping, 930, 100);
        // this.ctx.fillText(this.longJumping, 930, 130);
        // console.log(this.checkObstacleCeilings());
        if (this.isDead) {
            this.y+=10;
            this.color = "#555555";
            this.movingRight = false;
            this.movingLeft = false;
        }
    //jumping
        //check for obstacles above while adding to velocity
        for (var i = 0; i < this.yUpVelocity; i++) {
            this.y--;
            if (this.checkObstacleCeilings()) {
                this.yUpVelocity = 0;
                this.longJumping = false;
                this.shortJumping = false;      
            } 
        }
            
        if (this.yUpVelocity > 0) this.yUpVelocity--;

        if (this.shortJumping && this.standing && !this.isDead) {
            this.shortJump();   
        }
        else if (this.longJumping && this.shortJumping && this.yUpVelocity > 0) {
            this.fullJump();
        }
    //falling
        else  {

            if ( !this.checkObstacleSurfaces()) {
                this.standing = false;
                this.moveDown();
            }
            else if (this.yUpVelocity == 0) { 
                this.yDownVelocity = 0;
                this.standing = true;
            }
        }
    //moving left
        if (this.movingLeft && (!this.crouching || this.yUpVelocity > 0)) {
            this.moveLeft();
            if (this.xLeftVelocity < 20) this.xLeftVelocity+=1;

        }
        else if (this.xLeftVelocity > 0) {
            this.moveLeft();
            this.xLeftVelocity--;
        }
        else this.xLeftVelocity = 0;
    //moving right
        if (this.movingRight && (!this.crouching || this.yUpVelocity > 0)) {
            this.moveRight();
            if (this.xRightVelocity < 20) this.xRightVelocity+=1;      
        }
        else if (this.xRightVelocity > 0) {
            this.moveRight();
            
            this.xRightVelocity--;
        }
        else this.xRightVelocity=0;
    //crouching
        if (this.crouching) {
            this.crouch();
        }
        else {
            this.standUp();
        }        
    //render
    // this.displayStats();
    return this.render();      
    }
    crouch() {
        this.height = 50; 
    }
    standUp() {
        this.height = 100;
    }
    shortJump() {
        this.yUpVelocity = 20;
        this.standing = false;      
    }
    
    fullJump() {
        this.shortJumping = false;
        this.standing = false;
        this.yUpVelocity += 10;
        this.longJumping = false;
 
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