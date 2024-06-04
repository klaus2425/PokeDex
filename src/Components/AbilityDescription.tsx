import { useQuery } from "@tanstack/react-query";

type Ability = {
  ability: string;
}

const AbilityDescription = ({ability}: Ability) => {
  
  const fetchDescription = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/ability/${ability.toLowerCase()}`);
    const pokemonAbility = await response.json();
    const abilityText: string = pokemonAbility.flavor_text_entries[0].language.name === 'en' ?
    pokemonAbility.flavor_text_entries[0].flavor_text : pokemonAbility.flavor_text_entries[1].flavor_text
    return abilityText
  }

  const {data} = useQuery({
    queryKey: [ability],
    queryFn: fetchDescription
  })

  return (
    <div className="hidden group-hover:block absolute w-48 bottom-8 bg-blue-600 text-white rounded-md p-2">
      <span className="break-normal">{data}</span>
    </div>
  )
}

export default AbilityDescription