import ReactSelect, { StylesConfig } from "react-select";
import Navbar from "../Components/Navbar";

type CustomStyle = StylesConfig<{ value: string; label: string }, false>;

const Home = () => {
  
  const options = [
    { value: 'name', label: 'Name' },
    { value: 'id', label: 'Pokémon ID' },
  ]



  const customStyles:CustomStyle = {
    container: (provided) => ({ ...provided, width: '10rem' }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#ef4444' : 'white', 
      color: state.isSelected ? 'white' : 'black', 
    }),
  };
  return (
    <div className="flex flex-col gap-2 items-center">
      <Navbar />
      <div className="text-4xl font-bold">Pokémon</div>
      <div className="w-3/12 min-w-72 flex items-center gap-1">
        <input className="rounded px-1 p-0.5 w-full border-2 outline-gray-500" type="text" placeholder="Search Pokémons" />
        🔍
      </div>
      <div className="flex justify-center items-center gap-3">
        <div>Sort by: </div>
        <div>
          <ReactSelect
            options={options}
            styles={customStyles}
            defaultValue={{ value: 'name', label: 'Name' }}
            />
        </div>
      </div>
    </div>
  )
}

export default Home