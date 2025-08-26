/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react';
import Adminsidebar from "../../../components/Admin/Sidebar/Adminsidebar"
import Heading from '@/app/utils/Heading'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import EditCourse from '@/app/components/Admin/Courses/EditCourse'

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <div>
      <Heading
        title={`E-Learning - Admin`}
        description="E-learning is a platform for students to learn and get help from teachers"
        keyWord="Programming,MERN,Database"
      />
      <div className="flex h-max-screen">
        <div className="1500px:w-[16%] w-1/5">
          <Adminsidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
