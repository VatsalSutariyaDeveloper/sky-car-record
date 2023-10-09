import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../index.css";
import CustomTextField from './CustomTextField';
import styles from '../../style';
import { radio } from '../../assets';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLoader from '../Hooks/useLoader';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

const UpdateBooking = ({ match }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, startLoading, stopLoading, Loader } = useLoader();
  const [carNameOptions, setCarNameOptions] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [minDate,setMinDate] = useState(currentDate);

  const [formData, setFormData] = useState({
    clientName: '',
    dealerName: '',
    carName: '',
    numberPlate: '',
    price: '',
    destination: '',
    bookingDate: '',
    returnDate: '',
  });
  useEffect(() => {
    fetch(`${window.react_app_url}car-booking/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

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
        console.error('Error fetching carName options:', error);
        toast.error('Failed to fetch carName options. Please try again later.', {
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
  }, []);

  const handleCarSelectChange = (selectedOption) => {
    setSelectedCar(selectedOption);
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
        const response = await axios.put(`${window.react_app_url}car-booking/${id}`, formData); // Replace with your actual API endpoint
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

        setFormData({
          clientName: '',
          dealerName: '',
          carName: '',
          numberPlate: '',
          price: '',
          destination: '',
          bookingDate: '',
          returnDate: '',
        });
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
     <ToastContainer />
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <div className='p-3 md:p-6 flex'>
            <img src={radio} alt="" className='mr-2' />
            <p className='text-gradient text-lg mt-1 md:mt-0 md:text-2xl uppercase'>Update Booking Form</p>
            <hr />
          </div>
        </div>
      </div>
      <section className="md:h-[30rem] md:flex flex-col justify-center items-center">
        <Loader />
        <form onSubmit={handleSubmit}>
          <div className="px-2 pb-5">
            <div className="md:grid md:grid-cols-2 md:gap-2">
              <CustomTextField type="text" label="Client Name" name="clientName" value={formData.clientName} onChange={handleChange} />
              <CustomTextField type="text" label="Dealer Name" name="dealerName" value={formData.dealerName} onChange={handleChange} />
              <Select
                options={carNameOptions}
                value={selectedCar}
                onChange={handleCarSelectChange}
                placeholder="Select Car Name"
                isSearchable
              />
              <CustomTextField type="selectbox" label="Number Plate" name="numberPlate" value={formData.numberPlate} onChange={handleChange} />
              <CustomTextField type="number" label="Price" name="price" value={formData.price} onChange={handleChange} />
              <CustomTextField type="text" label="Destination" name="destination" value={formData.destination} onChange={handleChange} />
              <CustomTextField type="date" label="Booking Date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} />
              <CustomTextField type="date" label="Return Date" name="returnDate" value={formData.returnDate} onChange={handleChange} minDate={new Date().toISOString().split('T')[0]} />
            </div>
            <div className='flex justify-center'>
              <div className='px-1'>
                <button className='bg-primary text-[#33bbcf] py-2 px-5 mt-5 rounded-md w-full uppercase' type="submit">Update Booking</button>
              </div>
              <div className='px-1'>
                <Link to='/'>
                  <button className='bg-primary text-[#33bbcf] py-2 px-5 mt-5 rounded-md w-full uppercase'>Cancel</button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}
export default UpdateBooking;
