import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HiOutlineMinusSm } from "react-icons/hi";
import { FaRupeeSign } from "react-icons/fa";
import { ImTree } from "react-icons/im";
import { LuPlus } from "react-icons/lu";
import { PiVideo } from "react-icons/pi";
import toast from 'react-hot-toast';
import Loader from '../Utilities/Loader';
import { url } from '../Utilities/serverUrl';
import { useSelector } from 'react-redux';
const Courses = () => {
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem("user"));
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const [course, setCourse] = useState({})
    const date = new Date(course?.createdAt).toLocaleDateString()
    const [showDetails, setShowDetails] = useState([]);
    const totalSections = course?.section?.reduce((acc, section) => {
        if (section?.subSection) {
            return acc + section?.subSection?.length;
        } else {
            return acc;
        }
    }, 0);
    const toggleDetails = (index) => {
        const updatedShowDetails = [...showDetails];
        updatedShowDetails[index] = !updatedShowDetails[index];
        setShowDetails(updatedShowDetails);
    };
    const getCourseDetails = async () => {
        setLoading(true)
        try {

            const { data } = await axios.get(`${url}/course/course/${id}`)
            setCourse(data?.course)
            console.log('data', data)
        } catch (error) {
            console.log('error', error)
            toast.error(error?.response?.data?.message)

        }
        setLoading(false)
    }
    const changeRoute = () => {
        navigate(`/course/section/${id}`)
    }
    const handleEnroll = async () => {
        if (!user) {
            toast.error("you have not logged in yet")
            return
        }
        setLoading(true)
        try {
            const { data } = await axios.put(`${url}/course/enroll`, {
                userId: user?._id,
                courseId: course?._id
            })
            console.log('data', data)
            if (data.success) {
                toast.success(data?.message)
                setCourse(data?.updateCourse
                )
            }
        } catch (error) {
            console.log('error', error)
            toast.error(error?.response?.data?.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        getCourseDetails()
    }, [id])

    if (loading) {
        return <Loader />
    }

    return (
        <div className='w-full flex flex-col md:flex-row h-full md:h-screen overflow-y-scroll md:pb-10'>
            <div className='md:w-[60%] w-full flex justify-between  md:pl-16 p-4   pt-10 flex-col  md:overflow-y-scroll h-fit  md:h-[90%]'>
                <div className=' w-[90%] h-[30%] md:h-[50%]  flex flex-col gap-4 '>

                    <span className=' text-xl md:text-[50px] font-bold'>{course?.name}</span>
                    <span className=' text-sm md:text-xl font-semibold'>{course?.descrption}</span>
                    <span>created At : {date}</span>
                </div>
                <div className=' flex gap-2 w-full flex-col h-[70%]  md:justify-start justify-end md:h-[50%] cursor-pointer   '>
                    <div className=' flex justify-between border border-gray-900 p-2'>
                        <span className=' text-sm md:text-[18px] font-bold'>Curriculum for this course :</span>
                        <span className=' text-sm md:text-base'>{totalSections} Lessons</span>
                    </div>
                    {
                        course?.section?.map((sub, index) => (
                            <div className=' flex flex-col gap-2' key={index}>
                                <div className='flex justify-between border font-bold border-gray-900 p-2 shadow-md' onClick={() => toggleDetails(index)}>
                                    <span className=' flex gap-1 text-sm md:text-[18px] items-center'> {!showDetails[index] ? <LuPlus /> : <HiOutlineMinusSm />} {sub?.sectionName
                                    }</span>
                                    <span className=' text-sm md:text-base'>{sub?.subSection?.length} Lessons</span>
                                </div>
                                <div className={showDetails[index] ? ' flex flex-col gap-2' : 'hidden'}>
                                    {
                                        sub?.subSection?.map((item, index) => (
                                            <div className='flex justify-between border  text-sm text-cyan-600 font-semibold border-gray-900 p-2 shadow-md'>
                                                <span className='text-sm md:text-[17px] flex items-center gap-1'><PiVideo /> {item?.title}</span>
                                                <span className=' text-sm md:text-base'>{item?.timeDuration
                                                }</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))

                    }
                </div>
            </div>
            <div className=' md:w-[40%] w-full h-full pt-10 md:pt-0 md:h-[70%] flex justify-center '>
                <div
                    className={` w-[90%] md:w-[60%]   rounded-[10px] overflow-hidden shadow-xl border border-gray-300 md:m-4 border-1    text-black   duration-300 `}
                >
                    <div
                        className={`transform ${""
                            } h-[80%] transition-transform duration-300 ease-in-out`}
                    >
                        <img className="w-full h-[60%] object-cover" draggable='false' src={course?.thumbnail} alt="Thumbnail" />
                        <div className="px-6 pt-4">
                            <div className="font-bold text-xl mb-2">{course?.type}</div>
                            <p className="text-xs mb-2">
                                {course?.descrption}
                            </p>
                            <div className=" flex pb-6 justify-between py-2 px-4 border-t border-gray-400">
                                <span className=" flex gap-1 items-center font-bold"><FaRupeeSign />{course?.price}</span>
                                <span className=" flex items-center gap-2 font-bold"> <ImTree /> {course?.section?.length}  Sections</span>
                            </div>
                            {course?.user?.some(us => user?._id === us?.user) ?
                                <button onClick={changeRoute} className=' p-4 w-full bg-purple-600 text-lg font-bold text-white capitalize rounded-md'>start learning</button>
                                : <button onClick={handleEnroll} className=' p-4 w-full bg-purple-600 text-lg font-bold text-white capitalize rounded-md'>enroll</button>}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Courses
