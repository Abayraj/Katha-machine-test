import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Nav = () => {
    const { user, loading, logout, trigger } = useContext(AuthContext);

    console.log(user)


    const isUser = !!user;
    const isAdmin = isUser && user.role === 'admin';

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <header className='sticky top-0'>
                <nav className='flex justify-between items-center h-16 bg-white border-b-2 px-4'>
                    <div>
                        <Link to="/">
                        <h1 className='font-serif text-4xl'>NexGen News</h1>
                    </Link>
                     
                    </div>
                    <div className='hidden sm:flex gap-5 text-lg'>
                        {!isUser ? (
                            <>
                                <Link to="/signup" className='border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>Signup</Link>
                                <Link to="/login" className='border border-gray-600 text-black py-2 px-2 rounded hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>Log in</Link>
                            </>
                        ) : (
                            <button onClick={logout} className='border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>Log out</button>
                        )}
                        {isAdmin && (
                            <>
                                <Link to="/addnews" className='border border-gray-600 text-black py-2 px-2 rounded hover:bg-green-500 hover:text-white'>Add News</Link>
                                <Link to="/admin" className='border border-gray-600 text-black py-2 px-2 rounded hover:bg-blue-500 hover:text-white'>Admin</Link>
                            </>
                        )}
                    </div>
                    {/* Hamburger Button */}
                    <div className='sm:hidden'>
                        <button
                            onClick={toggleMenu}
                            className='text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'>
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
                            </svg>
                        </button>
                    </div>
                </nav>
                {/* Mobile Menu */}
                <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'} bg-white border-t-2`}>
                    {!isUser ? (
                        <>
                            <Link to="/signup" className='block py-2 px-4 border-b border-gray-200 text-blue-500 hover:bg-blue-500 hover:text-white'>Signup</Link>
                            <Link to="/login" className='block py-2 px-4 border-b border-gray-200 text-black hover:bg-gray-500 hover:text-white'>Log in</Link>
                        </>
                    ) : (
                        <Link to="/logout" className='block py-2 px-4 border-b border-gray-200 text-black hover:bg-gray-500 hover:text-white'>Log out</Link>
                    )}
                    {isAdmin && (
                        <>
                            <Link to="/addnews" className='block py-2 px-4 text-black hover:bg-green-500 hover:text-white'>Add News</Link>
                            <Link to="/admin" className='block py-2 px-4 text-black hover:bg-green-500 hover:text-white'>Admin</Link>
                        </>
                    )}
                </div>
            </header>
        </>
    );
}

export default Nav;

