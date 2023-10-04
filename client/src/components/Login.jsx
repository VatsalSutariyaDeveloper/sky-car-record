import React, { useState } from 'react';
import styles from '../style';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/auth/login", formData);
            console.log("Login successful:", response);
            navigate('/');
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <section className={`bg-primary ${styles.flexStart}`}>
            <form onSubmit={handleSubmit}>
                <div className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
                    <div className="md:w-1/3 md:-mt-[10px] max-w-sm -mt-36 lg:-mt-0">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            alt="Sample image" className='animate-login-image login-image' />
                    </div>
                    <div className="md:w-1/3 max-w-sm">
                        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder="User Name" name="userName" value={formData.userName} onChange={handleChange} />
                        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                        <div className="mt-4 flex justify-between font-semibold text-sm">
                            <label className="flex text-white hover:text-slate-600 cursor-pointer">
                                <input className="mr-1" type="checkbox" />
                                <span>Remember Me</span>
                            </label>
                            <a className="text-white hover:text-gray-200 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
                        </div>
                        <div className="text-center md:text-left">
                            <button className={`mt-4 lg:ml-[70px] md:ml-[60px] w-[150px] px-4 py-2 text-black font-bold uppercase rounded text-xs tracking-wider${styles.flexCenter} bg-blue-gradient`} type="submit">Login</button>
                        </div>

                        <div className="mt-4 lg:ml-[50px] md:ml-[45px] font-semibold text-sm text-slate-500 text-center md:text-left">
                            Add a new Member? <a className="text-red-600 hover:underline hover:underline-offset-4" href="#">Let's Add</a>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default Login;
