/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react'
import Header from '../components/Header'
import About from '../components/About'
import Footer from '../Footer/Footer'
import Heading from '../utils/Heading'

const Page = () => {
    const [open, setOpen] = useState(false)
    const [activeItem] = useState(2)
    const [route, setRoute] = useState("Login")

    return (
        <div>
            <Heading
                title="about-us E-learning"
                description="E-learning is a platform for students to learn and get help from teachers"
                keyWord="Programming, MERN, Database"
            />
            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                setRoute={setRoute}
                Route={route}
            />
            <About />
            <Footer />
        </div>
    )
}

export default Page
