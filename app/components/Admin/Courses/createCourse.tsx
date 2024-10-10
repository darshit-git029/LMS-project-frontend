/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOption'
import CourseData from './CourseData'
import CourseContentData from './CourseContentData'


type Props = {}

const CreateCourse = (props: Props) => {
    const [active, setActive] = useState(2)
    const [courseinfo, setCourseinfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        thubnail: "",
        tags: "",
        level: "",
        demoUrl: "",
    })
    const [benefits, setBenefits] = useState({ title: "" })
    const [perrequistites, setperrequistites] = useState({ title: "" })
    const [courseContentData, setCourseContentData] = useState({
        vedioUrl: "",
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
    })
    const [courseData, setCourseData] = useState({})

    const handleSubmit = async () => {

    }

    return (
        <div className='min-h-screen flex w-full'>
            <div className="w-[80%]">
                {
                    active === 0 && (
                        <CourseInformation
                            courseinfo={courseinfo}
                            setCourseInfo={setCourseinfo}
                            active={active}
                            setActive={setActive}

                        />
                    )
                }
                {
                    active === 1 && (
                        <CourseData
                        benefit={[benefits]}
                        setBenefit={setBenefits}
                        prerequisites={[perrequistites]}
                        setPrerequisites={setperrequistites}
                        active={active}
                        setActive={setActive}
                        />
                    )
                }
                {
                    active === 2 && (
                        <CourseContentData
                        active={active}
                        setActive={setActive}
                        courseContentData={[courseContentData]}
                        setCourseContentData={setCourseContentData}
                        handleSubmit= {handleSubmit}
                        />
                    )
                }
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    )
}

export default CreateCourse