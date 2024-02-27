import React from 'react';
import '/Users/nithyaab/Documents/GitHub/bootcamp-s24-nithyaa/exer5/pokedex1/src/App.js';

const Pokevisual = ({ pokeJSON }) => {
  return (
    <div>
      <div className="image-container">
        <img className="img" src={pokeJSON.sprites.front_default} alt={pokeJSON.name} />
      </div>
      
      <div className="name-container">
        <p>{pokeJSON.name}</p>
      </div>
      
    </div>
  );
};

export default Pokevisual;
