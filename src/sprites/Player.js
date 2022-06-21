import MovableSprite from "./MovableSprite";

export default class Player extends MovableSprite {
    constructor(ctx, x, y, id) {
        super(ctx, x, y, id);
        this.color = "#a41f19"; 
        this.isPlayer = true;
        this.offset = 0;
        this.height = 100;
        this.width = 46;
    }
    determineView() {
        // let offset = 0
        if (this.x > 400) this.offset = 400 - this.x;
        return this.offset;
    }
    update(xScrollOffset) {
        this.xScrollOffset = xScrollOffset;

    //handle death
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
            if (this.xLeftVelocity < 20 && !this.isDead) this.xLeftVelocity+=1;

        }
        else if (this.xLeftVelocity > 0) {
            this.moveLeft();
            this.xLeftVelocity--;
        }
        else this.xLeftVelocity = 0;
    //moving right
        if (this.movingRight && (!this.crouching || this.yUpVelocity > 0)) {
            this.moveRight();
            if (this.xRightVelocity < 20 && !this.isDead) this.xRightVelocity+=1;      
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
    displayStats() {
        this.ctx.fillStyle = this.color;
        this.ctx.font = "16px Arial";

        //render stats for player
        this.ctx.fillText(`(x) ${this.x} - ${this.x + this.width} (y) ${this.y} - ${this.y - this.height}   ${this.xScrollOffset}`, 10,30);

        //render stats for obstacles
        let spacing = 0;
        for (let obstacle of this.obstacles) {
            this.ctx.fillStyle = obstacle.color;
            this.ctx.fillText(`(x) ${obstacle.x} - ${obstacle.x + obstacle.width} (y) ${obstacle.y} - ${obstacle.y - obstacle.height}   ${obstacle.xScrollOffset}`, 10,60+spacing);
            spacing+=16;
        }
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