import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/pokedex/Header";


const backgroundByType={
  grass: "bg-purple-500", 
  fire: "bg-red-500" ,
  normal: "bg-blue-500",
  fighting: "bg-gray-500",
  flying: "bg-orange-500",
  poison: "bg-yellow-500",
  ground: "bg-brown-500",
  rock: "bg-purple-500",
  bug: "bg-pink-500",
  ghost: "bg-gray-500",
  steel: "bg-green-500",
  water: "bg-red-500",
  electric: "bg-brown-500",
  psychic:  "bg-pink-500",
  ice:  "bg-orange-500",
  dragon: "bg-yellow-500",
  dark:  "bg-gray-500",
  fairy: "bg-blue-500",
  unknown: "bg-purple-500",
  shadow: "bg-brown-500",

}


const PokemonId = () => {
  const [pokemon, setPokemon] = useState();

  const { id } = useParams();

  const types=pokemon?.types
  .slice(0,2)
  .map(type=>type.type.name)
  .join(" / ")

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getPercentStatBar = (stat_base) => {
    const percentBarProgres = (stat_base * 100) / 255;
    return `${percentBarProgres}% `;
  };

  return (
    <section>
      <Header />
      <section className="px-2 py-14">
        <article className="max-w-[768px] mx-auto shadow-xl p-2 ">
          {/*seccion superrior */}
          <section className="bg-gradient-to-b from-green-500 to-black relative h-[150px]">
            <div className="w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-14">
              <img
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </div>
          </section>

          <section>
            <div>
              <h3>#{pokemon?.id}</h3>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <hr />
              <h2 className="capitalize font-bold">{pokemon?.name}</h2>
            </div>
            <div className="flex justify-center gap-6 text-center">
              <div>
                <div>
                  <h5>Weight</h5>
                  <span>{pokemon?.weight}</span>
                </div>
              </div>
              <div>
                <h5>Height</h5>
                <span>{pokemon?.height}</span>
              </div>
            </div>

            <section className="grid sm:grid-cols-2 gap-4">

              {/*tipos*/}
              
            <section className="text-center">
            <h3>Types</h3>
            <section className="grid grid-cols-2 gap-4 mt-4 ">


            {/*{`${backgroundByTypee[pokemon?.types[0].type.name]}`}*/}

            {/*className="p-2 px-8 border-[1px] border-gray-300 capitalize "*/}

            {pokemon?.types.map(type=><article  className={`p-2 px-8 border-[1px] border-gray-300 capitalize ${backgroundByType[pokemon?.types[0].type.name]}`}  key={type.type.name}>{type.type.name}</article>)}
            </section>
            
            </section>
            
            {/*habilidades*/} 


            <section className="text-center">
            <h3>Abilities</h3>
            <section className="grid grid-cols-2 gap-4 mt-4 ">
            {pokemon?.abilities.map(ability=><article className="p-2 px-8 border-[1px] border-gray-300 capitalize truncate" key={ability.ability.name}>{ability.ability.name}</article>)}
            </section>
            </section>


            </section>

          </section>

          {/*seccion de stats*/}
          <section>
            <h3>stats</h3>
            <section>
              {pokemon?.stats.map((stat) => (
                <article key={stat.stat.name}>
                  <section className="flex justify-between">
                    <h5 className="capitalize">{stat.stat.name}</h5>
                    <span>{stat.base_stat}/255</span>
                  </section>
                  <div className="bg-gray-100 h-6 rounded-sm">
                    <div
                      style={{ width: getPercentStatBar(stat.base_stat) }}
                      className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500"
                    ></div>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </article>
      </section>
    </section>
  );
};

export default PokemonId;
