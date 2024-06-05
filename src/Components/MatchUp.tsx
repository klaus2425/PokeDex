import { useState } from "react";
import ReactSelect from "react-select";
import { useStateContext } from "../Context/ContextProvider";

type PokemonType = {
  types: matchUpType[],
  name: string,
  url: string
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string
      }
    }
  }
} 

type matchUpType = {
  type: {
    name: string;
    url: string;
  }
}


type Props = {
  pokemon: PokemonType
  weakness: string[]
}

const MatchUp = ({ pokemon, weakness }: Props) => {
  const [matchUpPokemon, setMatchUpPokemon] = useState<PokemonType>();
  const { results } = useStateContext();
  const [message, setMessage] = useState('');
  const fetchMatchUp = async (pokemon: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const pokemonData = await response.json();
    compareMatchUp(pokemon);
    setMatchUpPokemon(pokemonData)
  }

  
  const compareMatchUp = async (matchPokemon: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${matchPokemon}`);
      const matchUpPokemon = await response.json();

      for (const type of matchUpPokemon.types) {
        const matchUpType = type.type.name;
        if (weakness.includes(matchUpType)) {
          setMessage(`${pokemon.name.toUpperCase()} is weak against ${matchPokemon.toUpperCase()}`);
          return; 
        } else if (pokemon.types.some((m) => m.type.name === matchUpType)) {
          console.log(matchUpType);
          setMessage(`${pokemon.name.toUpperCase()} is neutral against ${matchPokemon.toUpperCase()}`);
          return; 
        }
      }
      setMessage(`${pokemon.name.toUpperCase()} is strong against ${matchPokemon.toUpperCase()}`);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      setMessage('Error fetching Pokémon data');
    }
  };
  

  const options = results.map((pokemon) => ({
    label: pokemon.name.slice(0, 1).toUpperCase() +
      pokemon.name.slice(1, pokemon.name.length), value: pokemon.name
  }))

  return (
    <div className="p-3 w-11/12 self-center bg-gray-600 rounded-lg">
      <span className="text-2xl text-white font-bold">Match Up</span>
      <div className="text-center font-bold text-yellow-500 text-xl">
        {message}
      </div>
      <div className="flex gap-3 flex-col md:flex-row md:justify-center">
        <div className="flex w-100 items-center flex-col">
          <img className="w-40" src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
          <span className="font-medium uppercase">{pokemon.name}</span>
        </div>
        <img className="w-24 self-center" src={'/versus.svg'} alt="" />
        <div>
          {
            matchUpPokemon ?
            <div className="flex w-100 items-center flex-col mb-3">
              <img className="w-40" src={matchUpPokemon.sprites.other["official-artwork"].front_default} alt="" />
              <span className="font-medium uppercase">{matchUpPokemon.name}</span>
            </div>
            :
            <div className="flex w-100 items-center flex-col mb-3">
            <img className="w-40" src={'/pokeball.svg'} alt="" />
            <span className="font-medium uppercase">Pokemon</span>
          </div>
          }

        </div>

      </div>
      <ReactSelect
            options={options}
            menuPlacement="auto"
            onChange={(e) => {
              if (e) {
                fetchMatchUp(e.value)
              }
            }}
          />
    </div>
  )
}

export default MatchUp