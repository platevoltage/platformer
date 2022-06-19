export default function(ctx, xScrollOffset, windowWidth, windowHeight, i) {
    const color = "#000033";
    //sky
        ctx.fillStyle = color;
        ctx.fillRect(
            xScrollOffset + windowWidth*i,
            0,
            windowWidth + windowWidth*i,
            windowHeight
        );
    //clouds
        ctx.fillStyle = "#333388dd";
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
