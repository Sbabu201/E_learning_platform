import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CourseCard from '../cards/CourseCard'
import { useNavigate, useParams } from 'react-router-dom'
import CertificateCard from '../cards/CertificateCard'
import { url } from '../Utilities/serverUrl'

const ProfilePage = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(0)
    const [details, setDetails] = useState({})
    const items = ["Lernings", "UserDetails", "Certificates"]
    console.log('details', details)
    const handleOpen = (index) => {
        navigate(`/profile/${index}`)
    }

    const getCourseDetails = async () => {
        setLoading(true)
        try {

            const { data } = await axios.get(`${url}/user/userdetails/${user?._id}`)
            // setCourse(data?.course)
            setDetails(data?.info)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        setLoading(false)
    }



    useEffect(() => {
        if (id) {
            setOpen(Number(id))
        }
    }, [id])

    useEffect(() => {
        getCourseDetails()
    }, [user?._id])
    return (
        <div className='w-full h-screen overflow-y-scroll '>
            <div className=' bg-cyan-500 w-full h-40 flex items-center justify-center'>
                <span className=' font-bold text-xl md:text-4xl text-white'>{details?.name}</span>
            </div>
            <div className=' flex w-full  mt-5 md:mt-20 text-black justify-center gap-4'>
                {
                    items.map((item, index) => (
                        <button onClick={() => { handleOpen(index) }} className={ ` px-2 md:px-6 py-2 border ${open === index ? "bg-cyan-600 text-white" : ""} hover:scale-105 duration-500 ease-in-out border-gray-900 text-xs md:text-base font-semibold`}>{item}</button>

                    ))
                }

            </div>
            {details?.course?.length > 0 ? <div className={` ${open === 0 ? "flex" : "hidden"}  my-10 mb-20 px-4 flex-wrap w-[90%] gap-2  justify-center`}>
                {
                    details?.course?.map((item, index) => (
                        <CourseCard course={item?.course} />
                    ))
                }
            </div> : <span>no courses are there</span>}
            {<div className={` ${open === 1 ? "flex" : "hidden"}   w-full  justify-center`}>
                <div className=' w-full md:w-[50%] flex justify-center flex-col md:flex-row mt-10 border-[1px] h-80 border-gray-900'>
                    <div className=' w-full md:w-[40%] h-[50%] md:h-full flex justify-center items-center '>
                        <div className=' w-32 h-32 md:w-40 md:h-40 border-2 flex justify-center items-center border-black rounded-full '>
                            <span className=' text-[80px]'>ss</span>
                        </div>
                    </div>
                    <div className=' w-[60%] text-xs md:text-xl h-[50%] md:h-full  flex gap-5 '>
                        <div className='   flex flex-col gap-2 h-80 mt-10 '>
                            <span>name :</span>
                            <span>Email :</span>
                            <span>Total Courses : </span>
                        </div>
                        <div className='   flex flex-col gap-2  h-80 mt-10'>
                            <span>{details?.name}</span>
                            <span>{details?.email}</span>
                            <span>{details?.course?.length}</span>
                        </div>
                    </div>

                </div>
            </div>}
            {<div className={` ${open === 2 ? "flex" : "hidden"}  flex-wrap mt-10 w-[90%]  mb-20 px-4 gap-2 justify-center`}>
                {
                    details?.course?.map((item) => {

                        if (item?.isQualified) {
                            return <CertificateCard course={item?.course} mark={item?.mark} />
                        }
                    })
                }
            </div>}
        </div>
    )
}

export default ProfilePage
