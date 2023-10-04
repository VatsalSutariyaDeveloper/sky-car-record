import React from 'react'
import { error404 } from '../assets'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div>
      <section className='bg-primary h-screen grid place-items-center'>
        <div>
          <img src={error404} alt="" className='h-[30rem]' />
        </div>
        <div className='items-center mb-96'>
          <Link to="/">
            <button className='text-gradient border border-gray-300 py-3 px-12 rounded-2xl'>Go Back</button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Error404
