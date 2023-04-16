import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pokedex from './Pokedex';
import PokemonDetails from './PokemonDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
