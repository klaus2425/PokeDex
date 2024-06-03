import { useQuery } from "@tanstack/react-query";
import { useState } from 'react'

type Pokemon = {
  name: string
}

type AllPokemonProps = {
  searchKey: string;
}

const AllPokemon = ({searchKey}: AllPokemonProps) => {
  const fetchData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=-1&order=");
    const pokemon = await response.json();
    console.log(pokemon);
    return pokemon;
  }
  const [max, setMax] = useState(19);

  const { data, isLoading } = useQuery({
    queryKey: ['all-pokemon-data'],
    queryFn: fetchData,
  })


  return (
    <div className="flex flex-col items-center gap-6 p-3">
      <div className="grid w-fit  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr gap-10 items-start">
        {
          !isLoading ?
            data.results.map((pokemon: Pokemon, index: number) => {
              if (index <= max) {
                return (
                  <div className="group border-4 border-black flex flex-col relative h-64 bg-gray-100 rounded-md items-center justify-between cursor-pointer transition duration-200 hover:bg-slate-400">
                    <span className="mt-1 ml-1 rounded-2xl px-1 bg-red-500 font-bold self-start text-white border-2 border-black">No. {index + 1}</span>
                    <img className="w-40 h-40 object-cover transition-transform duration-300 transform scale-100 group-hover:scale-125 absolute top-7 left-auto" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} />
                    <div className="w-56 text-center bg-red-500 p-2 border-t-4 border-black">
                      <span className="font-bold text-white uppercase">{pokemon.name}</span>
                    </div>
                  </div>
                )
              }
            })
            :
            <div>Loading...</div>
        }
      </div>
      {
        max < data?.count &&
        <button onClick={() => setMax(max + 20)} className="rounded-3xl bg-black text-white p-2">Load More</button>
      }
    </div>
  )
}

export default AllPokemon