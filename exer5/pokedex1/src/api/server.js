const http = require('http');
const url = require('url');
const fetch = require('node-fetch');

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (req.method === 'GET') {
    if (pathname === '/random') {
      getRandomPokemon(res);
    } else if (pathname.startsWith('/pokemon/')) {
      const pokemonName = pathname.split('/pokemon/')[1];
      getPokemonByName(pokemonName, res);
    } else if (pathname.startsWith('/types/')) {
      const typeName = pathname.split('/types/')[1];
      getPokemonByType(typeName, res);
    } else if (pathname.startsWith('/evolve/')) {
      const pokemonName = pathname.split('/evolve/')[1];
      getEvolutionStage(pokemonName, res);
    } else {
      notFound(res);
    }
  } else if (req.method === 'POST' && pathname === '/battle') {
    handleBattle(req, res);
  } else {
    notFound(res);
  }
});

const getRandomPokemon = async (res) => {
  try {
    const randomDexNumber = Math.floor(Math.random() * 151) + 1;
    const randomPokemonData = await getPokemonData(randomDexNumber.toString());
    sendJsonResponse(res, randomPokemonData);
  } catch (error) {
    internalServerError(res);
  }
};

const getPokemonByName = async (name, res) => {
  try {
    const pokemonData = await getPokemonData(name);
    sendJsonResponse(res, pokemonData);
  } catch (error) {
    internalServerError(res);
  }
};

const getPokemonByType = async (type, res) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    const pokemonOfType = data.pokemon.map((entry) => entry.pokemon.name);
    sendJsonResponse(res, pokemonOfType);
  } catch (error) {
    internalServerError(res);
  }
};

const getEvolutionStage = async (name, res) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const data = await response.json();
    const evolvesTo = data.evolves_to.map((entry) => entry.species.name);

    if (evolvesTo.length === 0) {
      sendJsonResponse(res, { evolutionStage: name });
    } else {
      sendJsonResponse(res, { evolutionStage: evolvesTo[0] });
    }
  } catch (error) {
    internalServerError(res);
  }
};

const handleBattle = async (req, res) => {
  try {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { pokemon1, pokemon2 } = JSON.parse(body);
      const [stats1, stats2] = await Promise.all([
        getPokemonData(pokemon1),
        getPokemonData(pokemon2),
      ]);

      const winner = stats1.baseStat > stats2.baseStat ? stats1 : stats2;

      sendJsonResponse(res, { winner });
    });
  } catch (error) {
    internalServerError(res);
  }
};

const getPokemonData = async (name) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  return {
    name: data.name,
    sprite: data.sprites.front_default,
    type: data.types.map((type) => type.type.name),
    baseStat: data.stats.reduce((maxStat, stat) => Math.max(maxStat, stat.base_stat), 0),
  };
};

const sendJsonResponse = (res, data) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

const notFound = (res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
};

const internalServerError = (res) => {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Internal Server Error');
};

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
