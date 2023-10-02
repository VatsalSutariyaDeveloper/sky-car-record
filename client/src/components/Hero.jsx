import React from 'react'
import styles from '../style'
import { date, deletebtn, edit } from '../assets'
import '../index.css'

const Hero = () => {

  return (
    
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <section id='home' className={`md:flex-row flex-col ${styles.paddingY}`}>
          <div className={`${styles.flexCenter} flex-col xl:px-0 sm:px-16`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* start from this div to loop */}
              <div className="flex justify-center items-center px-3 bg-discount-gradient rounded-[10px]">
                <table className="text-gradient">
                  <tbody>
                    <tr>
                      <td className="px-6 py-4 flex">
                        <img src={date} alt="date image" />
                        <span className='font-bold text-lg mx-3 mt-[2px]'>10/10/2023</span>
                      </td>
                      <td>
                        <div className='flex justify-end mr-2'>
                          <img src={edit} alt="edit image" className='w-7 mr-4 cursor-pointer hover:w-8' />
                          <img src={deletebtn} alt="delete image" className='w-7 cursor-pointer hover:w-8' />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 border-b border-gray-300">Car name</td>
                      <td className="px-6 py-4 border-b border-gray-300">Innova</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 border-b border-gray-300">Price</td>
                      <td className="px-6 py-4 border-b border-gray-300">₹ 4000</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 border-b border-gray-300">Number Plate</td>
                      <td className="px-6 py-4 border-b border-gray-300">GJ01HK1212</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 border-b border-gray-300">Client Name</td>
                      <td className="px-6 py-4 border-b border-gray-300">vivek patel</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 border-b border-gray-300">Dealer Name</td>
                      <td className="px-6 py-4 border-b border-gray-300">Vatsal Patel</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 border-b border-gray-300">Destination</td>
                      <td className="px-6 py-4 border-b border-gray-300">Udaipur</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Return Date</td>
                      <td className="px-6 py-4">15/10/2023</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Hero