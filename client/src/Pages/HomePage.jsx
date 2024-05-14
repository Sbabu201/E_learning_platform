import React from 'react'
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"
import Banner from "../assets/banner.mp4"
import ExploreCourse from './ExploreCourse'
import Loader from "../Utilities/Loader"
import { useSelector } from 'react-redux'
// import CourseCard from '../cards/CourseCard'
const HomePage = () => {
    const status = useSelector(state => state?.course?.status)
if(status === "loading"){
    return <Loader/>
}

    return (
        <div className=' flex flex-col gap-4 items-center pb-20 scroll-smooth  mt-2 w-full h-full overflow-y-scroll '>


            {/* Heading */}
            <div className="text-center text-4xl  font-semibold">
                Empower Your Future with
                <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                    {" "}
                    {"Coding Skills"}
                </span>
            </div>

            {/* Sub Heading */}
            <div className="mt-3 w-[90%]  text-center text-lg font-bold text-richblack-300">
                With our online coding courses, you can learn at your own pace, from
                anywhere in the world, and get access to a wealth of resources,
                including hands-on projects, quizzes, and personalized feedback from
                instructors.
            </div>

            {/* CTA Buttons */}
            <div className="mx-3 my-7 w-[70%] shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                <video
                    className="shadow-[20px_20px_rgba(255,255,255)]"
                    muted
                    loop
                    autoPlay
                >
                    <source src={Banner} type="video/mp4" />
                </video>
            </div>
            {/* <CourseCard /> */}
            <ExploreCourse />
        </div>
    )
}

export default HomePage
