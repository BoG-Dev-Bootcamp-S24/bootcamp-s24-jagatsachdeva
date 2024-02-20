import { useState, useEffect } from 'react';
import { useFetch } from './useFetch';

import { PokemonIdentifiers } from "./PokemonIdentifiers";
import { InfoAndStats } from "./InfoAndStats"

function App() {
  const [dexNumber,setDexNumber] = useState(1);
  const data = useFetch(`https://pokeapi.co/api/v2/pokemon/${dexNumber}`);
  
  return (
    <div className="App">
      <PokemonIdentifiers dexNumber={dexNumber} data={data} setDexNumber={setDexNumber}/>
      <InfoAndStats dexNumber={dexNumber} data={data}/>
    </div>
  );
}

export default App;
