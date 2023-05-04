import { joinPaths } from '@remix-run/router'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


const bordersByType = {

  grass: "border-purple-500",
  fire: "border-red-500",
  normal: "border-blue-500",
  fighting: "border-gray-500",
  flying: "border-orange-500",
  poison: "border-yellow-500",
  ground: "border-brown-500",
  rock: "border-purple-500",
  bug: "border-pink-500",
  ghost: "border-gray-500",
  steel: "border-green-500",
  water: "border-red-500",
  electric: "border-brown-500",
  psychic:  "border-pink-500",
  ice:  "border-orange-500",
  dragon: "border-yellow-500",
  dark:  "border-gray-500",
  fairy: "border-blue-500",
  unknown: "border-purple-500",
  shadow: "border-brown-500",
}
const backgroundByType={
  grass: "from-purple-500 to-black ", 
  fire: "from-red-500 to-black " ,
  normal: "from-blue-500 to white",
  fighting: "from-gray-500 to white",
  flying: "from-orange-500 to white",
  poison: "from-yellow-500 to white",
  ground: "from-brown-500 to white",
  rock: "from-purple-500 to white",
  bug: "from-pink-500 to white",
  ghost: "from-gray-500 to white",
  steel: "from-green-500 to white",
  water: "from-red-500 to white",
  electric: "from-brown-500 to white",
  psychic:  "from-pink-500 to white",
  ice:  "from-orange-500 to white",
  dragon: "from-yellow-500 to white",
  dark:  "from-gray-500 to white",
  fairy: "from-blue-500 to white",
  unknown: "from-purple-500 to white",
  shadow: "from-brown-500 to white",

}

const textByType = {

  grass: "text-purple-500",
  fire: "text-red-500",
  normal: "text-blue-500",
  fighting: "text-gray-500",
  flying: "text-orange-500",
  poison: "text-yellow-500",
  ground: "text-brown-500",
  rock: "text-purple-500",
  bug: "text-pink-500",
  ghost: "text-gray-500",
  steel: "text-green-500",
  water: "text-red-500",
  electric: "text-brown-500",
  psychic:  "text-pink-500",
  ice:  "text-orange-500",
  dragon: "text-yellow-500",
  dark:  "text-gray-500",
  fairy: "text-blue-500",
  unknown: "text-purple-500",
  shadow: "text-brown-500",
}
  
const PokemonCard = ({pokemonUrl}) => {

  const [pokemon, setPokemon] = useState()

  const types=pokemon?.types
  .slice(0,2)
  .map(type=>type.type.name)
  .join(" / ")
  
  useEffect(() => {
  
    axios
    .get(pokemonUrl)
    .then((res)=>setPokemon(res.data))
    .catch((err)=>console.log(err))


  }, [])
  
 
 //${}
  return (
    <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 rounded-md ${bordersByType[pokemon?.types[0].type.name]}`}>

    {/*seccion superior*/}

    <section className={`bg-gradient-to-b relative h-[150px] ${backgroundByType[pokemon?.types[0].type.name]}`}>
    <div className='absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2'>
    <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
    </div>

    </section>

      {/*seccion inferior*/}


      <section className={`${textByType[pokemon?.types[0].type.name]}`}>
      <h3 className='mt-10'>{pokemon?.name}</h3>
      <h4>{types}</h4>
      <span>Type</span>
      <hr/>
      <section className='grid grid-cols-3 gap-2 p-2'>
      {
        pokemon?.stats.map(stat=>(
        <div key={stat.stat.name}>
        <h5>{stat.stat.name}</h5>
        <span>{stat.base_stat}</span>

        </div>

        ))

      }
      </section>
      
      </section>
    </Link>
  )
}

export default PokemonCard