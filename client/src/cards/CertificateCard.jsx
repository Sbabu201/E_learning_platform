import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { ImTree } from "react-icons/im";
import { MdDownloadForOffline } from "react-icons/md";
import CertificatePdf from "../Components/CertificatePdf";
const CertificateCard = ({ course, mark }) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [open, setOpen] = useState(false)
    const date = new Date(course?.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
    const navigate = useNavigate()
    const handleClick = (item) => {
        navigate(`/courses/${course?._id}`)
    };



    return (
        <>
            <CertificatePdf visible={open} mark={mark} date={date} onClose={() => { setOpen(false) }} user={user} course={course} />
            <div
                className={`not-selectable w-[340px] relative rounded-[10px] overflow-hidden shadow-xl border border-gray-300 md:m-4 border-1  bg-gray-100  text-black  `}

            >
                <div
                    className={` h-72 `}
                >
                    <img className="w-full h-[60%] hover:scale-105 duration-300 ease-in-out object-cover" draggable='false' src={course?.thumbnail} alt="Thumbnail" />
                    <div className="px-6 pt-4 w-full">
                        <div className="font-bold  mb-2 text-xs md:text-base "> Course Name : <span className=" text-xs md:text-base text-gray-600">{course?.type}</span></div>
                        <div className="font-bold text-xs md:text-sm mb-2"> Certificate Id : <span className=" text-[10px] md:text-sm text-gray-600">{course?._id}</span></div>
                        <div className="font-bold text-xs md:text-base mb-2"> issued On : <span className=" text-xs md:text-base text-gray-600">{date}</span></div>

                    </div>
                </div>
                <div onClick={() => { setOpen(true) }} className=" flex justify-center py-2 px-4 border-t bg-green-200 hover:scale-105 duration-300 ease-in-out hover:bg-green-400 hover:text-white cursor-pointer border-gray-400">
                    <span className=" flex items-center gap-2 text-xs md:text-base font-bold"> <MdDownloadForOffline />  Download</span>
                </div>
            </div>
        </>
    );
};

export default CertificateCard;