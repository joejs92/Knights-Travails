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
vertices. It finds the length of the shortest path, but
doesn't show the path itself. Now, how do we show it?
Maybe, starting at the end, we can go back and find 
irst appearance of the finish index and for which index 
it appeared, then repeat until you get back to the 
starting index. With this line of thinking, I see two
ways of doing it. First, to the queue push an array, with
the first value being the adjacent value and the 
second value being the current index. Will have to 
change the logic of the function to refelct this. Then
from the end, take the end index and push the 
corresponding coordinates to the path array, find the
matching current index in the exitedValues, repeat until
back to the start. Second, use a hash map of sorts. It
will do the same thing, but quicker. Create an array of
length 63, each index of this array will correspond to
an adjacents, from below, and the value will be the 
current index. Process: Take ending index, convert to
coordinates, upload to path, lookup last index in 
adjacentsArray, take that value, convert to coordinates,
upload to path, repeat until the first value is reached
and pushed to path, reverse and return path. I'll go 
with option 2.
*/
function knightMoves(start,finish){
    let index = findIndex(start);
    const finishIndex = findIndex(finish);
    let adjacentsArray = new Array(64);
    let path = [];
    let exitedValues = [];
    let queue = [];
    let currentMove = 0;
    let currentMoveLength = 1;
    let nextMoveLength = 0;
    queue.push(index);
    adjacentsArray[index] = 0;
    while(queue.length != 0){
        index = queue[0];
        if(index == finishIndex){
            //let value = adjacentsArray[index];
            while(index != 0){
                let coordinates = coordinateArray[index];
                path.push(coordinates);
                index = adjacentsArray[index];
            }
            path.push(start);
            path.reverse();
            let pathString = '';
            for(let i = 0; i < path.length; i++){
                pathString +=JSON.stringify(path[i]);
            }
            const outputString = `You made it in ${currentMove} moves! Here is your path: ${pathString}`;
            return outputString;
        }
        adjacents = adjacencyList[index];
        for(let i = 0; i < adjacents.length; i++){
            if(!exitedValues.includes(adjacents[i]) && !queue.includes(adjacents[i])){
                nextMoveLength += 1;
                adjacentsArray[adjacents[i]] = index;
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
//You have the envelope with the board if you want to more
//thoroughly test it.
console.log(knightMoves([0,0],[4,3]));
//knightMoves([0,0],[1,1])