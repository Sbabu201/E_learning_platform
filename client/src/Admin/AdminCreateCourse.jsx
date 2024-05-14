import React, {  useState } from "react";

import axios from "axios";
import { url } from "../Utilities/serverUrl";
import toast from "react-hot-toast";
import Loader from "../Utilities/Loader";
const AdminCreateCourse = () => {
    const [loading,setLoading]=useState(false)
    const [image, setImage] = useState("");
    console.log('image', image)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    descrption: "",
    thumbnail: "",
    price: "",
    user: [],
    section: [],
  });
  const handleImage = async (e) => {
     setLoading(true)

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "soumya");
    try {
        const resImage = await axios.post("https://api.cloudinary.com/v1_1/dwztqzfeh/image/upload", formData)
        setImage(resImage.data.url);
        setFormData(state=>({
            ...state,
            thumbnail
            : resImage.data.url,
          }));

    } catch (error) {
        console.log('error', error)

    }
    setLoading(false);
}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };




 
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
     const {data}= await axios.post(`${url}/course/create`,formData)   
     console.log('data', data)
     if(data?.success){
        toast.success(data?.message);
        setFormData({
            name: "",
            type: "",
            descrption: "",
            thumbnail: "",
            price: "",
            user: [],
            section: [],
          })
     }
    } catch (error) {
        console.log('error', error)
    }
    setLoading(false)
  };
if(loading){
  return <Loader />
}

  return (
  
     
      <form className=" w-full h-[95%] flex justify-center flex-col items-center bg-white" onSubmit={handleSubmit}>
        <span className=" text-base md:text-4xl pb-10">Create A course </span>
        <div className=" w-[90%] p-4 md:w-[50%] border flex flex-col justify-center items-center gap-4 border-gray-500 h-fit md:h-[60%] ">
          <div className=" flex items-center justify-between gap-4 h-12 w-full md:w-[40%] ">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              className=" h-[80%] outline-none border border-cyan-400"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className=" flex items-center justify-between  gap-4 h-12 w-full md:w-[40%] ">
            <label>Type:</label>
            <input  className=" h-[80%] outline-none border border-cyan-400"
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </div>
          <div className=" flex items-center justify-between gap-4 h-12 w-full md:w-[40%] ">
            <label>Description:</label>
            <textarea
              name="descrption"
              className=" outline-none border border-cyan-400"
              value={formData.descrption}
              onChange={handleChange}
            />
          </div>
          <div className=" flex items-center justify-between gap-4 h-12 w-full md:w-[40%] ">
            <label>Thumbnail:</label>
            <input  
              type="file" name="file" onChange={handleImage} required
              
             
            />
          </div>
          <div className=" flex items-center justify-between gap-4 h-12 w-full md:w-[40%] ">
            <label>Price:</label>
            <input  className=" h-[80%] outline-none border border-cyan-400"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div></div>
          <button disabled={loading} className=" py-2 px-6 text-white rounded-md font-semibold hover:scale-105 duration-500 ease-in-out transition-all bg-cyan-500" type="submit">{loading ?"loading...":"submit"}</button>
        </div>
      </form>
  )
}

export default AdminCreateCourse
