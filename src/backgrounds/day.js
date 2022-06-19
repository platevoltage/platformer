export default function(ctx, xScrollOffset, windowWidth, windowHeight, i) {
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
        ctx.fillStyle = "#ffffffaa";
        ctx.fillRect(
            200+xScrollOffset + windowWidth*i,
            100,
            100,
            60
        );
        ctx.fillRect(
            230+xScrollOffset + windowWidth*i,
            130,
            100,
            60
        );
} 
