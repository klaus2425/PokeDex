import { useQuery } from '@tanstack/react-query';
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import { useStateContext } from '../Context/ContextProvider';

const DefaultLayout = () => {
  const {setResults} = useStateContext();

  const fetchData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=-1");
    const pokemon = await response.json();
    setResults(pokemon.results)
    return pokemon;
  }

  const pokemon = useQuery({
    queryKey: ['all-pokemon-data'],
    queryFn: fetchData,
  })

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default DefaultLayout