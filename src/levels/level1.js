
export default function(canvasHeight) {

    return {
        player: [20, 21],        //x, y
        background: 1,                          //background select
        bushes: [
            [120, 20],                          //x, y
        ],                                      
        floors: [                               //x, y
        ],
        floorsWithBottom: [                     //x, y, width
            [-100, 0, 6000],
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
            [750, 21],
            // [920, 430],
            // [1030, 430],
            // [300, 0],
            // [1500, 0]
            
        ]
    }     
}


