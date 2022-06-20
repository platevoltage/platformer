
export default function(canvasHeight) {

    return {
        player: [20, canvasHeight - 21],        //x, y
        background: 2,                          //background select
        bushes: [
            [750, canvasHeight -21],
        ],
        floors: [
        ],
        floorsWithBottom: [                     //x, y, width
            [-100, 20, 6000],
            [-100, 40, 100],
            // [1000, 40, 100]
        ],
        bricks: [                               //x, y
            [750, 150],
            [850, 150],
        ],
        breakableBricks: [                      //x, y
            [500, 150],
            [700, 150],         
            [800, 150],
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


