import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HiOutlineMinusSm } from "react-icons/hi";

import { LuPlus } from "react-icons/lu";
import { PiVideo } from "react-icons/pi";
import Loader from '../Utilities/Loader';
const SectionVideo = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [course, setCourse] = useState({})
    const [video, setVideo] = useState(null)
    const [showDetails, setShowDetails] = useState([]);
    const [loading, setLoading] = useState(false)
    const totalSections = course?.section?.reduce((acc, section) => {
        if (section?.subSection) {
            return acc + section?.subSection?.length;
        } else {
            return acc;
        }
    }, 0);
    const getCourseDetails = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`http://localhost:8080/course/course/${id}`)
            setCourse(data?.course)
        } catch (error) {
            console.log('error', error)
        }
        setLoading(false)
    }

    const toggleDetails = (index) => {
        const updatedShowDetails = [...showDetails];
        updatedShowDetails[index] = !updatedShowDetails[index];
        setShowDetails(updatedShowDetails);
    };
    useEffect(() => {
        getCourseDetails()
    }, [id])



    if (loading) {
        return <Loader />
    }

    return (
        <div className='w-full h-screen flex'>
            <div className=' w-[60%] h-full flex justify-center '>
                <iframe className='video'
                    title='Youtube player'
                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                    src={`https://youtube.com/embed/${(video?.videoUrl?.split('/').pop().split('?')[0])}?autoplay=0`}
                    width="920"
                    allowfullscreen
                    height="500">
                </iframe>
            </div>
            <div className=' w-[40%] h-full p-6 '>
                <div className=' flex gap-2 w-full flex-col h-full   '>
                    <div className=' flex justify-between border-[1px] border-gray-500 p-2'>
                        <span className=' text-xl font-bold'>Curriculum for this course :</span>
                        <span>{totalSections} Lessons</span>
                    </div>
                    {
                        course?.section?.map((sub, index) => (
                            <div className=' flex flex-col gap-2 cursor-pointer' key={index}>
                                <div className='flex justify-between border-[1px] font-bold border-gray-400 p-2 shadow-md' onClick={() => toggleDetails(index)}>
                                    <span className=' flex gap-1 items-center'> {!showDetails[index] ? <LuPlus /> : <HiOutlineMinusSm />} {sub?.sectionName
                                    }</span>
                                    <span>{sub?.subSection?.length} Lessons</span>
                                </div>
                                <div className={showDetails[index] ? 'section-content open flex flex-col gap-2 transition-all ' : ' transition-all section-content flex flex-col gap-2 '}>
                                    {
                                        sub?.subSection?.map((item, index) => (
                                            <div onClick={() => { setVideo(item) }} className='flex justify-between border-[1px] text-sm text-cyan-600 font-semibold border-gray-100 p-2 shadow-md'>
                                                <span className=' flex items-center gap-1'><PiVideo /> {item?.title}</span>
                                                <span>{item?.timeDuration
                                                }</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))

                    }
                    <button onClick={() => { navigate(`/course/section/quiz/${id}`) }} className=' flex justify-center w-40 border-[1px] border-gray-500 p-2'>
                        <span className=' text-xl font-bold'>start Quiz</span>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default SectionVideo
