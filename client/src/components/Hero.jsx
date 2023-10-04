import React, { useState, useEffect } from 'react';
import styles from '../style';
import { date, deletebtn, edit, addcarbooking, datesearch, nodata } from '../assets';
import '../index.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [bookings, setBookings] = useState([]);
  const [searchInput, setSearchInput] = useState('');


  useEffect(() => {
    fetch('http://localhost:3000/car-booking')
      .then((response) => response.json())
      .then((data) => setBookings(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Event handler for updating search input value
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Function to filter bookings based on the search input
  const filteredBookings = bookings.filter((booking) =>
    booking.carName.includes(searchInput)
  );

  const deleteBooking = async (id) => {
    try {
      await fetch(`http://localhost:3000/car-booking/${id}`, {
        method: 'DELETE',
      });

      // Remove the deleted booking from the state
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <section
            id="home"
            className={`md:flex-row flex-col ${styles.paddingY}`}
          >
            <div className={`${styles.flexCenter} flex-col xl:px-0 sm:px-16`}>
              <div className="flex items-center pb-6 ml-[255px]">
                <div className="-ml-[270px] mx-2">
                  <div className="p-[8px] lg:px-4 bg-black-gradient rounded-full lg:rounded-lg">
                    <div className="flex items-center cursor-pointer" id="addbookingbtn">
                      <img src={datesearch} alt="addcarbooking" className="w-7 lg:w-5" />
                      <span className="hidden lg:inline ml-2 text-white">Search Date</span>
                      {/* <input type="date" id="customDateInput" /> */}
                    </div>
                  </div>
                </div>
                <input
                  className="text-sm px-4 py-2 w-[280px] lg:w-[500px] border border-solid border-gray-300 rounded"
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
              </div>
              {filteredBookings.length === 0 ? (
                <div className="">
                  <img src={nodata} alt="" className='h-screen -mt-40 md:-mt-0 sm:-mt-0' />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="flex justify-center items-center px-3 bg-discount-gradient rounded-[10px]"
                    >
                      <table className="text-gradient">
                        <tbody>
                          <tr>
                            <td className="px-6 py-4 flex">
                              <img src={date} alt="date image" />
                              <span className='font-bold text-lg mx-3 mt-[2px]'>{formatDate(booking.bookingDate)}</span>
                            </td>
                            <td>
                              <div className='flex justify-end mr-2'>
                                <Link to={`/edit-booking/${booking._id}`}>
                                  <img src={edit} alt="edit image" className='w-7 mr-4 cursor-pointer hover:w-8' />
                                </Link>
                                <img src={deletebtn} alt="delete image" className='w-7 cursor-pointer hover:w-8' onClick={() => deleteBooking(booking._id)} />
                              </div>
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
                            <td className="px-6 py-4 border-b border-gray-300">Client Name</td>
                            <td className="px-6 py-4 border-b border-gray-300">{booking.clientName}</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 border-b border-gray-300">Dealer Name</td>
                            <td className="px-6 py-4 border-b border-gray-300">{booking.dealerName}</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 border-b border-gray-300">Destination</td>
                            <td className="px-6 py-4 border-b border-gray-300">{booking.destination}</td>
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
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

// Rest of your component

export default Hero;
