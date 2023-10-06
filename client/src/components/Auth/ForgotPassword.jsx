import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../style';
import { ToastContainer, toast } from 'react-toastify';
import { openeye, closeeye } from '../../assets';
import axios from 'axios';

const ForgotPassword = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handlePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password === confirmPassword) {
                const response = await axios.post("http://localhost:3000/auth/reset-password", {'password':password,'userName':userName});
                if(!response.data.status){
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
                }
                else{
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
                    navigate('/login');
                }
            }
            else {
                toast.error('Passwords do not match.', {
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
        catch (error) {
            toast.error(error, {
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

    return (
        <>
            <section className={`bg-primary ${styles.flexStart}`}>
                <form onSubmit={handleSubmit}>
                    <div className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-4 md:mx-0 md:my-0">
                        <div className="md:w-1/3 md:-mt-[10px] max-w-sm -mt-36 lg:-mt-0">
                            <img
                                src="https://img.freepik.com/free-vector/key-concept-illustration_114360-6305.jpg?w=740&t=st=1696411087~exp=1696411687~hmac=2dacb5f968e3e4d1ab47b52a4e32a2b5fd37133d7197614892945a425b14d9d2"
                                alt="Sample image"
                                className='animate-login-image login-image'
                            />
                        </div>
                        <div className="md:w-1/3 max-w-sm">
                            <div className="w-[300px]">
                                <input
                                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                                    type='text'
                                    placeholder="User Name"
                                    name="userName"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                        <div className="md:w-1/3 max-w-sm">
                            <div className="relative w-[300px]">
                                <input
                                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="absolute right-2 top-[26px]"
                                    type="button"
                                    onClick={handlePassword}
                                >
                                    {showPassword ? (
                                        <img
                                            src={openeye}
                                            alt="Hide Password"
                                        />
                                    ) : (
                                        <img
                                            src={closeeye}
                                            alt="Show Password"
                                        />
                                    )}
                                </button>
                            </div>
                            <div className="relative w-[300px]">
                                <input
                                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    name="confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    className="absolute right-2 top-[26px]"
                                    type="button"
                                    onClick={handleConfirmPassword}
                                >
                                    {showConfirmPassword ? (
                                        <img
                                            src={openeye}
                                            alt="Hide Password"
                                        />
                                    ) : (
                                        <img
                                            src={closeeye}
                                            alt="Show Password"
                                        />
                                    )}
                                </button>
                            </div>
                            <div className="text-center md:text-left">
                                <button className={`mt-4 lg:ml-[70px] md:ml-[60px] w-[150px] px-4 py-2 text-black font-bold uppercase rounded text-xs  bg-blue-gradient`} type="submit">Set Password</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
}

export default ForgotPassword;
