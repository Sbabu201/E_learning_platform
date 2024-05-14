import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AdminCourseCard from './AdminCourseCard'
import CreateCourse from "../Components/CreateCourse"
import AdminCreateCourse from './AdminCreateCourse'
import AdminCreateSection from './AdminCreateSection'
import AdminCreateQuiz from './AdminCreateQuiz'
import Loader from '../Utilities/Loader'
import toast from 'react-hot-toast'
const AdminDashboard = () => {
    const [courseOpen, setCourseOpen] = useState(false)
    const user=JSON.parse(localStorage.getItem("user"))
    const navigate=useNavigate()
    const {id} =useParams()
    const courses = useSelector(state => state?.course?.courses)
    const status = useSelector(state => state?.course?.status)
    const sidebarItems= ["All courses","Create  course"," Add Section" ,"Add  Quiz" ]
    const [open,setOpen]=useState(0)
    const handleOpen=(index)=>{
       
        {navigate(`/admindashboard/${index}`)}
    }
    useEffect(()=>{
setOpen(id)
    },[id])
    useEffect(()=>{
if(!user?.isAdmin){
  toast.error("you are not an admin")
  navigate("/")
}
    },[user])
  return (
    <div className='w-full h-full flex flex-col   md:flex-row'>
                    <CreateCourse visible={courseOpen} onClose={() => { setCourseOpen(false) }} />

     <div className=' w-full flex flex-row md:flex-col md:w-[20%] gap-4 md:p-6 py-4 h-fit  text-xs md:text-base md:h-full '>
   { sidebarItems?.map((item,index)=>(
     <div onClick={() => { handleOpen(index) }} className=' cursor-pointer w-full bg-gradient-to-r from-cyan-300 to-cyan-700 px-4 py-2 rounded-full text-white duration-300 transition-all ease-in-out hover:translate-x-2'>
          {item}
        </div>))}
       
     </div>
   { status === "loading"? <Loader /> :  <div  className={`w-full md:w-[80%] h-[95%] ${open == 0? "flex" :"hidden"}  overflow-y-scroll pb-10 flex-wrap justify-center`}>
    
         {courses?.map((item, index) => {

            return (
                <AdminCourseCard key={index} course={item} />
            )
        })}
    
     </div>}
     <div  className={`w-full md:w-[80%] h-[95%] ${open == 1? "flex" :"hidden"}   items-center  justify-center`}>
    
        
                <AdminCreateCourse />
    
     </div>
     <div  className={`w-full md:w-[80%] h-[95%] ${open == 2? "flex" :"hidden"}   items-center  justify-center`}>
    
        
                <AdminCreateSection courses={courses} />
    
     </div>
     <div  className={`w-full md:w-[80%] h-[95%] ${open == 3? "flex" :"hidden"}   items-center  justify-center`}>
    
        
                <AdminCreateQuiz courses={courses} />
    
     </div>
     
    </div>
  )
}

export default AdminDashboard
