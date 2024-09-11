// import React, { useState, useEffect } from "react";
// import "../App.css";
// import UserInput from "./UserInput";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import UserInput2 from "./UserInput2";

// export default function Main() {
//   const [userChoice, setUserChoice] = useState("rock");
//   const [computerChoice, setComputerChoice] = useState("rock");
//   const [userPoints, setUserPoints] = useState(0);
//   const [computerPoints, setComputerPoints] = useState(0);
//   const [turnResult, setTurnResult] = useState(null);
//   const [result, setResult] = useState("Lets see who wins");
//   const [gameOver, setGameOver] = useState(false);
//   const [userName, setUserName] = useState("Player");
//   const [userName2, setUserName2] = useState("Player");
//   const [round, setRound] = useState(0);
//   const [hasSubmittedName, setHasSubmittedName] = useState(false);
//   const [hasSubmittedName2, setHasSubmittedName2] = useState(false);

//   const choices = ["rock", "paper", "scissors"];

//   const handleOnClick = (choice) => {
//     if (!gameOver && hasSubmittedName && hasSubmittedName2) {
//       setUserChoice(choice);
//       generateComputerChoice();
//       setRound(round + 1);
//     }
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const generateComputerChoice = () => {
//     const randomChoice = choices[Math.floor(Math.random() * choices.length)];
//     setComputerChoice(randomChoice);
//   };

//   const handleNameSubmit = (newName) => {
//     setUserName(newName);
//     setHasSubmittedName(true);
//   };

//   const handleNameSubmit2 = (newName2) => {
//     setUserName2(newName2);
//     setHasSubmittedName2(true);
//   };

//   const reset = () => {
//     window.location.reload();
//   };

//   useEffect(() => {
//     const comboMoves = userChoice + computerChoice;

//     if (round <= 6) {
//       if (
//         comboMoves === "rockscissors" ||
//         comboMoves === "paperrock" ||
//         comboMoves === "scissorspaper"
//       ) {
//         const updatedUserPoints = userPoints + 1;
//         setUserPoints(updatedUserPoints);
//         setTurnResult(`${userName} got the point`);
//       }

//       if (
//         comboMoves === "paperscissors" ||
//         comboMoves === "scissorsrock" ||
//         comboMoves === "rockpaper"
//       ) {
//         const updatedComputerPoints = computerPoints + 1;
//         setComputerPoints(updatedComputerPoints);
//         setTurnResult(`${userName2} got the point`);
//       }

//       if (
//         comboMoves === "rockrock" ||
//         comboMoves === "paperpaper" ||
//         comboMoves === "scissorsscissors"
//       ) {
//         setTurnResult("tie");
//       }
//     }

//     axios.defaults.withCredentials = true;

//     if (round === 6) {
//       setGameOver(true);

//       if (userPoints > computerPoints) {
//         setResult(`${userName} wins`);
//         axios.post("https://deploy-mern-api-topaz.vercel.app/info", {
//           User1Name: userName,
//           User2Name: userName2,
//           User1Result: "Win",
//           User2Result: "Lose",
//         });
//       } else if (userPoints < computerPoints) {
//         setResult(`${userName2} wins`);
//         axios.post("https://deploy-mern-api-topaz.vercel.app/info", {
//           User1Name: userName,
//           User2Name: userName2,
//           User1Result: "Lose",
//           User2Result: "Win",
//         });
//       } else {
//         setResult("It's a tie");
//         axios.post("https://deploy-mern-api-topaz.vercel.app/info", {
//           User1Name: userName,
//           User2Name: userName2,
//           User1Result: "Tie",
//           User2Result: "Tie",
//         });
//       }
//     }

//   }, [userChoice, computerChoice, round]);

//   return (
//     <div className="App">
//       <h4 className="round-counter">Round: {round}</h4>
//       <h1 className="heading" style={{ marginTop: "20px" }}>
//         Rock Paper Scissors
//       </h1>

//       <div className="score">
//         <UserInput onNameSubmit={handleNameSubmit} userPoints={userPoints} />
//         <UserInput2
//           onNameSubmit2={handleNameSubmit2}
//           userPoints={computerPoints}
//         />
//       </div>

//       <div className="choices">
//         <div className="choice-user">
//           <img
//             className="user-hand"
//             src={`../image/${userChoice}.png`}
//             alt={userChoice}
//           />
//         </div>

//         <div className="choice-computer">
//           <img
//             className="computer-hand"
//             src={`../image/${computerChoice}.png`}
//             alt={computerChoice}
//           />
//         </div>
//       </div>

//       <div className="button-div">
//         {choices.map((choice, index) => (
//           <button
//             key={index}
//             onClick={() => handleOnClick(choice)}
//             disabled={
//               gameOver || round >= 6 || !hasSubmittedName || !hasSubmittedName2
//             }
//             className="button"
//             style={{ marginBottom: "20px" }}
//           >
//             {choice}
//           </button>
//         ))}
//       </div>

//       <div className="result">
//         <h1>Turn Result: {turnResult}</h1>
//         <h1>Final Result: {result}</h1>
//       </div>

//       <div className="button-div">
//         <Link to="/data">
//           <button className="button">Click here to see result</button>
//         </Link>
//       </div>

//       <div className="button-div">
//         <button className="button" onClick={() => reset()}>
//           Restart Game
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "../App.css";
import UserInput from "./UserInput";
import { Link } from "react-router-dom";
import axios from "axios";
import UserInput2 from "./UserInput2";

export default function Main() {
  const [userChoice, setUserChoice] = useState("rock");
  const [computerChoice, setComputerChoice] = useState("rock");
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [turnResult, setTurnResult] = useState(null);
  const [result, setResult] = useState("Let's see who wins");
  const [gameOver, setGameOver] = useState(false);
  const [userName, setUserName] = useState("Player");
  const [userName2, setUserName2] = useState("Player");
  const [round, setRound] = useState(0);
  const [hasSubmittedName, setHasSubmittedName] = useState(false);
  const [hasSubmittedName2, setHasSubmittedName2] = useState(false);

  const choices = ["rock", "paper", "scissors"];

  const handleOnClick = (choice) => {
    if (!gameOver && hasSubmittedName && hasSubmittedName2) {
      setUserChoice(choice);
      generateComputerChoice();
      setRound(round + 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  };

  const handleNameSubmit = (newName) => {
    setUserName(newName);
    setHasSubmittedName(true);
  };

  const handleNameSubmit2 = (newName2) => {
    setUserName2(newName2);
    setHasSubmittedName2(true);
  };

  const reset = () => {
    setUserChoice("rock");
    setComputerChoice("rock");
    setUserPoints(0);
    setComputerPoints(0);
    setTurnResult(null);
    setResult("Let's see who wins");
    setRound(0);
    setGameOver(false);
  };

  useEffect(() => {
    const comboMoves = userChoice + computerChoice;

    if (round < 6) {
      if (
        comboMoves === "rockscissors" ||
        comboMoves === "paperrock" ||
        comboMoves === "scissorspaper"
      ) {
        setUserPoints(userPoints + 1);
        setTurnResult(`${userName} got the point`);
      } else if (
        comboMoves === "paperscissors" ||
        comboMoves === "scissorsrock" ||
        comboMoves === "rockpaper"
      ) {
        setComputerPoints(computerPoints + 1);
        setTurnResult(`${userName2} got the point`);
      } else if (
        comboMoves === "rockrock" ||
        comboMoves === "paperpaper" ||
        comboMoves === "scissorsscissors"
      ) {
        setTurnResult("It's a tie");
      }
    }

    axios.defaults.withCredentials = true;

    if (round === 6) {
      setGameOver(true);

      const gameData = {
        User1Name: userName,
        User2Name: userName2,
      };

      if (userPoints > computerPoints) {
        setResult(`${userName} wins`);
        gameData.User1Result = "Win";
        gameData.User2Result = "Lose";
      } else if (userPoints < computerPoints) {
        setResult(`${userName2} wins`);
        gameData.User1Result = "Lose";
        gameData.User2Result = "Win";
      } else {
        setResult("It's a tie");
        gameData.User1Result = "Tie";
        gameData.User2Result = "Tie";
      }

      axios
        .post("https://deploy-mern-api-topaz.vercel.app/info", gameData)
        .then(() => console.log("Game result saved"))
        .catch((error) => console.error("Error saving game result", error));
    }
  }, [
    userChoice,
    computerChoice,
    round,
    userPoints,
    computerPoints,
    userName,
    userName2,
  ]);

  return (
    <div className="App">
      <h4 className="round-counter">Round: {round}</h4>
      <h1 className="heading" style={{ marginTop: "20px" }}>
        Rock Paper Scissors
      </h1>

      <div className="score">
        <UserInput onNameSubmit={handleNameSubmit} userPoints={userPoints} />
        <UserInput2
          onNameSubmit2={handleNameSubmit2}
          userPoints={computerPoints}
        />
      </div>

      <div className="choices">
        <div className="choice-user">
          <img
            className="user-hand"
            src={`../image/${userChoice}.png`}
            alt={userChoice}
          />
        </div>

        <div className="choice-computer">
          <img
            className="computer-hand"
            src={`../image/${computerChoice}.png`}
            alt={computerChoice}
          />
        </div>
      </div>

      <div className="button-div">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleOnClick(choice)}
            disabled={
              gameOver || round >= 6 || !hasSubmittedName || !hasSubmittedName2
            }
            className="button"
            style={{ marginBottom: "20px" }}
          >
            {choice}
          </button>
        ))}
      </div>

      <div className="result">
        <h1>Turn Result: {turnResult}</h1>
        <h1>Final Result: {result}</h1>
      </div>

      <div className="button-div">
        <Link to="/data">
          <button className="button">Click here to see result</button>
        </Link>
      </div>

      <div className="button-div">
        <button className="button" onClick={reset}>
          Restart Game
        </button>
      </div>
    </div>
  );
}
