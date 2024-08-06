import React from 'react'
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <>
        <header>
        <nav className='flex justify-around items-center w-screen h-16  bg-white'>
                <div>
                <h1 className='font-serif text-4xl '>NexGen Tech News</h1>
                </div>
                <div className='flex gap-5 text-lg'>
                    <Link className='border border-blue-500 text-blue-500 py-1 px-2 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>Sign up</Link>
                    <Link className='border border-gray-600 text-black py-1 px-2 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>Log in</Link>
                </div>
            </nav>
        </header>
       
        </>
    )
}

export default Nav;
