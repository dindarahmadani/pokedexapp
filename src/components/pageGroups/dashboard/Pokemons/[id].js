import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPokemonsByName } from '../../../../service/pokemons'
import Navbar from '../../Navbar';
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'

function DetailPokemons() {
  const params = useParams();
  const [pokemonData, setPokemons] = useState(null);
  const [pokemonAdd, setPokemonAdd] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const myPokemonslocalstorage = localStorage.getItem('pokemonData');
    if (myPokemonslocalstorage) {
      const myPokemons = JSON.parse(myPokemonslocalstorage);
      const isAlreadyAdded = myPokemons.some((item) => item.id === pokemonData?.id);
      setIsAdded(isAlreadyAdded);
    }
  }, [pokemonData]);

  useEffect(() => {
    if (params?.id) {
      fetchPokemon(params?.id);
    }
  }, [params]);

  const fetchPokemon = async (id) => {
    try {
      const payloadDetail = await getPokemonsByName(id);
      const result = {
        ...payloadDetail.data.datas,
        id: payloadDetail?.data?.datas?.id || "",
        name: payloadDetail?.data?.datas?.name || "",
        avatar: payloadDetail?.data?.datas?.avatar || "",
        type: payloadDetail?.data?.datas?.type || "",
        weaknesses: payloadDetail?.data?.datas?.weaknesses || "",
        description: payloadDetail?.data?.datas?.description || ""
      };
      setPokemons(result);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const addPokemon = (item) => {
    const myPokemonslocalstorage = localStorage.getItem('pokemonData')

    console.log(myPokemonslocalstorage)

    if (myPokemonslocalstorage) {
      const myPokemons = JSON.parse(myPokemonslocalstorage);
      const newMyPokemons = [...myPokemons, { id: item.id, name: item.name, avatar: item.avatar, type: item.type, weaknesses: item.weaknesses, description: item.description }];
      localStorage.setItem('pokemonData', JSON.stringify(newMyPokemons));
    } else {
      const newMyPokemons = [{ id: item.id, name: item.name, avatar: item.avatar, type: item.type, weaknesses: item.weaknesses, description: item.description }];
      localStorage.setItem('pokemonData', JSON.stringify(newMyPokemons));
    }

    toast("Add Pokemons Success !");

    setPokemonAdd(null)

  }

  return (
    <div>
      <Navbar />
      <div className="bg-white/25 items-center mt-10 px-8 md:px-14 p-4 rounded-3xl mx-auto max-w-xs md:max-w-[55rem] grid lg:grid-cols-2">
        <div className="hidden lg:block px-5">
          <img src={pokemonData?.avatar} alt="event" className="w-[300px] rounded-xl shadow-xl " />
        </div>
        <div className="py-2 wd:py-12 ">
          <h2 className="text-3xl font-semibold text-slate-700 md:text-3xl lg:text-4xl">{pokemonData?.name}</h2>
          <img src={pokemonData?.avatar} alt="event"
            className="pt-4 rounded-xl shadow-xl w-[250px] mx-auto sm:py-10 sm:w-[300px] lg:hidden" />
          <h6 className='font-bold mt-6 text-slate-700'>Type</h6>
          <p className=" text-slate-600 text-justify text-sm">
            <span>{pokemonData?.type}</span>
          </p>
          <h6 className='font-bold mt-4 text-slate-700'>Weaknesses</h6>
          <p className=" text-slate-600 text-justify text-sm">
            <span>{pokemonData?.weaknesses}</span>
          </p>
          <h6 className='font-bold mt-4 text-slate-700'>Description</h6>
          <p className=" text-slate-600 text-justify text-sm">
            <span>{pokemonData?.description}</span>
          </p>
          {isAdded ? null : (
            <div className="text-center pt-8 font-bold" >
              <button
                onClick={() => setPokemonAdd(pokemonData)}
                className="rounded-3xl bg-[#8687bb] px-8 md:px-16 py-2 text-slate-800 uppercase hover:bg-[#d4a695]" >
                Add To My Pokemon
              </button>
            </div>
          )}
          <ToastContainer />
        </div>
        <input type="checkbox" checked={pokemonAdd !== null} className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box text-left bg-slate-800">
            <h3 className="font-semibold text-white text-base">Add {pokemonAdd?.name} to My Pokemon ?</h3>
            <div className="modal-action">
              <button className="inline-block px-3 py-2.5 bg-[#8687bb] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#d4a695] hover:shadow-lg focus:bg-[#8687bb] focus:shadow-lg focus:outline-none focus:ring-0 active:[#d4a695] active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => setPokemonAdd(null)}>Cancel</button>
              <button className='inline-block px-3 py-2.5 bg-[#8687bb] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#d4a695] hover:shadow-lg focus:bg-[#8687bb] focus:shadow-lg focus:outline-none focus:ring-0 active:[#d4a695] active:shadow-lg transition duration-150 ease-in-out'
                onClick={() => addPokemon(pokemonAdd)}>Yes !</button>
            </div>
          </div>
        </div>
      </div>
      <h1 className=" text-xl md:text-3xl font-extrabold text-slate-700 py-6 md:py-10 px-14 md:px-36">More Pokemons</h1>
    </div>
  )
}

export default DetailPokemons