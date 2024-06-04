import { useQueries } from "@tanstack/react-query";

type Props = {
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};

type PokemonType = {
  type: {
    name: string,
    url: string,
  }
}

type objType = {
  name: string;
  url: string;
}

const GetWeakness = ({ types }: Props) => {

  const fetchWeakness = async (url: string) => {
    const response = await fetch(url);
    const weakness = await response.json();
    return weakness;
  }

  const pokemon_weakness = useQueries({
    queries: types.map((type: PokemonType) => {
      return {
        queryKey: [type.type.name, type.type.name],
        queryFn: () => fetchWeakness(type.type.url)
      }
    }),
    combine: (results) => {
      console.log(results);
      return {
        data: results.map((result) => result.data?.damage_relations.double_damage_from),
        pending: results.some((result) => result.isPending)
      }
    }
  })
  const flattenedArray = pokemon_weakness?.data?.reduce((acc, curr) => {
    if (Array.isArray(curr)) {
      return [...acc, ...curr];
    } else {
      return acc;
    }
  }, []);

  const weaknessTypes: string[] = flattenedArray ? Array.from(new Set(flattenedArray.map((obj: objType) => obj.name))) : [];

  const getColor = (type: string) => {
    return `bg-${type}`;
  }

  console.log(weaknessTypes);
  return (
    <div className="flex gap-2 flex-wrap">
      {weaknessTypes.map((weakness, index) => (
        <span className={`${getColor(weakness)} text-center font-medium p-1 min-w-14 uppercase rounded-full border-2 border-black`} key={index}>{weakness}</span>
      ))}
    </div>

  )
}

export default GetWeakness