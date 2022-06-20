import cloud from "./objects/cloud";

export default function(ctx, xScrollOffset, windowWidth, windowHeight, i) {
    const params = [ctx, xScrollOffset, windowWidth, windowHeight, i];
    const color = "#7f77fe";
    //sky
        ctx.fillStyle = color;
        ctx.fillRect(
            xScrollOffset + windowWidth*i,
            0,
            windowWidth + windowWidth*i,
            windowHeight
        );
    //clouds
    cloud(200, 100, ...params);
} 
