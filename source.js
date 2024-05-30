let coordinateArray = [];
//The above array acts like a look up for coordinates. The
// index, from findIndex, is the index for the corresponding
//coordinate.
for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
        coordinateArray.push([i,j]);
    }
}

function findIndex(array){
    index = (array[0]*8)+array[1];
    return index;
}

/*Now create a function to take coordinates and return all
coordinates for valid knight move. Convert to indices.
*/
let adjacencyList = [];

function findValidMoves(array){
    const calculations = [[+1,+2],[+2,+1],[+2,-1],[+1,-2],
    [-1,-2],[-2,-1],[-2,+1],[-1,+2]];
    let validMoves = [];
    let xCoordinate = 0;
    let yCoordinate = 0;
    for(let i = 0; i < calculations.length; i++){
        xCoordinate = array[0]+calculations[i][0];
        yCoordinate = array[1]+calculations[i][1];
        if(xCoordinate >=0 && xCoordinate <= 7 && yCoordinate >=0 && yCoordinate <= 7){
            const moveIndex = findIndex([xCoordinate,yCoordinate]);
            validMoves.push(moveIndex);
        }
    }
    adjacencyList.push(validMoves);
}

function adjacencyListLookup(coordinates){
    const index = findIndex(coordinates);
    const adjacentVertices = adjacencyList[index];
    return adjacentVertices;
}

//Makes adjacency list from coordinate list.
for(let i = 0; i < coordinateArray.length; i++){
    findValidMoves(coordinateArray[i]);
};
/*
Now to make the search for the shortest path between 
vertices. It finds a path, but not the shortest.
*/
function knightMoves(start,finish){
    let index = findIndex(start);
    const finishIndex = findIndex(finish);
    let path = [];
    let exitedValues = [];
    let queue = [];
    let currentMove = 0;
    let currentMoveLength = 1;
    let nextMoveLength = 0;
    queue.push(index);
    while(queue.length != 0){
        index = queue[0];
        if(index == finishIndex){
            return currentMove;
        }
        adjacents = adjacencyList[index];
        nextMoveLength = adjacents.length-1;
        for(let i = 0; i < adjacents.length; i++){
            console.log(adjacents[i]);
            //The logical operation below is blowing up
            //the whole thing. Works fine otherwise.
            if(!exitedValues.includes(adjacents[i]) && !queue.includes(adjacents[i])){
                queue.push(adjacents[i]);
            };    
        }
        currentMoveLength -= 1;
        exitedValues.push(index);
        queue.shift();
        if(currentMoveLength == 0){
            currentMove += 1;
            currentMoveLength = nextMoveLength;
            nextMoveLength = 0;
        }
    }
}

console.log(knightMoves([0,0],[3,3]));