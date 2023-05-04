import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { setNameTrainer } from '../slices/nameTrainer.slice'

const Home = () => {
const dispatch=useDispatch()
const navigate=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(setNameTrainer(e.target.nameTrainer.value))
    navigate("/pokedex")
  }
  return (
    <section className='min-h-screen grid grid-rows-[1fr_auto]  justify-center'>
    {/*Parte superior*/}
    <section className='my-auto  border-black p-2 '>
    <article className=''>
    <div className='min-w-[500px] mt-10 p-3 md:max-w-[600px]'>
    <img className='' src="/images/pokedex.png" alt="" />
    </div> 
    <h2 className='text-[#FE1936] font-bold text-[30px] text-center py-5'>¡Hello trainer!</h2>
    <p className='fonr-bold text-center py-5'>give me your name to start:</p>

    <form onSubmit={handleSubmit}  className="mb-4 flex w-[350px] items-center mx-auto gap-2">
    <input id="nameTrainer" type=" " placeholder='your name...' className="elative m-0 -mr-px block w-[1%] flex-auto rounded-l border border-solid border-neutral-500 bg-slate-300/70 bg-clip-padding px-3 py-1.5 text-base font-normal text-black outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500 rounded-md"/>

    <button className='relative h-[45px] w-[45px] text-white bg-red-500 rounded-md'>
    <i className='bx bx-search'></i>
    </button>
    </form>

    </article>
    
    </section>

    {/*Footer*/}
    <Footer/>
    </section>
  )
}

export default Home
