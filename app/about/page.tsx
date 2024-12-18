"use client"
import React, { useState } from 'react'
import Header from '../components/Header'
import { Route } from 'next'
import About from '../components/About'
import Footer from '../Footer/Footer'
import Heading from '../utils/Heading'

type Props = {
    open: any
    setOpen: (open: any) => void
    activeItem: any
    Route: any
    setRoute: (Route: any) => void
}
const page = (props: Props) => {

    const [open, setOpen] = useState(false)
    const [activeItem, setActveitem] = useState(2)
    const [Route, setRoute] = useState("Login")

    return (
        <>
            <div>
                <Heading
                    title="about-us E-learing"
                    description="E-learing is a paltfrom for student to learn and get help form teachers"
                    keyWord="Programming,MERN,Database"
                />
                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    Route={Route}
                />
                <About />
                <Footer />
            </div>
        </>
    )
}

export default page