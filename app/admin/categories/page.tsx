'use client'
import React from 'react'
import Heading from '../../utils/Heading'
import Adminsidebar from "../../components/Admin/Sidebar/Adminsidebar"
import AdminProtectd from '@/hooks/adminProtected'
import DashboardHero from '../../components/Admin/DashboardHero'
import Editcategory from '@/app/components/customization/Editcategory'
type Props =
    {}

function page({ }: Props) {
    return (
        <>
            <div>
                <AdminProtectd>
                    <Heading
                        title={`E-Learning - Admin`}
                        description="E-learing is a paltfrom for student to learn and get help form teachers"
                        keyWord="Programming,MERN,Database"
                    />
                    <div className="flex h-[200vh]">
                        <div className="1500px:w-[16%] w-1/5">
                            <Adminsidebar />
                        </div>
                        <div className="w-[85%] ">
                            <DashboardHero />
                            <Editcategory />
                        </div>
                    </div>
                </AdminProtectd>
            </div>
        </>
    )
}

export default page