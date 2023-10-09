import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../index.css';
import CustomTextField from './CustomTextField';
import styles from '../../style';
import { radio } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLoader from '../Hooks/useLoader';
import Select from 'react-select';

const CreateBooking = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();
  const [minDate, setMinDate] = useState(currentDate);

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
  const [carNameOptions, setCarNameOptions] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const { loading, startLoading, stopLoading, Loader } = useLoader();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/car/car-name');
        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error('No carName options found.');
        }
        const options = response.data.data.map((carName) => ({
          value: carName,
          label: carName,
        }));
        setCarNameOptions(options);
      } catch (error) {
        toast.error('Failed to fetch car name options. Please try again later.', {
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
    };

    fetchData();
  }, []); // Provide an empty dependency array to run this effect only once

  useEffect(() => {
    // When selectedCar changes, fetch corresponding number plate
    if (selectedCar) {
      axios
        .get(`http://localhost:3000/car/number-plate/${selectedCar.value}`)
        .then((response) => {
          if (response.data && response.data.data) {
            setFormData((prevData) => ({
              ...prevData,
              numberPlate: response.data.data,
            }));
          } else {
            toast.error('No number plate found for selected car name.', {
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
        })
        .catch((error) => {
          toast.error('Error fetching number plate', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        });
    } else {
      // Clear the numberPlate field if no carName is selected
      setFormData((prevData) => ({
        ...prevData,
        numberPlate: '',
      }));
    }
  }, [selectedCar]); // Only depend on selectedCar


  const handleCarSelectChange = (selectedOption, name) => {
    setSelectedCar(selectedOption);
    setFormData({
      ...formData,
      [name.name]: selectedOption.value,
    });
  };

  const handleChange = (name, value) => {
    
    setFormData({
      ...formData,
      [name]: value,
    });
    if(name == 'bookingDate'){
      setMinDate(value);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setSelectedCar(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading();

    const requiredFields = ['clientName', 'dealerName', 'carName', 'numberPlate', 'price', 'destination', 'bookingDate', 'returnDate'];

    const missingFields = requiredFields.filter((fieldName) => !formData[fieldName].trim());
    if (missingFields.length > 0) {
      stopLoading();
      toast.warning('Please fill in all required fields.', {
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
    }

    // Check if the return date is lower than the booking date
    const bookingDate = new Date(formData.bookingDate);
    const returnDate = new Date(formData.returnDate);

    if (returnDate <= bookingDate) {
      stopLoading();
      toast.error('Return date must be greater than booking date.', {
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
    }

    try {
      const response = await axios.post('http://localhost:3000/car-booking', formData);
      stopLoading();
      if (!response.data.status) {
        toast.error(response.data.message, {
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
      }
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
    }
  };


  return (
    <>
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
              <div className="md:relative">
                <label className="md:text-md text-sm mb-1 md:mb-2 block text-white">Car Name</label>
                <Select
                  name='carName'
                  options={carNameOptions}
                  value={selectedCar}
                  onChange={handleCarSelectChange}
                  placeholder="Select Car Name"
                  isSearchable
                />
              </div>
              <CustomTextField type='text' label='Number Plate' name='numberPlate' value={formData.numberPlate} onChange={handleChange} readonly='true' />
              <CustomTextField type='number' label='Price' name='price' value={formData.price} onChange={handleChange} />
              <CustomTextField type='text' label='Destination' name='destination' value={formData.destination} onChange={handleChange} />
              <CustomTextField type='date' label='Booking Date' name='bookingDate' value={formData.bookingDate} onChange={handleChange} minDate={currentDate} />
              <CustomTextField type='date' label='Return Date' name='returnDate' value={formData.returnDate} onChange={handleChange} minDate={minDate} />
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
