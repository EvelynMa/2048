$(document).ready (function () {


var gameData = [];
initializeGameData();

$(document).keyup(function(e) {
    console.log("keyup:" + e.which + e.shiftKey);
    moveOneStep(e.which);
    e.preventDefault();
});

function initializeGameData () {
    gameData = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
    generateNewCell();
    generateNewCell();
    printGameData();
}

function generateNewCell () {
    var emptyCells = [];
    var i, j;
    for (i = 0; i < gameData.length; i++){
        for (j =  0; j < gameData[i].length; j++){
            if (gameData[i][j] === 0) {
                emptyCells.push({x: i, y: j});
            }
        }
    }

    if (emptyCells.length > 0) {
        var newCell = Math.floor(Math.random() * emptyCells.length);
        gameData[emptyCells[newCell]["x"]][emptyCells[newCell]["y"]] = (Math.random() > 0.2) ? 2 : 4;
    }

}

function printGameData() {
    console.log(gameData);
    $("#content-table").empty();
    var i, j, a=0, newLine = "";
    for (i = 0; i < gameData.length; i++) {
        newLine += "<ul class=\"row clear-fix\">";

        for (j = 0; j < gameData[i].length; j++) {
            if (gameData[i][j] === 0) {
                newLine += "<li class=\"cell\"></li>"
            } else {
                newLine += "<li class=\"cell\">" + gameData[i][j] + "</li>"
            }
        }

        newLine += "</ul>";
    }

    $("#content-table").append(newLine);
}

function moveOneStep (direction) {
    var i = 0, j = 0;

    switch(direction) {
        case 37: // left
            console.log("left");
            for (i = 0; i < gameData.length; i++) {
                for (j = 0; j < gameData[i].length; j++) {
                    swiftLeft(i, j);
                }
            };
            generateNewCell();
            break;

        case 38: // up
            console.log("up");
            for (i = 0; i<gameData.length; i++) {
                for (j = 0; j < gameData[i].length; j++){
                    swiftUp(i, j);
                }
            }
            generateNewCell();
            break;

        case 39: // right
            console.log("right")
            for (i = 0; i < gameData.length; i++) {
                for (j = gameData[i].length-1; j >= 0; j--){
                    swiftRight(i, j);
                }
            }
            generateNewCell();
            break;

        case 40: // down
            console.log("down");
            for (i= gameData.length - 1; i >= 0; i--) {
                for (j = 0; j < gameData[i].length; j++){
                    swiftDown(i, j);
                }
            }
            generateNewCell();
            break;

        default: return; // exit this handler for other keys
    }

    printGameData();
}

function swiftLeft (i, j) {
    if (j != 0) {
        if (gameData[i][j] != 0){
            if (gameData[i][j-1] === 0) {
                gameData[i][j-1] = gameData[i][j];
                gameData[i][j] = 0;
                swiftLeft(i, j-1);
            } else if (gameData[i][j-1] === gameData[i][j]) {
                gameData[i][j-1] += gameData[i][j];
                gameData[i][j] = 0;
            }
        }
    }
}

function swiftRight (i, j) {
    if (j != 3 ) {
        if (gameData[i][j] != 0) {
            if (gameData[i][j+1] === 0) {
                gameData[i][j+1] = gameData[i][j];
                gameData[i][j] = 0;
                swiftRight(i, j+1);
            } else if (gameData[i][j+1] === gameData[i][j]) {
                gameData[i][j+1] += gameData[i][j];
                gameData[i][j] = 0;
            }
        }
    }
}

function swiftDown (i, j) {
    if (i != 3) {
        if (gameData[i][j] != 0) {
            if (gameData[i+1][j] === 0) {
                gameData[i+1][j] = gameData[i][j];
                gameData[i][j] = 0;
                swiftDown(i+1, j);
            } else if (gameData[i+1][j] === gameData[i][j]) {
                gameData[i+1][j] += gameData[i][j];
                gameData[i][j] = 0;
            }
        }
    }
}

function swiftUp (i, j) {
    if (i > 0) {
        if (gameData[i][j] != 0) {
            if (gameData[i-1][j] === 0) {
                gameData[i-1][j] = gameData[i][j];
                gameData[i][j] = 0;
                swiftUp(i-1, j);
            } else if (gameData[i-1][j] === gameData[i][j]) {
                gameData[i-1][j] += gameData[i][j];
                gameData[i][j] = 0;
            }
        }
    }
}

})