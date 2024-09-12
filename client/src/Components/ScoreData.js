import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ScoreData.css";

const ScoreData = () => {
  const [scoreData, setScoreData] = useState([]);

  useEffect(() => {
    axios
      .get("https://deploy-mern-api-topaz.vercel.app/info")
      .then((response) => {
        setScoreData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Score Data</h2>
      <table>
        <thead>
          <tr>
            <th>Player1 Name</th>
            <th>Player2 Name</th>
            <th>Player1 Result</th>
            <th>Player2 Result</th>
          </tr>
        </thead>
        <tbody>
          {scoreData.map((data, index) => (
            <tr key={index}>
              <td>{data.User1Name}</td>
              <td>{data.User2Name}</td>
              <td>{data.User1Result}</td>
              <td>{data.User2Result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreData;
