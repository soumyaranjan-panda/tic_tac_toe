const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initialize(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box,index)=>{
        box.textContent = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
        
    })
    newGameBtn.classList.remove("active")
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    
}
initialize();


boxes.forEach((box,index)=>{
    box.addEventListener('click', ()=>{
        handleClick(index);
    });
});

function handleClick(index){
    if(gameGrid[index] === ""){
        
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurns();
        checkGameOver();
    }
}

function swapTurns(){
    currentPlayer = currentPlayer === "X"?"O":"X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let winner = "";
    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]] !== "" || gameGrid[position[2]]!=="")&& (gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            winner = gameGrid[position[0]] === "X"?"X":"O";
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(winner !== ""){
        newGameBtn.classList.add("active")
        winnerPlayer = currentPlayer === "X"?"O":"X";
        gameInfo.innerText = `Winner Player - ${winnerPlayer}`;
        return;

    }

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    if (fillCount === 9) {
        gameInfo.textContent = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}




newGameBtn.addEventListener('click', initialize);
