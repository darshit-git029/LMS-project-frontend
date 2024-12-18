/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client"
import React, { useState } from 'react'
import Header from '../components/Header'
import { Route } from 'next'
import Footer from '../Footer/Footer'
import Heading from '../utils/Heading'
import Policy from '../components/Policy'

type Props = {}

const page = (props: Props) => {

    const [open, setOpen] = useState(false)
    const [activeItem, setActveitem] = useState(3)
    const [Route, setRoute] = useState("Login")

    return (
        <div>
            <Heading
                title="Policy E-Learning"
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
            <Policy />
            <Footer />
        </div>
    )
}

export default page