export default function(ctx, xScrollOffset, windowWidth, windowHeight, i) {
    const color = "#88aadd";
    //sky
        ctx.fillStyle = color;
        ctx.fillRect(
            xScrollOffset + windowWidth*i,
            0,
            windowWidth + windowWidth*i,
            windowHeight
        );
    //clouds
        ctx.fillStyle = "#ffffff33";
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
