import React, { useState } from 'react';
import "../../index.css";
import CustomTextField from './CustomTextField';
import styles from '../../style';
import { radio } from '../../assets';

const CreateBooking = () => {
  const [formData, setFormData] = useState({
    client_name: '',
    dealer_name: '',
    car_name: '',
    number_plate: '',
    price: '',
    destination: '',
    booking_date: '',
    return_date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send the formData to the server
    fetch('http://localhost:3000/car-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <div className='p-3 md:p-6 flex'>
            <img src={radio} alt="" className='mr-2' />
            <p className='text-gradient text-lg mt-1 md:mt-0 md:text-2xl uppercase'>Car Booking Form</p>
            <hr />
          </div>
        </div>
      </div>
      <section className="md:h-[30rem] md:flex flex-col justify-center items-center">
        <div className="px-2 pb-5">
          <div className="md:grid md:grid-cols-2 md:gap-2">
            <CustomTextField type="text" label="Name" name="client_name" value={formData.client_name} onChange={handleChange} />
            <CustomTextField type="text" label="Dealer Name" name="dealer_name" value={formData.dealer_name} onChange={handleChange} />
            <CustomTextField type="text" label="Car Name" name="car_name" value={formData.car_name} onChange={handleChange} />
            <CustomTextField type="text" label="Number Plate" name="number_plate" value={formData.number_plate} onChange={handleChange} />
            <CustomTextField type="number" label="Price" name="price" value={formData.price} onChange={handleChange} />
            <CustomTextField type="text" label="Destination" name="destination" value={formData.destination} onChange={handleChange} />
            <CustomTextField type="date" label="Booking Date" name="booking_date" value={formData.booking_date} onChange={handleChange} />
            <CustomTextField type="date" label="Return Date" name="return_date" value={formData.return_date} onChange={handleChange} />
          </div>
          <div className='flex justify-center'>
            <div className='px-1'>
              <button className='bg-primary text-[#33bbcf] py-2 px-5 mt-5 rounded-md w-full uppercase' onClick={handleSubmit}>Book User</button>
            </div>
            <div className='px-1'>
              <button className='bg-primary text-[#33bbcf] py-2 px-5 mt-5 rounded-md w-full uppercase'>Reset Form</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CreateBooking;
