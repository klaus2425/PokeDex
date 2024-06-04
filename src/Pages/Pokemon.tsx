import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Progressbar from "../Components/Progressbar";


type Stat = {
  base_stat: number;
  stat: {
    name: string
  };
}

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

  return pokemon.data && pokemon_description.data ? (
    <div className="flex mt-6 flex-col gap-3">
      <div className="w-full flex flex-col items-center">
        <div className="bg-gray-200 rounded-md w-4/6 min-w-72 max-w-4xl">
          <div className="w-full text-center pt-3 mb-3">
            <span className="font-bold text-3xl">{pokemon.data.name.toUpperCase()} #{pokemon.data.id}</span>
          </div>
          <div className="w-full flex justify-center gap-6">
            <img className="w-40 h-40 object-cover transition-transform duration-300 transform scale-100 hover:scale-125 top-7 left-auto" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.data.id}.png`} alt={pokemon.data.name} />
            <div className="w-1/3 flex flex-col gap-3">
              <span>{pokemon_description.data.flavor_text_entries[0].flavor_text.replace('\f', ' ')}</span>
              <div className="w-full bg-red-500 p-3 rounded-lg">
                <span className="font-bold text-white">Stats</span>
                {
                  pokemon.data.stats.map((stat: Stat, index: number) => (
                    <div>
                      <span className="text-white p-2 font-bold">{stat.stat.name.toUpperCase()}</span> <Progressbar value={pokemon.data.stats[index].base_stat} max={255} />
                    </div>
                  ))
                }
              </div>
            </div>
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