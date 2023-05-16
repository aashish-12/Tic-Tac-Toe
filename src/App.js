import "./App.css";
import React, { useEffect, useState } from "react";
import Box from "./components/Tile";

const winnerCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [winner, setWinner] = useState("");
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [grid, setGrid] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("X");
  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");

  function checkWinner(){
    for(let i=0;i<winnerCombination.length;i++){
      const [x,y,z] = winnerCombination[i];
      if(grid[x]&&grid[x] === grid[y]&& grid[x] === grid[z]){
        return grid[x];
      }
    }
  }
  function resetScore() {
    setScore({ X: 0, O: 0 });
    playAgain();
  }
  function playAgain() {
    setWinner("");
    setPlayer("X");
    setGrid(Array(9).fill(""));
    player1.textContent = "Player1";
    player1.style.color = "rgb(17, 219, 105)";
    player2.textContent = "Player2";
    player2.style.color = "rgb(17, 219, 105)";
  }
  const square = (e) => {
    //if box is not empty or winner
    if(grid[e.target.id]!=='' || winner !== '') return;
    //copy grid
     const newGrid = [...grid];
    //add to grid array
     newGrid[e.target.id] = player;
    //set grid
     setGrid(newGrid);
    //change player
     if(player === 'X'){
       setPlayer('O');
     }else{
      setPlayer('X');
     }

  };

  useEffect(() => {
    const getWinner = checkWinner();
    if(getWinner){
      if(getWinner === "X") setWinner('1');
      if(getWinner === "O") setWinner('2');
      // setWinner(getWinner);
      setScore(lastScore => {
        return {...lastScore, [getWinner]: lastScore[getWinner] + 1}
      });
      if(getWinner === "X"){
        player1.textContent = 'Winner!';
        player1.style.color = 'orangered';
      }
      if(getWinner === "O"){
        player2.textContent = 'Winner!';
        player2.style.color = 'orangered';
      }
    }
  },[grid]);
  return (
    <>
      <div className="container">
        <i className="fas fa-long-arrow-alt-left"></i>
        <i className="fas fa-volume-up"></i>
        <div className="result blink_me">
          {winner !== "" ? "Player" + winner + " won the game" : ""}
        </div>

        
        <div id="part2">
          <div  className="player">
            <p id="player1">Player 1</p>
            <div className="red grid-item">X</div>
          </div>
          <div id="score">
            <p>
              {score.X}
              <span>/</span>
              {score.O}
            </p>
            <p></p>
          </div>
          <div className="player">
            <p id="player2">Player 2</p>
            <div className="green grid-item">O</div>
          </div>
        </div>
        <div id="part3">
          <div className="grid-container">
            <Box id="0" label={grid[0]} clickEvent={square} />
            <Box id="1" label={grid[1]} clickEvent={square} />
            <Box id="2" label={grid[2]} clickEvent={square} />
          </div>
          <div className="grid-container">
            <Box id="3" label={grid[3]} clickEvent={square} />
            <Box id="4" label={grid[4]} clickEvent={square} />
            <Box id="5" label={grid[5]} clickEvent={square} />
          </div>
          <div className="grid-container">
            <Box id="6" label={grid[6]} clickEvent={square} />
            <Box id="7" label={grid[7]} clickEvent={square} />
            <Box id="8" label={grid[8]} clickEvent={square} />
          </div>
        </div>
        <div id="part4">
          <div className="button">
            <button className=" btn-reset" onClick={resetScore}>
              RESET SCORE
            </button>
            <button className=" btn-again" onClick={playAgain}>
              PLAY AGAIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
