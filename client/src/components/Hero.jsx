import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import styles from '../style';
import { date, deletebtn, edit, carsearch, datesearch, nodata, reset, arrowup } from '../assets';
import '../index.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const Hero = () => {
  const [bookings, setBookings] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [visibleItems, setVisibleItems] = useState(4);
  const [itemsToLoad, setItemsToLoad] = useState(4);
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    fetch(`${window.react_app_url}car-booking`)
      .then((response) => response.json())
      .then((data) => {
        setBookings(data.data);
        setFilteredBookings(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchInputChange = (event) => {
    const searchValue = event.target.value;
    setSearchInput(searchValue);
    filterBookings(searchValue, selectedDate);
  };

  const handleDateChange = (event) => {
    const selectedDateString = event.target.value;
    setSelectedDate(selectedDateString);
    filterBookings(searchInput, selectedDateString);
  };

  const filterBookings = (searchValue, selectedDateString) => {
    const filtered = bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingDate).toISOString().split('T')[0];
      const bookingCarName = booking.carName?.toLowerCase() || '';
      const dateMatch = !selectedDateString || bookingDate === selectedDateString;

      const searchMatch =
        bookingCarName.includes(searchValue.toLowerCase())
      return dateMatch && searchMatch;
    });

    setFilteredBookings(filtered);
  };

  const resetDateFilter = () => {
    setSelectedDate('');
    filterBookings(searchInput, '');
  };

  function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const deleteBooking = (id) => {
    iziToast.question({
      timeout: false,
      close: false,
      overlay: true,
      displayMode: 'once',
      id: 'question',
      zindex: 999,
      title: 'Confirmation',
      message: 'Are you sure you want to delete this user?',
      position: 'center',
      color: 'cyan',
      buttons: [
        [
          '<button><b>Yes</b></button>',
          function (instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
            performDelete(id);
          },
          true,
        ],
        [
          '<button>No</button>',
          function (instance, toast) {
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          },
        ],
      ],
    });
  };

  const performDelete = async (id) => {
    try {
      await fetch(`${window.react_app_url}car-booking/${id}`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };


  const handleScroll = () => {
    if (window.scrollY >= 200) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const visibleBookings = filteredBookings.slice(0, visibleItems);

  const loadMore = () => {
    setVisibleItems(visibleItems + itemsToLoad);
  };

  const LoadingAnimation = () => (
    <div className="flex justify-center items-center px-3 bg-discount-gradient rounded-[10px]">
      <table className="text-gradient table-fixed animate-pulse">
        <tbody>
          <tr>
            <td className="px-6 py-4 flex">
              <div className="rounded-full bg-slate-700 h-10 w-10"></div>
              <span className='font-bold text-lg mx-3 mt-[2px]'></span>
            </td>
            <td>
              <div className='flex justify-end mr-2'>
                <div className="mr-4 rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 border-b border-gray-300"><div className="w-full h-6 bg-slate-700 rounded"></div></td>
            <td className="px-6 py-4 border-b border-gray-300 w-[100px]">
              <div className="w-full h-6 bg-slate-700 rounded"></div>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 border-b border-gray-300"><div className="w-full h-6 bg-slate-700 rounded"></div></td>
            <td className="px-6 py-4 border-b border-gray-300">
              <div className="w-full h-6 bg-slate-700 rounded"></div>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 border-b border-gray-300"><div className="w-full h-6 bg-slate-700 rounded"></div></td>
            <td className="px-6 py-4 border-b border-gray-300">
              <div className="w-full h-6 bg-slate-700 rounded"></div>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 border-b border-gray-300"><div className="w-full h-6 bg-slate-700 rounded"></div></td>
            <td className="px-6 py-4 border-b border-gray-300">
              <div className="w-full h-6 bg-slate-700 rounded"></div>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 border-b border-gray-300"><div className="w-full h-6 bg-slate-700 rounded"></div></td>
            <td className="px-6 py-4 border-b border-gray-300">
              <div className="w-full h-6 bg-slate-700 rounded"></div>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 border-b border-gray-300"><div className="w-full h-6 bg-slate-700 rounded"></div></td>
            <td className="px-6 py-4 border-b border-gray-300">
              <div className="w-full h-6 bg-slate-700 rounded"></div>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4"><div className="w-full h-6 bg-slate-700 rounded"></div></td>
            <td className="px-6 py-4">
              <div className="w-full h-6 bg-slate-700 rounded"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className={`bg-primary`}>
        <section
          id="home"
          className={`md:flex-row flex-col ${styles.paddingY}`}
        >
          <div className={`${styles.flexCenter} flex-col xl:px-0 sm:px-16`}>
            <div className="md:flex md:flex-row md:mx-3 md:pb-5">
              <div className="flex flex-row">
                <div className="relative">
                  <img src={datesearch} alt="" className='md:hidden mx-2 w-6 absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer' />
                  <input type="date" id='datesearch' className="h-10 bg-transparent border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[260px] md:pl-2 pl-[3.3rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={selectedDate}
                    onChange={handleDateChange} />
                </div>
                <div className='bg-primary border border-white rounded-lg md:ml-1 ml-2 md:h-10'>
                  <button className='p-2 w-10' onClick={resetDateFilter}>
                    <img src={reset} alt="" />
                  </button>
                </div>
              </div>
              <div className="flex flex-row mt-3 md:mt-0 md:mx-0 md:ml-12">
                <div className="relative">
                  <img src={carsearch} alt="" className='mx-2 w-6 absolute top-1/2 left-2 transform -translate-y-1/2' />
                  <input
                    className="bg-transparent text-white py-2 border border-gray-300 text-sm rounded-lg pl-14 pr-3 w-[310px] md:h-[43px]"
                    type="search"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  />
                </div>
              </div>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <LoadingAnimation key={index} />
                ))}
              </div>
            ) : (
              <>
                {visibleBookings.length === 0 ? (
                  <div className="">
                    <img src={nodata} alt="" className='md:h-screen h-96 md:-mt-0 sm:-mt-0' />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {visibleBookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="flex justify-center items-center px-3 bg-discount-gradient rounded-[10px]"
                      >
                        <table className="text-gradient table-fixed">
                          <tbody>
                            <tr>
                              <td className="px-6 py-4 flex">
                                <img src={date} alt="date image" />
                                <span className='font-bold text-lg mx-3 mt-[2px]'>{formatDate(booking.bookingDate)}</span>
                              </td>
                              <td>
                                <div className='flex justify-end mr-2'>
                                  <Link to={`/update-booking/${booking._id}`}>
                                    <img src={edit} alt="edit image" className='w-7 mr-4 cursor-pointer hover:scale-125 transition duration-300' />
                                  </Link>
                                  <img
                                    src={deletebtn}
                                    alt="delete image"
                                    className="w-7 cursor-pointer hover:scale-125 transition duration-300"
                                    onClick={() => deleteBooking(booking._id)}
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 border-b border-gray-300">Client Name</td>
                              <td className="px-6 py-4 border-b border-gray-300 w-[100px]">
                                {booking.clientName.split('').map((char, index) => (
                                  index > 0 && index % 10 === 0 ? <br key={index} /> : char
                                ))}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 border-b border-gray-300">Dealer Name</td>
                              <td className="px-6 py-4 border-b border-gray-300">
                                {booking.dealerName.split('').map((char, index) => (
                                  index > 0 && index % 10 === 0 ? <br key={index} /> : char
                                ))}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 border-b border-gray-300">Car name</td>
                              <td className="px-6 py-4 border-b border-gray-300">{booking.carName}</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 border-b border-gray-300">Price</td>
                              <td className="px-6 py-4 border-b border-gray-300">₹ {booking.price}</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 border-b border-gray-300">Number Plate</td>
                              <td className="px-6 py-4 border-b border-gray-300">{booking.numberPlate}</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 border-b border-gray-300">Destination</td>
                              <td className="px-6 py-4 border-b border-gray-300">
                                {booking.destination.split('').map((char, index) => (
                                  index > 0 && index % 10 === 0 ? <br key={index} /> : char
                                ))}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4">Return Date</td>
                              <td className="px-6 py-4">{formatDate(booking.returnDate)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          {visibleItems < filteredBookings.length && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-[#5fbdc7] hover:bg-[#54b1bc] font-bold py-2 px-4 rounded"
                onClick={loadMore}
              >
                Load More
              </button>
            </div>
          )}
        </section>
      </div>
      {showBackToTop && (
        <button
          className="fixed bottom-6 right-6 bg-[#5fbdc7] rounded-full p-2 shadow-md hover:bg-[#54b1bc] animate-bounce"
          onClick={scrollToTop}
        >
          <img src={arrowup} alt="" />
        </button>
      )}
      <ToastContainer />
    </>
  );
};

export default Hero;
