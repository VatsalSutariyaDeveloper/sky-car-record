import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { close, menu } from '../assets';
import { useCookies } from 'react-cookie'
import AddCarModal from './AddCarModal';
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  

  const logout = () => {
    toast.success("Logout successfully", {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    removeCookie('jwt');
    navigate('/login')
  }

  const toggleMenu = () => {
    setToggle((prev) => !prev);
  };

  const closeNavbar = () => {
    setToggle(false);
  };

  return (
    <nav className="bg-primary sticky top-0 z-50">
      <ToastContainer/>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <img src="logo.png" className="h-8 mr-3" alt="skycar Logo" />
        </Link>
        <div className="flex md:order-2">
          <Link to="add-booking">
            <button
              type="button"
              className="text-black bg-[#73cdd7] hover:bg-[#5fbdc7] focus:ring-4 focus:outline-none focus:ring-[#73cdd7] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#73cdd7] dark:hover:bg-[#5fbdc7] dark:focus:ring-[#73cdd7]"
            >
              Book Car
            </button>
          </Link>
          <AddCarModal />
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded={toggle}
            onClick={toggleMenu}
          >
            <span className="sr-only">Toggle menu</span>
            {toggle ? (
              <img src={close} alt="Close menu" className="w-5 h-5" />
            ) : (
              <img src={menu} alt="Open menu" className="w-5 h-5" />
            )}
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${toggle ? 'block' : 'hidden'
            }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-[#202938] md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-primary dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                exact="true"
                to="/"
                activeclassname="active"
                className={`block py-2 pl-3 pr-4 text-[#5fbdc7] md:text-white rounded hover:bg-primary md:hover:bg-transparent md:hover:text-[#5fbdc7] md:p-2 md:px-12 md:dark:hover:text-[#5fbdc7] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === '/' ? 'text-[#5fbdc7]' : ''
                  }`}
                aria-current="page"
                onClick={closeNavbar}
              >
                Home
              </NavLink>
            </li>
            <li>
            <NavLink
                to="/add-booking"
                activeclassname="active"
                className={`block py-2 pl-3 pr-4 text-[#5fbdc7] md:text-white rounded hover:bg-primary md:hover:bg-transparent md:hover:text-[#5fbdc7] md:p-2 md:px-12 ${location.pathname === '/add-booking' ? 'text-[#5fbdc7]' : ''
                  }`}
                onClick={closeNavbar}
              >
                Book Car
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-cars"
                activeclassname="active"
                className={`block py-2 pl-3 pr-4 text-[#5fbdc7] md:text-white rounded hover:bg-primary md:hover:bg-transparent md:hover:text-[#5fbdc7] md:p-2 md:px-12 ${location.pathname === '/all-cars' ? 'text-[#5fbdc7]' : ''
                  }`}
                onClick={closeNavbar}
              >
                All car List
              </NavLink>
            </li>
            <li>
              <button activeclassname="active"
                className={`block py-2 pl-3 pr-4 text-[#5fbdc7] md:text-white rounded hover:bg-primary md:hover:bg-transparent md:hover:text-[#5fbdc7] md:p-2 md:px-12`}
                onClick={logout}>Log out</button>
            </li>
          </ul>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
