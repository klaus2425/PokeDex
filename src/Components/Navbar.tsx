
const Navbar = () => {
  return (
    <div className="w-full flex items-center border-b-8 border-b-black gap-2 bg-red-500 h-fit p-3 px-3">
      <img className="w-14" src={'/pokeball.svg'} alt="" />
      <div className="font-bold text-white text-3xl">Pokédex</div>
    </div>
  )
}

export default Navbar