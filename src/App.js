import React from 'react';

import { Link, Outlet } from "react-router-dom"
import Pokedex from './Pokedex';
import PokemonDetails from './PokemonDetails';





export default function App() {
  return (
      <>
          <nav>
              <Link to="#/" element={<Pokedex />}></Link>
              <Link to="#/pokemon/:name" element={<PokemonDetails />}>About</Link>
          </nav>
          <Outlet />
      </>
  )
}
