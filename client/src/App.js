import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [name, setName] = useState('');

  const getPokemon = async () => {
    try {
      const response = await axios.get(`/api/pokemon/${name}`);
      setPokemon(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={getPokemon}>Search</button>
      {pokemon && (
        <div>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      )}
    </div>
  );
}

export default App;
