/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOption'
import CourseData from './CourseData'
import CourseContentData from './CourseContentData'
import { title } from 'process'
import { Description } from '@mui/icons-material'
import CoursePreview from './CoursePreview'
import { useCreateCourseMutation } from '@/redux/features/courses/courseApi'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

interface Link {
    title: string;
    url: string;
}

interface CourseContentItem {
    videoUrl: string;
    title: string;
    description: string;
    vedioSection: string;
    links: Link[];
    suggestion: string;
}

interface CourseInfo {
    name: string;
    description: string;
    price: string;
    estimatedPrice: string;
    thubnail: string;
    tags: string;
    level: string;
    demoUrl: string;
}

interface Benefit {
    title: string;
}

interface Prerequisite {
    title: string;
}

const CreateCourse = () => {

    const [createCourse,{isLoading,isSuccess,error}] = useCreateCourseMutation()

    useEffect(() => {
        if(isSuccess){
            toast.success("Course created successfully")
            redirect("/admin/courses")
        }if(error){
            if("data" in error){
                const errordata = error as any
                toast.error(errordata.data.message)
            }
        }
    },[isSuccess,error,isLoading])

    const [active, setActive] = useState<number>(0)
    const [courseinfo, setCourseinfo] = useState<CourseInfo>({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        thubnail: "",
        tags: "",
        level: "",
        demoUrl: "",
    })

    const [benefits, setBenefits] = useState<Benefit[]>([{ title: "" }])
    const [perrequistites, setperrequistites] = useState<Prerequisite[]>([{ title: "" }])
    const [courseContentData, setCourseContentData] = useState<CourseContentItem[]>([
        {
            videoUrl: "",
            title: "",
            description: "",
            vedioSection: "",
            links: [
                {
                    title: "",
                    url: ""
                }
            ],
            suggestion: ""
        }
    ]);

    const [courseData, setCourseData] = useState({})

    const handleSubmit = async () => {
        // formated benefits data
        const formateBenefits = benefits.map((benefits) => ({title:benefits.title}))
        // formated perrequistites
        const formateperrequistites = perrequistites.map((perrequistites) => ({title:perrequistites.title}))
          // formated CourseContent data
        const formatedCourseContent = courseContentData.map((courseContentData) => ({
            videoUrl : courseContentData.videoUrl,
            title:courseContentData.title,
            description:courseContentData.description,
            vedioSection:courseContentData.vedioSection,
            links:courseContentData.links.map((link) => ({
                title:link.title,
                url:link.url
            })),
            suggestion:courseContentData.suggestion
        }))
        // prepare courseInfo data
        const data ={
            name:courseinfo.name,
            description:courseinfo.description,
            tags:courseinfo.tags,
            price:courseinfo.price,
            estimatedPrice:courseinfo.estimatedPrice,
            level:courseinfo.level,
            demoUrl:courseinfo.demoUrl,
            thubnail:courseinfo.thubnail,
            totalVedio:courseContentData.length,
            benefits:formateBenefits,
            perrequistites:formateperrequistites,
            courseContent:formatedCourseContent
        }
        setCourseData(data)
    }

    const handleCourseCreate = async (e:any) => {
        const data = courseData
        if(!isLoading){
            await createCourse(data)
        }
    }

    return (
        <div className='min-h-screen flex w-full'>
            <div className="w-[80%]">
                {active === 0 && (
                    <CourseInformation
                        courseinfo={courseinfo}
                        setCourseInfo={setCourseinfo}
                        active={active}
                        setActive={setActive}
                    />
                )}
                {active === 1 && (
                    <CourseData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        perrequistites={perrequistites}
                        setperrequistites={setperrequistites}
                        active={active}
                        setActive={setActive}
                    />
                )}
                {active === 2 && (
                    <CourseContentData
                        active={active}
                        setActive={setActive}
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        handleSubmit={handleSubmit}
                    />
                )}
                {active === 3 && (
                    <CoursePreview
                        active={active}
                        setActive={setActive}
                        courseData={courseData}
                        handleCourseCreate={handleCourseCreate}
                    />
                )}
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    )
}

export default CreateCourse
