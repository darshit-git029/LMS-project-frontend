'use client'
import React from 'react'
import Adminsidebar from "../../components/Admin/Sidebar/Adminsidebar"
import Heading from '@/app/utils/Heading'
import CreateCourse from "../../components/Admin/Courses/createCourse"
import DashboardHeader from '@/app/components/Admin/DashboardHeader'


type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title={`E-Learning - Admin`}
        description="E-learing is a paltfrom for student to learn and get help form teachers"
        keyWord="Programming,MERN,Database"
      />
      <div className="flex h-max-screen">
        <div className="1500px:w-[16%] w-1/5">
          <Adminsidebar />
        </div>
        <div className="w-[85%] ">
          <DashboardHeader />
          <CreateCourse />

        </div>
      </div>
    </div>
  )
}

export default page