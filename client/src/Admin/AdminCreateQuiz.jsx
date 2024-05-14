import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { url } from "../Utilities/serverUrl";
import Loader from "../Utilities/Loader";

const AdminCreateQuiz = ({ courses }) => {
    const arr=[0,1,2,3]
    const [loading,setLoading]=useState(false)
  const [selectedOption, setSelectedOption] = useState({});
  
 
 
  const [formData, setFormData] = useState({
    name: "",
    options: [{ option:""},
    {option:""},
    {option:""},
   { option:""}],
    answer:"",
    course:""
  });
  console.log('formData', formData)
  const handleSubChange = (e, index) => {
    setFormData((state) => {
        let newState= [...state.options]
        newState[index].option=e.target.value

     return {...state,options:newState};
   })
  
  };



  const handleSubmit = async()=>{
    setLoading(true)
try {
    const {data}= await axios.post(`${url}/course/quiz`,formData)
    toast.success(data?.message)
    if(data?.success){
        
        setFormData({
          name: "",
          options: [{ option:""},
          {option:""},
          {option:""},
         { option:""}],
          answer:"",
          course:""
        })
        setSelectedOption({})
    }
    console.log('data', data)
} catch (error) {
    console.log('error', error)
    toast.error(error?.response
?.data?.message    )
}
setLoading(false)
  }
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData(state=>(
        {
            ...state,course:event.target.value
        }
    ))
  };
  if(loading){
    return <Loader />
  }
  return (
    <div className=" w-[90%] h-[95%] md:h-[80%] flex flex-col gap-4 items-center">
      <div className=" md:p-6 text-sm md:text-2xl">Create A Quiz</div>
      <div className=" w-full md:w-[40%] flex justify-between ">
        <label className=" font-italianno  text-xl" htmlFor="dynamic-dropdown">
          Choose a course:
        </label>
        <select
          value={selectedOption}
          className=" border border-cyan-400 outline-none"
          onChange={handleChange}
          id="dynamic-dropdown"
        >
             <option >
              select an option
            </option>
          {courses.map((option, index) => (
            <option key={index} value={option?._id}>
              {option?.name}
            </option>
          ))}
        </select>
      </div>
      <div className=" w-full md:w-[40%] flex justify-between ">
        <label className=" font-italianno  text-xl" htmlFor="dynamic-dropdown">
          Quiz Name:
        </label>
       <input value={formData?.name} name="name" onChange={(e)=>{setFormData(item=>(
        {
            ...item,[e.target.name]:e.target.value
        }
       ))}} type="text" placeholder="Name" className=" outline-none border w-[50%] border-cyan-600" />
      </div>
      <label className=" font-italianno  text-xl" htmlFor="dynamic-dropdown">
         Add Questions
        </label>
     
        
     {arr?.map((item,index)=>(
         <div  className=" w-full md:w-[40%] flex justify-between " >
         <span>Option {index+1} </span> <input onChange={(e)=>{handleSubChange(e ,index)}}  value={formData?.options?.[index]?.option} name="title" className=" outline-none border w-[50%] border-cyan-600" placeholder="Video Title" type="text" />
         </div>
     ))}
 
      <select
          value={formData.answer}
          className=" border border-cyan-400 outline-none"
          onChange={(e)=>{setFormData(state=>({...state,answer:e.target.value}))}}
          id="dynamic-dropdown"
        >
             <option >
              select the answer
            </option>
          {formData?.options?.map((option, index) => (
            <option key={index} value={option?.option}>
              {option?.option}
            </option>
          ))}
        </select>
        
     
       <button onClick={handleSubmit} className=" px-8 py-2 bg-red-500 text-white rounded-md">Add Quiz</button>
    </div>
  );
};

export default AdminCreateQuiz;
