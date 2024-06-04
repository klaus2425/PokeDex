import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useStateContext } from "../Context/ContextProvider";

type Pokemon = {
  name: string;
  url: string;
};

type AllPokemonProps = {
  searchKey: string;
  sortType: string;
  order: string;
};

const AllPokemon = ({ searchKey, sortType, order }: AllPokemonProps) => {
  const [max, setMax] = useState(19);
  const navigate = useNavigate();
  const { results } = useStateContext();

  const handleNavigate = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  if (results.length < 1) {
    return <Loading />;
  }

  const getPokemonId = (url: string) => url.split('/').slice(-2, -1)[0];

  const sortedResults = [...results].sort((a: Pokemon, b: Pokemon) => {
    if (sortType === 'id') {
      const idA = parseInt(getPokemonId(a.url), 10);
      const idB = parseInt(getPokemonId(b.url), 10);
      return order === 'ascending' ? idA - idB : idB - idA;
    } else {
      return order === 'ascending' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
  });

  const filteredResults = searchKey
    ? sortedResults.filter((pokemon: Pokemon) => {
        const id = getPokemonId(pokemon.url);
        return pokemon.name.toLowerCase().includes(searchKey.toLowerCase()) || id === searchKey || id.padStart(3, '0') === searchKey;
      })
    : sortedResults;

  return (
    <div className="flex flex-col items-center gap-6 p-3">
      <div className="grid w-fit grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr gap-10 items-start">
        {filteredResults.slice(0, max + 1).map((pokemon: Pokemon, index: number) => {
          const id = getPokemonId(pokemon.url);
          return (
            <div
              key={index}
              onClick={() => handleNavigate(pokemon.name)}
              className="group border-4 border-black flex flex-col relative h-64 bg-gray-100 rounded-md items-center 
              justify-between cursor-pointer transition duration-200 hover:bg-slate-400"
            >
              <span className="mt-1 ml-1 rounded-2xl px-1 bg-red-500 font-bold self-start text-white border-2 border-black">#{id.padStart(3,'0')}</span>
              <img
                className="w-40 h-40 object-cover transition-transform duration-300 transform scale-100 group-hover:scale-125 absolute top-7 left-auto"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                alt={pokemon.name}
              />
              <div className="w-52 text-center bg-red-500 p-2 border-t-4 border-black">
                <span className="font-bold text-white uppercase">{pokemon.name}</span>
              </div>
            </div>
          );
        })}
      </div>
      {max < filteredResults?.length && (
        <button onClick={() => setMax(max + 20)} className="rounded-3xl bg-black text-white p-2">
          Load More
        </button>
      )}
    </div>
  );
};

export default AllPokemon;
