import MovableSprite from "./MovableSprite";

export default class Player extends MovableSprite {
    constructor(ctx,x,y, id) {
        super(ctx,x,y, id);
        this.color = "#ff00ff"; 
        this.isPlayer = true;

    }


}