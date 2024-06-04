import ReactSelect, { StylesConfig } from "react-select";
import Navbar from "../Components/Navbar";
import AllPokemon from "../Components/AllPokemon";
import { useState } from "react";

type CustomStyle = StylesConfig<{ value: string; label: string }, false>;

const Home = () => {
  
  const options = [
    { value: 'id', label: 'Pokémon ID' },
    { value: 'name', label: 'Name' },
  ]

  const orderOptions = [
    { value: 'ascending', label: 'Ascending' },
    { value: 'descending', label: 'Descending' },
  ]

  const [searchKey, setSearchKey] = useState('');
  const [sortType, setSortType] = useState('id');
  const [inputValue, setInputValue] = useState('');
  const [order, setOrder] =  useState('ascending');
  const customStyles:CustomStyle = {
    container: (provided) => ({ ...provided, width: '10rem' }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#ef4444' : 'white', 
      color: state.isSelected ? 'white' : 'black', 
    }),
  };

  const handleSearch = () => {
    setSearchKey(inputValue);
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="text-4xl mt-4 font-bold">Pokémon</div>
      <div className="w-3/12 min-w-72 flex items-center gap-1">
        <input onChange={(ev) => setInputValue(ev.currentTarget.value)} className="rounded px-1 p-0.5 w-full border-2 outline-gray-500" 
        type="text" 
        placeholder="Search Pokémon" 
        onKeyDown={event => {
          if (event.key === 'Enter') {
            handleSearch();
          }
        }}
        />
        <button onClick={handleSearch}><img src={'/pokesearch.svg'} alt="search-icon" /></button> 
      </div>
      <div className="flex justify-center items-center gap-3">
        <div className="font-bold">Sort by: </div>
        <div>
          <ReactSelect
            options={options}
            styles={customStyles}
            defaultValue={{ value: 'id', label: 'Pokemon ID' }}
            isSearchable={false}
            onChange={(value) => {
              if (value && value.value) { 
                setSortType(value.value);
              }
            }}
            />
        </div>
        <div className="font-bold">Order by: </div>
        <div>
          <ReactSelect
            options={orderOptions}
            styles={customStyles}
            defaultValue={{ value: 'Ascending', label: 'Ascending' }}
            isSearchable={false}
            onChange={(value) => {
              if (value && value.value) { 
                setOrder(value.value);
              }
            }}
            />
        </div>
      </div>
      <AllPokemon searchKey={searchKey} sortType={sortType} order={order}/>
    </div>
  )
}

export default Home