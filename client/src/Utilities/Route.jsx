import React from 'react'

import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from '../Pages/HomePage'
import LoginPage from '../Pages/LoginPage'
import SignUp from '../Pages/SignUp'
import NavBar from '../Components/NavBar'
import Courses from '../Pages/Courses'
import SectionVideo from '../Pages/SectionVideo'
import ProfilePage from '../Pages/ProfilePage'
import QuizPage from '../Pages/QuizPage'
import CertificatePdf from '../Components/CertificatePdf'

const Route = () => {


    const Layout = () => {
        return (
            <div className='flex flex-col h-screen overflow-hidden justify-evenly'>
                <div className=' w-full md:flex hidden h-[10%] '>
                    <NavBar />
                </div>
                <div className='w-full h-[90%] '>
                    <Outlet />
                </div>



            </div>
        )
    }

    // all routes 

    const BrowserRoute = createBrowserRouter([
        {

            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <HomePage />
                },
                {
                    path: "/certificate",
                    element: <CertificatePdf />
                },
                {
                    path: "/courses/:id",
                    element: <Courses />
                },
                {
                    path: "/course/section/:id/:videoid?",
                    element: <SectionVideo />
                },


                {
                    path: "/login",
                    element: <LoginPage />
                },
                {
                    path: "/Signup",
                    element: <SignUp />
                },
                {
                    path: "/profile/:id?",
                    element: <ProfilePage />
                },
                {
                    path: "/course/section/quiz/:id",
                    element: <QuizPage />
                },
            ]
        }
    ])

    return (
        <RouterProvider router={BrowserRoute} />
    )
}

export default Route
