import React, { useState } from 'react'
import login from "../assets/login.jpg"
import { url } from '../Utilities/serverUrl'
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
const SignUp = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${url}/user/signup`, formData)
            console.log('data', data)
            if (data.success) {
                toast.success(data?.message)
                navigate("/login")
            }
        } catch (error) {
            console.log('error', error)
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    return (
        <div className='w-full flex h-full '>
            <div className=' w-[50%] flex justify-center items-center h-full '>
                <img src={login} className=' w-[80%] h-[90%] object-cover rounded-sm' alt="" />
            </div>
            <div className=' w-[50%]   flex items-center justify-start h-full '>
                <form onSubmit={handleSubmit} className=' w-[80%] flex flex-col  gap-4 ' action="">
                    <span className='text-3xl font-bold text-black'>Sign Up</span>
                    <span className=' w-[60%]'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam velit, corrupti quae, saepe quo ut quas eligendi fugiat fugit possimus atque voluptatem consequuntur vero quasi iure. Magni odio deserunt in?</span>
                    <label htmlFor="name">First Name</label>
                    <input onChange={handleChange} value={formData?.fname} name='fname' placeholder='First Name' required className=' w-[60%] h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <label htmlFor="Last Name">Last Name</label>
                    <input onChange={handleChange} value={formData?.lname} name='lname' placeholder='Last Name' required className=' w-[60%] h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <label htmlFor="E-mail">E-mail</label>
                    <input onChange={handleChange} value={formData?.email} name='email' placeholder='E-mail' required className=' w-[60%] h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <label htmlFor="password">password</label>
                    <input onChange={handleChange} value={formData?.password} name='password' placeholder='Password' required className=' w-[60%] h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <button type='submit' className=' w-[60%] h-10 bg-blue-500 flex items-center justify-center text-white font-bold outline-none p-4 rounded-md'>create</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
