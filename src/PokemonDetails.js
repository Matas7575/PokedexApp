import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function PokemonDetails() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const { name } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        setSelectedPokemon(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [name]);

  return (
    <div className="pokemon-details">
      {loading && <p>Loading...</p>}
      {!loading && selectedPokemon && (
        <div>
          <h2>{selectedPokemon.name}</h2>
          <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
          <div>
            <h3>Types:</h3>
            <ul>
              {selectedPokemon.types.map(type => (
                <li key={type.type.name}>{type.type.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Stats:</h3>
            <ul>
              {selectedPokemon.stats.map(stat => (
                <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Abilities:</h3>
            <ul>
              {selectedPokemon.abilities.map(ability => (
                <li key={ability.ability.name}>{ability.ability.name} ({ability.is_hidden ? 'hidden' : 'not hidden'}, slot: {ability.slot})</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Height:</h3>
            <p>{selectedPokemon.height / 10} m</p>
          </div>
          <div>
            <h3>Weight:</h3>
            <p>{selectedPokemon.weight / 10} kg</p>
          </div>
          <Link to="/" className="back-button">Back</Link>
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;
