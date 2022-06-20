export default function(x, y, ctx, xScrollOffset, windowWidth, windowHeight, i) {
    const color = "#7f77fe";
        ctx.fillStyle = "#ffffffaa";
        ctx.fillRect(
            x+xScrollOffset + windowWidth*i,
            y,
            100,
            60
        );
        ctx.fillRect(
            x + 20 + xScrollOffset + windowWidth*i,
            y + 20,
            100,
            60
        );
} 