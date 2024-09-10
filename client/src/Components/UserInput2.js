import React, { useState } from 'react';
import '../App.css';

const UserInput2 = ({ onNameSubmit2, userPoints, isPlayer1 }) => {
  const [userName2, setUserName2] = useState('');
  const [showInput, setShowInput] = useState(true);

  const handleInputChange = (event) => {
    setUserName2(event.target.value);
  };

  const handleSubmit = () => {
    if (userName2.trim() !== '') {
      onNameSubmit2(userName2, isPlayer1);
      setShowInput(false);
    } else {
      alert('Please enter your name.');
    }
  };

  return (
    <div className={isPlayer1 ? 'user-input' : 'user-input user-input2'}>
      {showInput ? (
        <div>
          <input
            type="text"
            value={userName2}
            onChange={handleInputChange}
            placeholder="Player 2"
            required
          />
          <button onClick={handleSubmit} className="submit">
            Submit
          </button>
        </div>
      ) : (
        <h1>{userName2} Score: {userPoints}</h1>
      )}
    </div>
  );
};

export default UserInput2;

