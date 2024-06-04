import { useQuery } from "@tanstack/react-query"
import Navbar from "../Components/Navbar"
import { useParams } from "react-router-dom"

const Pokemon = () => {
  const { name, id } = useParams();

  const fetchPokemon = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemon = response.json();
    return pokemon;
  }

  const fetchDescription = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const description = response.json();
    return description;
  }

  const pokemon = useQuery({
    queryKey: [`pokemon-${name}`],
    queryFn: fetchPokemon,
  })

  const pokemon_description = useQuery({
    queryKey: [`${name}-description`],
    queryFn: fetchDescription,
  })

  console.log(pokemon.data);
  return pokemon.data ? (
    <div className="flex flex-col gap-3">
      <Navbar />
      <div className="w-full flex flex-col items-center">
        <div className="bg-gray-200 rounded-md w-4/6 min-w-72 max-w-4xl">
          <div className="w-full text-center">
            <span>{pokemon.data.name.toUpperCase()} #{pokemon.data.id}</span>
          </div>
          <div className="w-full flex justify-center">
            <img className="w-40 h-40 object-cover transition-transform duration-300 transform scale-100 hover:scale-125 top-7 left-auto" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.data.id}.png`} alt={pokemon.data.name} />

          </div>
        </div>
      </div>
    </div>
  )
    :
    (
      <div>Loading...</div>
    )
}

export default Pokemon