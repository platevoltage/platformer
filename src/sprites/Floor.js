import Sprite from "./Sprite";

export default class Floor extends Sprite {
    constructor(ctx ,x,y, width) {
        super(ctx,x,y);
        this.height = 20
        this.width = width;
    }


}