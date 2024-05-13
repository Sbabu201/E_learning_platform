import React, { useRef } from 'react'
import logo from "../assets/logof.png"
import { MdFileDownload } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CertificatePdf = ({ visible, onClose, user, mark, date, course }) => {
    const componentRef = useRef();

    const handleDownloadPDF = () => {
        html2canvas(componentRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfwidth = pdf.internal.pageSize.getWidth()
            const pdfheight = pdf.internal.pageSize.getHeight()
            const imageWidth = canvas.width
            const imageHeight = canvas.height
            const ratio = Math.min(pdfwidth / imageWidth, pdfheight / imageHeight)
            const imagex = (pdfwidth - imageWidth * ratio) / 2
            const imagey = 30
            pdf.addImage(imgData, 'PNG', imagex, imagey, imageWidth * ratio, imageHeight * ratio); // Adjust dimensions as needed
            pdf.save(`${course?._id}.pdf`);
        });
    };
    const navigate = useNavigate()
    if (!visible) return null;
    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    return (
        <div

            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 flex-col z-10 backdrop-blur-sm flex justify-center items-center"
        >
            <div className=' flex justify-end gap-4 px-10 w-full'>
                <span onClick={handleDownloadPDF} className=' border  cursor-pointer bg-green-200' ><MdFileDownload size={32} className=' text-green-500' /></span>
                <span onClick={() => { onClose() }} className=' border  cursor-pointer bg-red-200'><IoMdCloseCircle className=' text-red-500' size={32} /></span>
            </div>
            <div ref={componentRef} className=' w-full h-[90%] border-4 border-yellow-400 bg-yellow-50'>
                <div className=' pt-10 pb-5 mx-20 flex border-b-2 border-red-900 justify-between items-center'>
                    <span className='pb-10'>certificate id : {course?._id}</span>
                    <span className=' italianno-regular text-[50px] '> Certificate Of Completion</span>
                    <span className=' pb-10'>issued on : {date}</span>
                </div>
                <div className=' pt-4 pb-5 mx-20 flex  justify-center items-center'>
                    <span className=' text-[25px] '>Proudly Awarded To</span>
                </div>
                <div className=' pt-4 pb-5 mx-20 flex  justify-center items-center'>
                    <span className='italianno-regular text-[40px] '> {user?.name} </span>
                </div>
                <div className=' pt-4 pb-5 mx-20 flex  justify-center items-center'>
                    <span className='italianno-regular text-[20px]  '> For Successfully Completing The {course?.name} ,in {date} at hyscalar .co.in
                    </span>
                </div>
                <div className=' pt-4 pb-2 mx-20 flex  justify-center items-center'>
                    <span className='italianno-regular text-[20px] border-b'>Monalisha Panda</span>
                </div>
                <div className=' pt-2 pb-5 mx-20 flex  justify-center items-center'>
                    <span className=' text-[20px] '>HR At Hyscalar</span>
                </div>
                <div className=' pt-4 pb-5 mx-20 flex   justify-between items-center'>
                    <img src={logo} alt="" />
                    <img className=' w-20 h-20' src="https://imgs.search.brave.com/RYaGue90DrpQ0eOhloooYRKGxmS2U3MeGUA5_tEEGbU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9kL2QwL1FS/X2NvZGVfZm9yX21v/YmlsZV9FbmdsaXNo/X1dpa2lwZWRpYS5z/dmcvNjQwcHgtUVJf/Y29kZV9mb3JfbW9i/aWxlX0VuZ2xpc2hf/V2lraXBlZGlhLnN2/Zy5wbmc" alt="" />
                </div>
            </div>
        </div>
    );
};

export default CertificatePdf