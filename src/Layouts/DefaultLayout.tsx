import { useQuery } from '@tanstack/react-query';
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import { useStateContext } from '../Context/ContextProvider';

const DefaultLayout = () => {
  const { setResults } = useStateContext();

  const fetchData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=-1");
    const pokemon = await response.json();
    setResults(pokemon.results)
    return pokemon;
  }

  useQuery({
    queryKey: ['all-pokemon-data'],
    queryFn: fetchData,
  })

  return (
    <div className="absolute inset-0 -z-10 h-fit min-h-screen w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <Navbar />
        <Outlet />
    </div>

  )
}

export default DefaultLayout