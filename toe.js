let sound = document.getElementById("audio");
let soundevent = document.addEventListener("click" , play);
let button = document.getElementById("btn");

button.addEventListener("click", ()=>{

    if(button.value === "Music On"){
        button.value = "Music Off";
    }else{
        button.value= "Music On" ;
        sound.pause();
    }
})
function play() {
        
        if(button.value === "Music Off"){
        sound.play();
        }
        if( button.value === "Music On"){
              sound.pause();
        }


      }




let gameModule = (function() {
	
	const playAgain = document.querySelector(".play-again");
	let gameon = true;
    let currentPlayer = "X";
    let gameBoard = ["","","","","","","","",""]; 
    const winningMessage = () => `${currentPlayer} WINS!`;
    playAgain.style.fontSize = "40px";
    const tieMessage = "IT IS A TIE!!";
    const currentPlayerTurn = () => ` ${currentPlayer}'s turn`;
    playAgain.innerText = currentPlayerTurn();

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

    function after_click(e) {
    	let clickedblock = e.target;
    	let clickedblock_index = parseInt(clickedblock.getAttribute('data-key'));
        

        if (gameBoard[clickedblock_index] !== "" || !gameon) {
            return;
        }

        play_next(clickedblock, clickedblock_index);
        result();

    } 

    function play_next(clickedblock, clickedblock_index) {
        gameBoard[clickedblock_index] = currentPlayer;
        clickedblock.innerText = currentPlayer;
        if (currentPlayer === "X") {
          clickedblock.style.color = '#0042FF';
        } else {
          clickedblock.style.color = '#ff008d';
        }

     }   

    function result() {
	let gameWon = false;
        for (let i = 0; i <= 7; i++) {
          let a = gameBoard[winningCombos[i][0]];
          let b = gameBoard[winningCombos[i][1]];
          let c = gameBoard[winningCombos[i][2]];
          
          if (!a || !b || !c) {
            continue;
          }
          if (a === b && b === c) {
            gameWon = true;
            break;
            }
        }
        if (gameWon) {
            playAgain.innerText = winningMessage();
            changeMessageColor('#0042FF')
            gameon = false;
            return;
        }
        let tieGame = !gameBoard.includes("");
        if (tieGame) {
            playAgain.innerText = tieMessage;
            changeMessageColor('ff0000')
            gameon = false;
            return;
        }
        changePlayer();
    }    


    function changeMessageColor(color) {
        playAgain.style.color = "#" + color;
    }

    function changePlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        playAgain.innerText = currentPlayerTurn();
        if (currentPlayer === "X") {
            changeMessageColor('0042FF')
        } else {
            changeMessageColor('ff008D')
        }
    }


    function restartGame() {
        gameBoard = ["","","","","","","","",""];
        document.querySelectorAll('.board-square').forEach(square => square.innerText = "");
        gameon = true;
        currentPlayer = "X";
        playAgain.innerText = currentPlayerTurn();
    }

     return { after_click, restartGame };

     })();





    document.querySelectorAll('.board-square').forEach(square => square.addEventListener('click', gameModule.after_click));
    document.querySelector('.restart-game').addEventListener('click', gameModule.restartGame);









