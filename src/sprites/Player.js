import MovableSprite from "./MovableSprite";

export default class Player extends MovableSprite {
    constructor(ctx,x,y) {
        super(ctx,x,y);
        this.color = "#ff00ff"; 
        this.isPlayer = true;

    }


}