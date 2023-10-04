import React from 'react'
import { useParams } from "react-router-dom";


const UpdateBooking = () => {

  const { id } = useParams();
  return (
    <div>
      Update User
    </div>
  )
}

export default UpdateBooking
