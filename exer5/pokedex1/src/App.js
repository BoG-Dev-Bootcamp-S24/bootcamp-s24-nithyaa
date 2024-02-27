// App.js
import React, { useEffect, useState } from "react";
import './App.css';
import Infomoves from './components/Infomoves';
import Pokevisual from './components/Pokevisual';
import Typesandbutt from './components/Typesandbutt';
import logo from './logo.svg';

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonJSON = async (dexNumber) => {
  try {
    const response = await fetch(`${URL}${dexNumber}/`);
    const pokemonJSON = await response.json();
    return pokemonJSON;
  } catch (e) {
    throw e;
  }
}

function App() {
  const [dexNumber, setDexNumber] = useState(1);
  const [pokeJSON, setPokeJSON] = useState(null);

  const fetchPoke = async () => {
    try {
      const data = await getPokemonJSON(dexNumber);
      setPokeJSON(data);
    } catch (e) {
      console.error("Error fetching Pokemon data:", e);
    }
  };

  const nextPoke = () => {
    setDexNumber(dexNumber + 1);
  };

  const lastPoke = () => {
    if (dexNumber !== 1) {
      setDexNumber(dexNumber - 1);
    }
  };

  useEffect(() => {
    fetchPoke();
  }, [dexNumber]);

  return (
    <div className="App-container">
      <h1 className="App-header">Exercise 5 - PokeDex!</h1>
      {pokeJSON && (
        <div className="App-content">
          <Pokevisual pokeJSON={pokeJSON} />
          <Infomoves
            height={pokeJSON.height}
            weight={pokeJSON.weight}
            stats={pokeJSON.stats}
            moves={pokeJSON.moves}
          />
        </div>
      )}
      <div className="spacer"></div>
      
      <div>
        <button onClick={lastPoke}>
          <img src="/Users/nithyaab/Documents/GitHub/bootcamp-s24-nithyaa/exer5/pokedex1/left.png" alt="Previous" />
        </button>
        
        <button onClick={nextPoke}>
          <img src="/Users/nithyaab/Documents/GitHub/bootcamp-s24-nithyaa/exer5/pokedex1/right.png" alt="Next" />
        </button>
      </div>
    </div>
  );
}

export default App;
