import React, { useState } from 'react'
import login from "../assets/login.jpg"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { url } from '../Utilities/serverUrl'
const LoginPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value, // Update the specific property based on the name attribute
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${url}/user/login`, formData)
            if (data?.success) {
                localStorage.setItem("token", data?.accessToken)
                localStorage.setItem("user", JSON.stringify(data?.info))
                toast.success(data?.message)
                navigate("/")
            }
            console.log('data', data)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log('error', error)
        }
    }
    return (
        <div className='w-full flex h-full'>
            <div className=' w-[50%] flex justify-center items-center h-full '>
                <img src={login} className=' w-[80%] h-[90%] object-cover rounded-sm' alt="" />
            </div>
            <div className=' w-[50%] flex items-center justify-start h-full '>
                <form onSubmit={handleSubmit} className=' w-[80%] flex flex-col gap-4 h-[70%] ' action="">
                    <span className='text-3xl font-bold text-black'>Log in</span>
                    <span className=' w-[60%]'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam velit, corrupti quae, saepe quo ut quas eligendi fugiat fugit possimus atque voluptatem consequuntur vero quasi iure. Magni odio deserunt in?</span>
                    <label htmlFor="email">name</label>
                    <input required name='email' value={formData.email} onChange={handleChange} placeholder='email' className=' w-[60%] h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <label htmlFor="name">password</label>
                    <input required name='password' onChange={handleChange} value={formData.password} placeholder='Password' className=' w-[60%] h-10 bg-gray-100 outline-none p-4 rounded-md' type="text" />
                    <button className=' w-[60%] h-10 bg-blue-500 flex items-center justify-center text-white font-bold outline-none p-4 rounded-md'>create</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
