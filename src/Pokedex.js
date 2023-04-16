import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Pokedex.css';

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`)
      .then(response => {
        setPokemonList(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [page]);

  function handlePrevClick() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handleNextClick() {
    setPage(page + 1);
  }

  return (
    <div>
      <h1>Pokédex</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className='container'>
          <div className='pokemon-list'>
            {pokemonList.map(pokemon => (
              <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name} className='pokemon'>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
                <span>{pokemon.name}</span>
              </Link>
            ))}
          </div>
          <div className='pagination'>
            <button onClick={handlePrevClick} className='previous'>Previous</button>
            <span>{page}</span>
            <button onClick={handleNextClick} className='next'>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pokedex;
