const boxes=document.querySelectorAll(".box")
const gameInfo=document.querySelector(".game-info")
const newGameBtn=document.querySelector(".btn")
const turn=new Audio("./assets/ting.mp3")
const ongameOver=new Audio("./assets/gameover.mp3")
const onWin=new Audio("./assets/music.mp3")

// console.log("Chalu hai");

let currentPlayer;
let gameGrid

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


// function to initialize game

function initGame(){
    onWin.pause()
    currentPlayer="X"
    gameGrid=["","","","","","","","",""]
    // UI pr empty bhi nhi karna padega
    boxes.forEach((box,index)=>{
        box.textContent="";
    boxes[index].style.pointerEvents="all"
    // initialize box with css
    box.classList=`box box${index+1}`
    })
    newGameBtn.classList.remove("active")
    gameInfo.textContent=`Current Player -  ${currentPlayer}`
    
}

initGame()

function swapTurn(){
    if(currentPlayer==="X"){
currentPlayer="O"
    }
    else{currentPlayer="X"}
    gameInfo.textContent=`Current Player - ${currentPlayer}`
}

function checkGameOver(){
    turn.play()
    let answer=""
    winningPositions.forEach((position)=>{
        // all 3 boxes should non-empty and exactly same in value
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
            && (gameGrid[position[0]]===gameGrid[position[1]] && (gameGrid[position[1]]===gameGrid[position[2]])))
        {
            // check if winner is X
            if(gameGrid[position[0]]==="X"){
                answer="X"
            }
            else{
                answer="O"
            }

            boxes.forEach((box)=>{
                box.style.pointerEvents="none"
            })

            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")

        }
    })


    // it means we have a winner
    if(answer!==""){
        onWin.play()
        gameInfo.textContent=`Winner Player -  ${answer}`
        // console.log(gameInfo);
        newGameBtn.classList.add("active")
        return
    }

// we know No Winner FOund lets check whether there is tie
let fillCount=0
gameGrid.forEach((box)=>{
if(box!==""){
    fillCount++
}})
if(fillCount===9){
    gameInfo.textContent="Game Tied !"
    newGameBtn.classList.add("active")
}
}
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].textContent=currentPlayer
        gameGrid[index]=currentPlayer
        boxes[index].style.pointerEvents="none"
        // swap turn
        swapTurn()
        // check koi jeeta ya nhu
        checkGameOver()
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index)
    })
})



newGameBtn.addEventListener("click",initGame)

