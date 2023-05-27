import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function Mypokemon() {
    let navigate = useNavigate();
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonDelete, setPokemonDelete] = useState(null);

    const handleGetItem = () => {
        const dataFromStorage = localStorage.getItem("pokemonData");
        if (dataFromStorage) {
            setPokemonData(JSON.parse(dataFromStorage))
        }
    }

    useEffect(() => {
        handleGetItem()

        return () => {

        }
    }, [])


    function deletePokemon(id) {
        const newArray = pokemonData.filter((p) => p.id !== id);
        setPokemonData([...newArray]);
        localStorage.setItem('pokemonData', JSON.stringify([...newArray]));

        toast("Delete Success !");

        setPokemonDelete(null);

    };


    return (
        <div>
            <h1 class="text-4xl font-bold text-white p-4 ml-5">My Pokemons</h1>
            <img src='/img/logo.png' alt="" class="h-32 mx-auto" />
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-3 p-12 md:p-16 gap-x-7 gap-y-5">
                {Array.from(pokemonData || []).map((item, index) => {
                    return (
                        <div key={index} id={item?.id} className='bg-white/25 p-5 rounded-lg'>
                            <img src={item?.avatar} alt="" onClick={() => navigate(`/pokemons/${item.id}`)} className='h-44 mx-auto' />
                            <h5 className='uppercase text-center text-[#424372] font-bold p-3'>{item?.name}</h5>
                            <div className='text-right'>
                                <button
                                    onClick={() => setPokemonDelete(item)}
                                    className='inline-block px-3 py-2.5 bg-[#8687bb] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#d4a695] hover:shadow-lg focus:bg-[#8687bb] focus:shadow-lg focus:outline-none focus:ring-0 active:[#d4a695] active:shadow-lg transition duration-150 ease-in-out'>
                                    Delete
                                </button>
                            </div>
                            <ToastContainer />
                        </div>
                    );
                })}
                <input type="checkbox" checked={pokemonDelete !== null} className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box text-left bg-slate-800">
                        <h3 className="font-semibold text-white text-base">Delete {pokemonDelete?.name} from My Pokemon ?</h3>
                        <div className="modal-action">
                            <button className="inline-block px-3 py-2.5 bg-[#8687bb] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#d4a695] hover:shadow-lg focus:bg-[#8687bb] focus:shadow-lg focus:outline-none focus:ring-0 active:[#d4a695] active:shadow-lg transition duration-150 ease-in-out"
                                onClick={() => setPokemonDelete(null)}>Cancel</button>
                            <button className='inline-block px-3 py-2.5 bg-[#8687bb] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-[#d4a695] hover:shadow-lg focus:bg-[#8687bb] focus:shadow-lg focus:outline-none focus:ring-0 active:[#d4a695] active:shadow-lg transition duration-150 ease-in-out'
                                onClick={() => deletePokemon(pokemonDelete.id)}>Yes !</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mypokemon