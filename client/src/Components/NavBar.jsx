import React, { useEffect, useState } from 'react'
import logo from "../assets/logof.png"
import { IoIosSearch } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowRightLong } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from './SideBar';
const NavBar = () => {
    const courses = useSelector(state => state?.course?.courses)
    const [search, setSearch] = useState(null)
    const [searchedCourse, setSearchedCourse] = useState([]);
    const [open, setOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false);
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const [clicked, setClicked] = useState(false);


    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login")
    }
    useEffect(() => {
        setSearchedCourse(
            courses?.filter((item) => (
                item?.name?.toLowerCase()?.includes(search?.toLowerCase())
            ))
        )
    }, [search])

    return (
        <>
            <SideBar open={open} handleClose={() => { setOpen(false) }} />
            <div className=' shadow-md w-full flex gap-2 justify-end md:justify-between items-center '>
                <span className=' md:hidden flex' onClick={() => { setOpen(state => !state) }}><GiHamburgerMenu size={28} /></span>
                <div className=' w-[20%] h-full md:flex hidden items-center justify-center  '>
                    <img onClick={() => { navigate("/") }} src={logo} className='w-40 h-full rounded-md object-cover  cursor-pointer' alt="" />
                </div>
                <div
                    onClick={() => { setIsHovered(state => !state) }}
                    className="relative px-4 py-2 cursor-pointer bg-blue-100 md:block hidden text-sky-700 font-bold rounded-md"
                // Set hover state to false when not hovered
                >
                    Courses
                </div>

                {/* Conditional rendering based on hover state */}
                {isHovered && (
                    <div
                        className="absolute z-10 top-[60px] left-[22%] h-[350px] overflow-y-scroll rounded-md bg-white shadow-lg p-6 flex flex-col gap-4"
                    >
                        {courses?.map((item, index) => (
                            <span onClick={() => { navigate(`/courses/${item?._id}`) }}
                                className="flex gap-2  cursor-pointer hover:text-cyan-500 hover:translate-x-1 duration-300 ease-in-out items-center"
                                key={index}
                            >
                                <FaArrowRightLong className="text-xs" /> {item?.name}
                            </span>
                        ))}
                    </div>
                )}

                <form onSubmit={(e) => { e.preventDefault() }} className='relative w-[30%] md:flex hidden md:w-[20%] bg-blue-200 h-10  items-center p-4 justify-between rounded-md' action="">
                    <input value={search} name='search' onChange={(e) => { setSearch(e.target.name = e.target.value) }}
                        onFocus={() => { setClicked(true) }} placeholder='Search Courses' className="w-[90%] bg-transparent outline-none" type="text" />
                    <button type='submit'><IoIosSearch /></button>
                </form>
                {clicked && search && (
                    <div className="z-10 absolute top-[60px] left-[35%] h-fit overflow-y-scroll rounded-md bg-white shadow-lg p-6 flex flex-col gap-4">
                        {searchedCourse?.map((item, index) => (
                            <span onClick={() => { setClicked(false); navigate(`/courses/${item?._id}`) }}
                                className={`flex gap-2 cursor-pointer hover:text-cyan-500 hover:translate-x-1 duration-300 ease-in-out items-center`}
                                key={index}
                            >
                                <FaArrowRightLong className="text-xs" /> {item?.name}
                            </span>
                        ))}
                    </div>
                )}

                <div className=' w-[50%] md:w-[40%] hidden md:flex  justify-center gap-8'>
                    {<NavLink to={"/login"} className={` ${!token ? "flex  " : "hidden"}   items-center justify-center  w-28 bg-cyan-500 hover:scale-105 capitalize   duration-300 ease-in-out font-bold text-white rounded-md py-2`} type='submit'>log in</NavLink>}
                    {<NavLink to={"/signup"} className={`${!token ? "block " : "hidden"}  px-6 bg-white hover:scale-105 duration-300 capitalize ease-in-out  font-bold text-gray-800 border border-black rounded-md py-2`} type='submit'>sign up</NavLink>}
                    {<NavLink to={`/profile/${0}`} className={` ${token ? "block " : "hidden"}  px-6 bg-white hover:scale-105 duration-300 capitalize ease-in-out  text-xs md:text-base md:font-bold text-gray-800  rounded-md py-2`} type='submit'>My Courses</NavLink>}
                    {<NavLink to={"/profile"} className={` ${token ? "block " : "hidden"}  hover:scale-105 duration-300  ease-in-out`} type='submit'><img src="https://imgs.search.brave.com/MpXwHc3OUm2Z6U4IpSlZYWHSjIjjlpPpCfqrJaRwat0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY29v/bC1hbmltZS1wcm9m/aWxlLXBpY3R1cmUt/Z21wdW9ldnlkam15/eXR4eS5qcGc" className='w-[50px] h-[50px] rounded-full' alt="" /></NavLink>}
                    {<button onClick={handleLogout} className={` ${token ? "block " : "hidden"} flex items-center gap-2 font-bold  hover:scale-105 duration-300  ease-in-out`} type='submit'> Logout <ImExit /></button>}
                </div>

            </div>
        </>
    )
}

export default NavBar
