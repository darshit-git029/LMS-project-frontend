/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'
import Adminsidebar from "../../../components/Admin/Sidebar/Adminsidebar"
import Heading from '@/app/utils/Heading'
import CreateCourse from "../../../components/Admin/Courses/createCourse"
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import EditCourse from '@/app/components/Admin/Courses/EditCourse'


type Props = {}

const page = ({params}:any) => {

  const id = params?.id
  

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
                    <DashboardHeader notifications={[]}/>
                    <EditCourse id={id}/>
                    </div>
                </div>    
    </div>
  )
}

export default page