'use client'
import React, { FC, useState } from 'react'
import Heading from '../utils/Heading'
import Protected from '../../hooks/useProtected'
import Header from '../components/Header'
import Profile from '../components/Profile/Profile'
import { useSelector } from 'react-redux'
import Footer from '../Footer/Footer'

type Props = {}


const page: FC<Props> = (Props) => {

  const [open, setOpen] = useState(false)
  const [activeItem, setActveitem] = useState(5)
  const [Route, setRoute] = useState("Login")
  const { user } = useSelector((state: any) => state.auth)

  return (

    <div className="">
      <Protected>
        <Heading
          title={`${user?.name}-Profile`}
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
        <Profile user={user} />
        <Footer />
      </Protected>
    </div>
  )
}
export default page