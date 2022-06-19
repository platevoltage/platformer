import Brick from "./Brick";

export default class BreakableBrick extends Brick {
    constructor(ctx ,x,y, id) {
        super(ctx,x,y, id);
        this.isBreakableBrick = true;
        this.color = "#863c04";
        this.isKillable = true;
        this.isDead = false;
    }





}