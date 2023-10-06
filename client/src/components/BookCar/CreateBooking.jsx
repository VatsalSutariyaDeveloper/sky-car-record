import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../Navbar"
import '../../index.css';
import CustomTextField from './CustomTextField';
import styles from '../../style';
import { radio } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLoader from '../Hooks/useLoader';

const CreateBooking = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();

  const initialFormData = {
    clientName: '',
    dealerName: '',
    carName: '',
    numberPlate: '',
    price: '',
    destination: '',
    bookingDate: currentDate,
    returnDate: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const { loading, startLoading, stopLoading, Loader } = useLoader();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading();

    const requiredFields = ['clientName', 'dealerName', 'carName', 'numberPlate', 'price', 'destination', 'bookingDate', 'returnDate'];

    const missingFields = requiredFields.filter((fieldName) => !formData[fieldName]);

    if (missingFields.length > 0) {
      stopLoading();
      toast.warning('Please Enter Fill all Data', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    } else {
      try {
        const response = await axios.post(`${window.react_app_url}car-booking`, formData);
        stopLoading();
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });

        resetForm();
        startLoading();
        setTimeout(() => {
          stopLoading();
          navigate('/');
        }, 1000);
      } catch (error) {
        stopLoading();

        if (error.response && error.response.data) {
          toast.error(error.response.data.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        } else {
          toast.error('An error occurred while processing your request.', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        }
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
    <Navbar />
      <ToastContainer />
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <div className='p-3 md:p-6 flex'>
            <img src={radio} alt='' className='mr-2' />
            <p className='text-gradient text-lg mt-1 md:mt-0 md:text-2xl uppercase'>Car Booking Form</p>
            <hr />
          </div>
        </div>
      </div>
      <section className='md:h-[30rem] md:flex flex-col justify-center items-center'>
        <Loader />
        <form onSubmit={handleSubmit}>
          <div className='px-2 pb-5'>
            <div className='md:grid md:grid-cols-2 md:gap-2'>
              <CustomTextField type='text' label='Client Name' name='clientName' value={formData.clientName} onChange={handleChange} />
              <CustomTextField type='text' label='Dealer Name' name='dealerName' value={formData.dealerName} onChange={handleChange} />
              <CustomTextField type='text' label='Car Name' name='carName' value={formData.carName} onChange={handleChange} />
              <CustomTextField type='text' label='Number Plate' name='numberPlate' value={formData.numberPlate} onChange={handleChange} />
              <CustomTextField type='number' label='Price' name='price' value={formData.price} onChange={handleChange} />
              <CustomTextField type='text' label='Destination' name='destination' value={formData.destination} onChange={handleChange} />
              <CustomTextField type='date' label='Booking Date' name='bookingDate' value={formData.bookingDate} onChange={handleChange} minDate={currentDate} />
              <CustomTextField type='date' label='Return Date' name='returnDate' value={formData.returnDate} onChange={handleChange} minDate={currentDate} />
            </div>

            <div className='flex justify-center'>
              <div className='px-1'>
                <button className='bg-primary text-[#33bbcf] py-2 px-5 mt-5 rounded-md w-full uppercase' type='submit' disabled={loading}>
                  {loading ? 'Booking...' : 'Book Car'}
                </button>
              </div>
              <div className='px-1'>
                <button className='bg-primary text-[#33bbcf] py-2 px-5 mt-5 rounded-md w-full uppercase' type='button' onClick={resetForm}>
                  Reset Form
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateBooking;
