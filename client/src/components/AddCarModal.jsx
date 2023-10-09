import React, { useState, useEffect } from 'react';
import { addcar, addcarcolored } from '../assets';
import useLoader from './Hooks/useLoader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCarModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [carName, setCarName] = useState('');
    const [numberPlate, setNumberPlate] = useState('');
    const navigate = useNavigate();

    // const fetchData = () => {
    //     fetch(`${window.react_app_url}car`)
    //         .then((response) => response.json())
    //         .then((data) => console.log(data.data))
    //         .catch((error) => console.error('Error fetching data:', error));
    // }

    // useEffect(() => {
    //     fetchData();
    // }, []);

    const handleCarNameChange = (e) => {
        setCarName(e.target.value);
    };

    const handleNumberPlateChange = (e) => {
        const value = e.target.value.toUpperCase();
        setNumberPlate(value);
    };

    const handleAddCar = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${window.react_app_url}car`, { carName, numberPlate });
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
            // fetchData();
            resetForm();
            navigate('/all-cars');
        } catch (error) {
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
    };

    const resetForm = () => {
        setCarName('');
        setNumberPlate('');
        setShowModal(false);
    };

    return (
        <div>
            <button
                type="button"
                className="text-black bg-[#73cdd7] hover:bg-[#5fbdc7] focus:ring-4 focus:outline-none focus:ring-[#73cdd7] font-medium rounded-lg text-sm px-3 md:mx-2 h-9 text-center mr-3 md:mr-0 dark:bg-[#73cdd7] dark:hover:bg-[#5fbdc7] dark:focus:ring-[#73cdd7]"
                onClick={() => setShowModal(true)}
            >
                <img src={addcar} alt="" className='w-5' />
            </button>
            {showModal && (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl border border-white rounded-lg">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primary outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="flex text-3xl font-semibold text-gradient">
                                        <img src={addcarcolored} alt="" className='w-7' /> &nbsp; Add new car
                                    </h3>
                                </div>
                                {/*body*/}
                                <form onSubmit={handleAddCar}>
                                    <div className="relative p-6 flex-auto">
                                        <input
                                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                                            type="text"
                                            placeholder="Car Name"
                                            value={carName}
                                            onChange={handleCarNameChange}
                                        />
                                        <input
                                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                                            type="text"
                                            placeholder="Number plate"
                                            value={numberPlate}
                                            onChange={handleNumberPlateChange}
                                        />
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="w-[150px] mx-2 px-4 py-2 text-black font-bold uppercase rounded text-xs bg-red-300"
                                            onClick={() => {
                                                setShowModal(false);
                                                resetForm();
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <div className="text-center md:text-left">
                                            <button
                                                className="w-[150px] px-4 py-2 text-black font-bold uppercase rounded text-xs bg-blue-gradient"
                                                type="submit"
                                            >
                                                Add car
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </div>
    );
};

export default AddCarModal;
