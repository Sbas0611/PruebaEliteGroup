const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/api/pokemon/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = {
      name: data.name,
      image: data.sprites.front_default,
      abilities: data.abilities.slice(0, 3).map(ability => ability.ability.name),
      move: data.moves.slice(0, 3).map(move => move.move.name)
    };
    res.json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(404).send('Not Found');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
