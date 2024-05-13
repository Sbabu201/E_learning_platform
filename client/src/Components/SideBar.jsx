import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
export default function SideBar({ open, handleClose }) {
    const navigate = useNavigate()
    const [index, setIndex] = React.useState(false)
    const courses = useSelector(state => state?.course?.courses)
    const user = JSON.parse(localStorage.getItem("user"))


    return (
        <div>
            <React.Fragment >

                <SwipeableDrawer

                    open={open}
                    onClose={() => { handleClose() }}

                >
                    <div className=' w-60  flex flex-col gap-4'>
                        <span className=' p-2 w-full h-fit flex  gap-2 items-center '> hello {user?.name} </span>
                        <span className=' px-2 w-full h-fit flex  gap-2 justify-between items-center '> view Profile<IoLogOut /> </span>
                        <span onClick={() => { setIndex(state => !state) }} className='px-2  flex justify-between w-full h-fit '>Courses {!index ? <FaAngleRight /> : <FaAngleDown />} </span>
                    </div>


                    <div className={`w-60 h-full ${index ? "flex" : 'hidden'} transition-all mt-4 ease-in-out duration-500 flex-col gap-4`}>
                        {
                            courses?.map((item, index) => (
                                <span onClick={() => { handleClose(); navigate(`/courses/${item?._id}`) }} key={index} className=' px-4 flex items-center justify-between text-xs  w-full '> {item?.name} <FaAngleRight /> </span>
                            ))
                        }
                    </div>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}
