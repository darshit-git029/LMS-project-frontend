/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React,{FC,useState} from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Hero";

interface Props{}

const Page : FC<Props> = (Props) => {

  const [open,setOpen] = useState(false)
  const [activeItem,setActveitem] = useState(0)
  const [Route,setRoute] = useState("Login")
  return (
    <div className="">
        <Heading
          title="E-learing"
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
        <Hero/>
    </div>
  )
}

export default Page