import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { getPokemons, getPokemonsByName } from '../../../../service/pokemons';


function Index() {
  const navigate = useNavigate();
  const [pokemonData, setPokemons] = useState([]);
  const [pokemonAdd, setPokemonAdd] = useState(null);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
        const response = await getPokemons();
        const data = response.data;

        if (response.status === 200) {
            const pokemons = data?.datas?.map(async (pokemon) => {
                const responseDetail = await getPokemonsByName(pokemon?.name || "");
                return {
                    ...responseDetail.data,
                    id: pokemon.id,
                    name: pokemon.name,
                    avatar: pokemon.avatar,
                    type: pokemon.type,
                    weaknesses: pokemon.weaknesses,
                    description: pokemon.description
                };
            });

            const results = await Promise.all(pokemons);
            setPokemons(results);
        } else {
            console.log("Error:", response.status);
        }
    } catch (error) {
        console.log(error, "error");
    }
}


  console.log("data : ", pokemonData)

  const addPokemon = (item) => {
    const myPokemonsLocalStorage = localStorage.getItem('pokemonData');
    const myPokemons = myPokemonsLocalStorage ? JSON.parse(myPokemonsLocalStorage) : [];

    const newMyPokemons = [
      ...myPokemons,
      {
        id: item.id,
        name: item.name,
        avatar: item.avatar,
        type: item.type,
        weaknesses: item.weaknesses,
        description: item.description
      },
    ];

    localStorage.setItem('pokemonData', JSON.stringify(newMyPokemons));

    toast("Add Pokemon Success!");
    setPokemonAdd(null);
  };

  console.log(pokemonData);

  return (
    <div>
      <h1 className="text-4xl font-bold text-white p-4 ml-5">Pokemon</h1>
      <img src="/img/logo.png" alt="" className="h-32 mx-auto" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-3 p-12 md:p-16 gap-x-7 gap-y-5">
        {pokemonData.map((item, index) => {
          const myPokemonsLocalStorage = localStorage.getItem('pokemonData');
          const myPokemons = JSON.parse(myPokemonsLocalStorage) || [];
          const isAlreadyAdd = myPokemons.find((poke) => poke.id === item.id) !== undefined;
          return (
            <div key={index} id={item?.id} className="bg-white/25 p-5 rounded-lg">
              <img src={item?.avatar} alt="" onClick={() => navigate(`/pokemons/${item.id}`)} className="h-44 mx-auto" />
              <h5 className="uppercase text-center text-[#424372] font-bold p-3">{item?.name}</h5>
              <div className="text-right">
                {isAlreadyAdd ? (
                  <span className="text-gray-500 text-xs">Already added</span>
                ) : (
                  <button
                    id="addButton"
                    onClick={() => setPokemonAdd(item)}
                    className="inline-block px-3 py-2.5 bg-[#8687bb] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#d4a695] hover:shadow-lg focus:bg-[#8687bb] focus:shadow-lg focus:outline-none focus:ring-0 active:[#d4a695] active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Add
                  </button>
                )}
              </div>
              <ToastContainer />
            </div>
          );
        })}
        <input type="checkbox" checked={pokemonAdd !== null} className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box text-left bg-slate-800">
            <h3 className="font-semibold text-white text-base">Add {pokemonAdd?.name} to My Pokemon?</h3>
            <div className="modal-action">
              <button className="inline-block px-3 py-2.5 bg-[#8687bb] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#d4a695] hover:shadow-lg focus:bg-[#8687bb] focus:shadow-lg focus:outline-none focus:ring-0 active:[#d4a695] active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => setPokemonAdd(null)}>Cancel</button>
              <button className='inline-block px-3 py-2.5 bg-[#8687bb] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#d4a695] hover:shadow-lg focus:bg-[#8687bb] focus:shadow-lg focus:outline-none focus:ring-0 active:[#d4a695] active:shadow-lg transition duration-150 ease-in-out'
                onClick={() => addPokemon(pokemonAdd)}>Yes!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index