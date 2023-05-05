import axios from "axios";
import React, { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/pokedex/Header";
import PokemonCard from "../components/pokedex/PokemonCard"; 
import { paginationLogic } from "../utils/pagination";

const Pokedex = () => {
  //? array de pokemons antes de fltrar
  const [pokemons, setPokemons] = useState([]);
  //?string para filtrar los pok por nombre
  const [pokemonName, setPokemonName] = useState("");
  //? arreglo de tipos de pok posibles
  const [types, setTypes] = useState([]);

  //? filtro de tipo pok  almacena  tipo actual
  const [currentType, setCurrentType] = useState("");

  //?pagina actual
  const [currentPage, setCurrentPage] = useState(1);
  //?estado global donde se almacena el nombre del usuario
  const nameTrainer = useSelector((store) => store.nameTrainer);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  );
  
 //logica de la paginacion memorizada con useMemo
  const { lastPage, pagesInBlock, pokemonInPage } = useMemo(()=>paginationLogic(currentPage,pokemonsByName),[currentPage,pokemons,pokemonName,currentType]);

  const handleClickPreviousPage=()=>{
    const newCurrentPage=currentPage-1

    if(newCurrentPage>=1){
      setCurrentPage(newCurrentPage)
    }
  }

  const handleClickNextPage=()=>{
    const newCurrentPage=currentPage+1
    if(newCurrentPage<=lastPage){
      setCurrentPage(newCurrentPage)

    }

  }

  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=500";

      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";

    axios
      .get(URL)
      .then((res) => {
        const newTypes = res.data.results.map((type) => type.name);
        setTypes(newTypes);
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    if (currentType) {
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;
      axios
        .get(URL)
        .then((res) => {
          const pokemontByType = res.data.pokemon.map(
            (pokemon) => pokemon.pokemon
          );
          setPokemons(pokemontByType);
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);


  useEffect(() => {
    setCurrentPage(1)
 
  }, [pokemonName,currentType])
  

  return (
    <section className="min-h-screen">
      <Header />
      {/*//seccion filtros y saludo*/}
      <section className="py-6 px-2">
        <h3 className=" text-center"><span className="text-red-500 font-bold text-xl">welcome {nameTrainer},</span></h3>
        <h3 className="text-bold text-center p-4 text-xl">¡here you can find your favorite pokemon!</h3>


        <form onSubmit={handleSubmit}  className="relative mb-4 flex flex-wrap w-[350px] p-4 items-center mx-auto" >
          <div className="flex gap ">
            <input
              id="pokemonName"
              type="text"
              placeholder="Serch your pokemon "
            className="relative m-0 -mr-px flex-auto rounded-l border border-solid border-neutral-500 bg-slate-300/70 bg-clip-padding px-3 py-1.5 text-base font-normal text-black outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500 rounded-md"/>
            <button className='relative h-[45px] w-[45px] text-white bg-red-500 rounded-md'><i className='bx bx-search'></i></button>
          </div>
          <select onChange={(e) => setCurrentType(e.target.value)} className="p-1 border border-solid border-neutral-500 bg-slate-300/70 mt-2 w-[200px] h-[60px]">
            <option className="font-normal text-black" value="">All Types</option>
            {types.map((type) => (
              <option className="capitalize" value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </form>
      </section>

      {/*paginacion*/}
      
<ul  className="flex gap-3 justify-center py-4 px2 flex-wrap">


{/*parimera pagina*/}
      
<li onClick={()=>setCurrentPage(1)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{'<<'}</li>

{/*pagina anterior*/}
      
<li onClick={handleClickPreviousPage} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{'<'}</li>
{pagesInBlock.map((numberPage)=>(

<li onClick={()=>setCurrentPage(numberPage)} className={`p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${numberPage==currentPage&&"bg-red-400"}`} key={numberPage}>{numberPage}</li>
))}

{/*pagina siguiente*/}
      
<li onClick={handleClickNextPage} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{'>'}</li>

{/*ultima pagina*/}
<li onClick={()=>setCurrentPage(lastPage)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{'>>'}</li>

</ul>


      {/*seccion lista pokemons-adaptar colores a cada tipo de pok*/}
      <section className="px-2 grid gap-6 grid-cols-[280px] py-3 place-content-center">
        {pokemonInPage.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>
    </section>
  );
};

export default Pokedex;


{/* {pagesInBlock.map((numberPage)=>(


  <li className="p-3 bg-red-600 font-bold text-black rounded-md"
    key={numberPage}>{numberPage}
  </li>
))}*/}