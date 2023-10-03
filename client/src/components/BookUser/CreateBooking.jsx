import React from 'react'
import "../../index.css"
import CustomTextField from './CustomTextField'
import styles from '../../style'
import { radio } from '../../assets'

const CreateBooking = () => {
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
            <CustomTextField type="text" label="Name" />
            <CustomTextField type="text" label="Dealer Name" />
            <CustomTextField type="text" label="Car Name" />
            <CustomTextField type="text" label="Number Plate" />
            <CustomTextField type="number" label="Price" />
            <CustomTextField type="text" label="Destination" />
            <CustomTextField type="date" label="Booking Date" />
            <CustomTextField type="Date" label="Return Date" />
          </div>
          <div className='flex justify-center'>
            <div className='px-1'>
              <button className='bg-primary text-[#33bbcf] py-2 px-5 mt-5 rounded-md w-full uppercase'>Book User</button>
            </div>
            <div className='px-1'>
              <button className='bg-primary text-[#33bbcf] py-2 px-5 mt-5 rounded-md w-full uppercase'>Reset Form</button>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default CreateBooking
