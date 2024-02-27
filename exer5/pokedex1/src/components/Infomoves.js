import React, { useState } from 'react';
import '/Users/nithyaab/Documents/GitHub/bootcamp-s24-nithyaa/exer5/pokedex1/src/App.js';

const Infomoves = ({ height, weight, stats, moves }) => {
  const [showStats, setShowStats] = useState(true);

  const toggleDisplay = () => {
    setShowStats((prevState) => !prevState);
  };

  return (
    <div className= "Infomoves">
      <div className='info-container'>
        {showStats ? (
          <ul>
            <li>height: {height}</li>
            <li>weight: {weight}</li>
            {stats.map((stat, index) => (
              <li key={index}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {moves.map((move, index) => (
              <li key={index}>{move.move.name}</li>
            ))}
          </ul>
        )}
      </div>
      
      <div className='spacer'></div>

      <div>
        <button id = "infoButton" onClick={toggleDisplay}>Info</button>
        <button id="movesButton" onClick={toggleDisplay}>Moves</button>
      </div>
      <div className='spacer'></div>
    </div>
  );
};

export default Infomoves;
