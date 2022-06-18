
export default function one(canvasHeight) {

    return {
        background: 1,                          //background select
        player: [20, canvasHeight - 21],        //x, y
        floors: [
            [-100, 20, 6000]
        ],
        floorsWithBottom: [                     //x, y, width
            [-100, 40, 100],
            [1000, 40, 100]
        ],
        breakableBricks: [                      //x, y
            [100, 150],
            [150, 150],
            [200, 150],
            [250, 150],
            [250, 200],
            [300, 200],
            [350, 200],
        ],
        enemies : [                             //x, y
            [800, 430],
            [920, 430],
            [1030, 430]
        ]
    }     
}


