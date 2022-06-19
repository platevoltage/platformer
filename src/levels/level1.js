
export default function(canvasHeight) {

    return {
        background: 1,                          //background select
        player: [20, canvasHeight - 21],        //x, y
        floors: [
            [-100, 20, 6000]
        ],
        floorsWithBottom: [                     //x, y, width
            [-100, 40, 100],
            // [1000, 40, 100]
        ],
        breakableBricks: [                      //x, y
            [500, 150],
            [700, 150],
            [750, 150],
            [800, 150],
            [850, 150],
            [900, 150],
            [800, 350],
        ],
        enemies : [                             //x, y
            [750, canvasHeight -21],
            // [920, 430],
            // [1030, 430],
            // [300, 0],
            // [1500, 0]
            
        ]
    }     
}


