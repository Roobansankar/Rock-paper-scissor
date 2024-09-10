import React, { useState } from "react";
import "../App.css";

const UserInput = ({ onNameSubmit, userPoints }) => {
  const [userName, setUserName] = useState("");
  const [showInput, setShowInput] = useState(true);

  const handleInputChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSubmit = () => {
    if (userName.trim() !== "") {
      onNameSubmit(userName, false);
      setShowInput(false);
    } else {
      alert("Please enter your name.");
    }
    console.log(userName);
  };

  return (
    <div>
      {showInput ? (
        <div>
          <input
            type="text"
            value={userName}
            onChange={handleInputChange}
            placeholder="Player 1 "
            required
          />

          <button onClick={handleSubmit} className="submit">
            Submit
          </button>
        </div>
      ) : (
        <h1>
          {userName} Score: {userPoints}
        </h1>
      )}
    </div>
  );
};

export default UserInput;
