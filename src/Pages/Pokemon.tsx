import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import Progressbar from "../Components/Progressbar";
import GetWeakness from "../Components/GetWeakness";
import Loading from "../Components/Loading";
import { useStateContext } from "../Context/ContextProvider";


type Stat = {
  base_stat: number;
  stat: {
    name: string
  };
}

type Ability = {
  ability: {
    name: string;
    url: string;
  }
}

type PokemonType = {
  type: PokemonResult
}

type PokemonResult = {
  name: string,
  url: string
}


const Pokemon = () => {
  const { name } = useParams();
  const { results } = useStateContext();
  const navigate = useNavigate();
  const foundPokemon = results.find((pokemon: PokemonResult) => pokemon.name === name);
  const index = foundPokemon ? results.indexOf(foundPokemon) : -1;

  const fetchPokemon = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = response.json();
    return pokemon;
  }

  const fetchDescription = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${[pokemon.data.species.url.split('/').slice(-2, -1)[0]]}`);
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
    enabled: pokemon.isLoading!
  })

  const getHeight = (height: number) => {
    const totalInches = height * 10 / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = (totalInches % 12).toFixed(0);
    return `${feet}' ${inches}"`;
  }


  const getWeight = (weight: number) => {
    const weightinLbs = (weight / 10 * 2.205).toFixed(1)
    return `${weightinLbs} lbs`;
  }

  const onNextClick = () => {
    const nextIndex = index + 1;
    const nextPokemon = results[nextIndex];
    navigate(`/pokemon/${nextPokemon.name}`);
  }

  const onPreviousClick = () => {
    const previousIndex = index - 1;
    const previousPokemon = results[previousIndex];
    navigate(`/pokemon/${previousPokemon.name}`);
  }

  const height = getHeight(pokemon?.data?.height);
  const weight = getWeight(pokemon?.data?.weight)

  const getColor = (type: string) => {
    return `bg-${type}`;
  }

  return pokemon.data && pokemon_description.data ? (
    <div className="flex mt-6 flex-col gap-3">
      <div className="w-full flex flex-col items-center">

        <div className="bg-gray-200 p-2 px-3 flex flex-col gap-3 rounded-md w-4/6 min-w-72 max-w-4xl">
          <div className="flex justify-between">
            {
              index > 0 ?
                <button onClick={onPreviousClick} className="bg-red-500 p-2 font-medium w-32 text-white -mt-2 -ml-3 rounded-tl-md rounded-br-md text-2xl">Previous</button> :
                <div className="w-32"></div>
            }
            <button onClick={() => navigate(`/`)} className="flex bg-red-500 p-3 rounded-lg m-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 8L3.29289 8.70711L2.58579 8L3.29289 7.29289L4 8ZM9 20C8.44772 20 8 19.5523 8 19C8 18.4477 8.44772 18 9 18L9 20ZM8.29289 13.7071L3.29289 8.70711L4.70711 7.29289L9.70711 12.2929L8.29289 13.7071ZM3.29289 7.29289L8.29289 2.29289L9.70711 3.70711L4.70711 8.70711L3.29289 7.29289ZM4 7L14.5 7L14.5 9L4 9L4 7ZM14.5 20L9 20L9 18L14.5 18L14.5 20ZM21 13.5C21 17.0898 18.0898 20 14.5 20L14.5 18C16.9853 18 19 15.9853 19 13.5L21 13.5ZM14.5 7C18.0898 7 21 9.91015 21 13.5L19 13.5C19 11.0147 16.9853 9 14.5 9L14.5 7Z" fill="white" />
              </svg>
              <span className="font-medium text-white">Return</span>
            </button>
            {
              index + 1 < results.length ?
                <button onClick={onNextClick} className="bg-red-500 p-2 font-medium w-32 text-white -mt-2 -mr-3 rounded-tr-md rounded-bl-md text-2xl">Next</button> :
                <div className="w-32"></div>
            }
          </div>
          <div className="w-full text-center pt-3 mb-3">
            <span className="font-bold text-3xl">{pokemon.data.name.toUpperCase()} #{pokemon.data.id}</span>
          </div>
          <div className="w-full flex flex-col items-center md:flex-row justify-center gap-2 lg:gap-20">
            <div className="flex flex-col shrink-0">
              <img className="w-60 h-60 object-cover transition-transform duration-300 transform scale-100 hover:scale-125 top-7 left-auto"
                src={pokemon.data.sprites.other["official-artwork"].front_default} alt="" />
            </div>
            <div className="w-1/3 min-w-64 flex flex-col gap-3">
              <span>{pokemon_description.data.flavor_text_entries[0].flavor_text.replace('\f', ' ')}</span>
              <div className="w-full bg-red-500 p-3 rounded-lg">
                <span className="font-bold text-white">Stats</span>
                {
                  pokemon.data.stats.map((stat: Stat, index: number) => (
                    <div key={index}>
                      <span className="text-white p-2 font-bold">{stat.stat.name.toUpperCase()}</span> <Progressbar value={pokemon.data.stats[index].base_stat} max={255} />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="w-full gap-6 md:gap-16 flex-col items-center md:items-start md:flex-row flex justify-center mb-10">
            <div className="w-64 rounded-md bg-green-500">
              <div className="grid grid-cols-2 p-3">
                <div className="flex flex-col">
                  <span className="font-medium text-white text-1xl">Height:</span>
                  <span className="self-end  text-xl text-end">{height}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-white text-1xl">Weight:</span>
                  <span className="self-end  text-xl text-end">{weight}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-white text-1xl">Abilities:</span>
                  {
                    pokemon.data.abilities.map((ability: Ability, index: number) => (
                      <span key={index} className="text-wrap font-medium break-all">{ability.ability.name.toUpperCase()}</span>
                    )
                    )
                  }
                </div>
              </div>
            </div>
            <div className="flex w-1/3 min-w-60 flex-col gap-2">
              <span className="font-medium">Type:</span>
              <div className="flex gap-2">
                {pokemon.data.types.map((type: PokemonType, index: number) => (
                  <span
                    className={`p-1 px-2 uppercase rounded-full border-2 border-black font-medium ${getColor(type.type.name)}`}
                    key={index}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-3 ">
                <span className="font-medium">Weaknesses:</span>
                <GetWeakness types={pokemon.data.types} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
    :
    <Loading />
}

export default Pokemon