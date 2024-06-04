
const Navbar = () => {
  return (
    <div className="w-full flex flex-col items-center ">
      <div className="w-full flex items-center border-b-[12px] border-b-black bg-red-500 h-fit p-3 px-3">
        <img className="w-14" src={'/pokeball.svg'} alt="" />
        <img className="w-40 hidden md:block" src={`/PokeDex.svg`} alt="" />

      </div>
      <div className="h-20 w-20 -mt-12 bg-black 
            rounded-full flex justify-center items-center">
        <div className="h-14 w-14 bg-white 
            rounded-full ">
        </div>

      </div>
    </div>

  )
}

export default Navbar