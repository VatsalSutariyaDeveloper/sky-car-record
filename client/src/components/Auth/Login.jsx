import React, { useState } from 'react';
import styles from '../../style';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { openeye, closeeye, loginimage } from '../../assets';

const Login = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${window.react_app_url}auth/login`, formData, { withCredentials: true });
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
            }
            else {
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
                navigate('/');
            }
        } catch (error) {
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
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
                        <div className="md:w-1/3 md:-mt-[10px] max-w-sm -mt-36 lg:-mt-0">
                            <img
                                src="https://etimg.etb2bimg.com/photo/97338754.cms"
                                alt="Sample image"
                                className='animate-login-image login-image'
                            />
                        </div>
                        <div className="">
                            <input
                                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                                type="text"
                                placeholder="User Name"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                            />
                            <div className="relative">
                                <input
                                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    className="absolute right-2 top-[26px]"
                                    type="button"
                                    onClick={handleTogglePassword}
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
                            <div className='flex flex-col'>
                                <div className="mt-4 justify-between font-semibold text-sm">
                                    <label className="text-white hover:text-slate-600 cursor-pointer">
                                        <input
                                            className="mr-1"
                                            type="checkbox"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span>Remember Me</span>
                                    </label>
                                </div>
                            </div>
                            <div className="text-center md:text-left">
                                <button className={`mt-4 md:ml-[70px] md:w-60 w-[150px] px-4 py-2 font-bold uppercase rounded text-xs tracking-wider${styles.flexCenter} bg-blue-gradient`} type="submit">Login</button>
                            </div>
                            <div className="mt-4 md:ml-[135px] font-semibold text-sm text-slate-500 text-center md:text-left">
                                <Link to={`/forgot-password`} className="text-white hover:text-gray-200 hover:underline hover:underline-offset-4">Forgot Password?</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;
