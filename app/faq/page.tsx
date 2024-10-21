"use client"
import React, { useState } from 'react'
import Header from '../components/Header'
import { Route } from 'next'
import About from '../components/About'
import Footer from '../Footer/Footer'
import Heading from '../utils/Heading'
import Faq from '../components/FAQ/Faq'

type Props = {}

const page = (props: Props) => {

    const [open, setOpen] = useState(false)
    const [activeItem, setActveitem] = useState(4)  
    const [Route, setRoute] = useState("Login")

    return (
        <div>
            <Heading
                title="FAQ E-learing"
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
            <Faq/>
            <Footer />
        </div>
    )
}

export default page