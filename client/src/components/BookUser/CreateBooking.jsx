import React from 'react'
import "../../index.css"
import CustomTextField from './CustomTextField'

const CreateBooking = () => {
  return (
    <>
      <CustomTextField type="email" label="Email" />
      <CustomTextField type="password" label="Password" />
    </>
  )
}

export default CreateBooking
