import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { url } from "../Utilities/serverUrl";
import Loader from "../Utilities/Loader";

const AdminCreateSection = ({ courses }) => {
  const [loading,setLoading]=useState(false)
  const [selectedOption, setSelectedOption] = useState({});
  const [subSec,setSubSec]=useState({
    title:"",
    timeDuration:"",
    description:"",
    videoUrl:""
  })
  const [formData, setFormData] = useState({
    sectionName: "",
    subSection: [],
    courseId:""
  });
 
  const handleSubChange = (e)=>{
    setSubSec(state=>(
        {
            ...state,[e.target.name] : e.target.value
        }
    ))
  }

  const handlePushSub = ()=>{
    setFormData(state=>(
        {
            ...state, subSection: [...state.subSection, subSec]
        }
    ))
    setSubSec({
        title:"",
        timeDuration:"",
        description:"",
        videoUrl:""
      })
      toast.success(`${formData.subSection.length +1 } video added ..`)
  }

  const handleSubmit = async()=>{
    setLoading(true)
try {
    const {data}= await axios.post(`${url}/section/create`,formData)
    toast.success(data?.message)
    if(data?.success){
        
        setFormData({
            sectionName: "",
            subSection: [],
            courseId:""
          })
        setSubSec({
            title:"",
            timeDuration:"",
            description:"",
            videoUrl:""
          })
    }
    console.log('data', data)
} catch (error) {
    console.log('error', error)
    toast.error("something went wrong")
}
setLoading(false)
  }
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setFormData(state=>(
        {
            ...state,courseId:event.target.value
        }
    ))
  };
  if(loading){
    return <Loader />
  }
  return (
    <div className=" w-[90%] h-[90%] md:h-[80%] flex flex-col gap-4 items-center">
      <div className=" md:p-6 text-sm md:text-2xl">Create A section</div>
      <div className=" w-full md:w-[40%] flex justify-between ">
        <label className=" font-italianno  text-sm md:text-xl" htmlFor="dynamic-dropdown">
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
        <label className=" font-italianno  text-sm md:text-xl" htmlFor="dynamic-dropdown">
          Section Name:
        </label>
       <input value={formData?.sectionName} name="sectionName" onChange={(e)=>{setFormData(item=>(
        {
            ...item,[e.target.name]:e.target.value
        }
       ))}} type="text" placeholder="Section Name" className=" outline-none border w-[50%] border-cyan-600" />
      </div>
      <label className=" font-italianno  text-sm md:text-xl" htmlFor="dynamic-dropdown">
         Add Videos
        </label>
     
        
      <div  className=" w-full md:w-[40%] flex text-sm md:text-xl justify-between " >
      <span>Video name</span> <input onChange={(e)=>{handleSubChange(e)}}  value={subSec.title} name="title" className=" outline-none border w-[50%] border-cyan-600" placeholder="Video Title" type="text" />
      </div>
      <div  className=" w-full md:w-[40%] flex justify-between " >
      <span>Video Time </span><input onChange={(e)=>{handleSubChange(e)}} name="timeDuration"  value={subSec.timeDuration} className=" outline-none border w-[50%] border-cyan-600" placeholder="Video Time" type="text" />
      </div>
      <div  className=" w-full md:w-[40%] flex justify-between " >
      <span>Video Description</span><input onChange={(e)=>{handleSubChange(e)}} name="description"  value={subSec.description} className=" outline-none border w-[50%] border-cyan-600" placeholder="Video Description" type="text" />
      </div>
      <div  className=" w-full md:w-[40%] flex justify-between " >
      <span>Video Url</span><input onChange={(e)=>{handleSubChange(e)}} name="videoUrl"  value={subSec.videoUrl} className=" outline-none border w-[50%] border-cyan-600" placeholder="Video Url" type="text" />
      </div>
      <button onClick={handlePushSub} className=" px-6 py-2 bg-cyan-400 text-white rounded-md ">Add Video</button>
        
     
       <button onClick={handleSubmit} className=" px-8 py-2 bg-red-500 text-white rounded-md">Add Section</button>
    </div>
  );
};

export default AdminCreateSection;
