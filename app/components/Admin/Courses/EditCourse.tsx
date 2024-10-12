/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { FC, useEffect, useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOption'
import CourseData from './CourseData'
import CourseContentData from './CourseContentData'
import { title } from 'process'
import { Description } from '@mui/icons-material'
import CoursePreview from './CoursePreview'
import { useEditCourseMutation, useGetAllCourseQuery } from '@/redux/features/courses/courseApi'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

type Props = {
    id: string;
};

const EditCourse: FC<Props> = ({ id }) => {


    const [editCourse, { isSuccess, error }] = useEditCourseMutation();
    const [active, setActive] = useState(0);
    const { data, refetch } = useGetAllCourseQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );

    const editCourseData = data && data.course.find((i: any) => i._id === id);
    console.log(editCourse);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Course Updated successfully");
            redirect("/admin/courses");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error]);



    useEffect(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData.description,
                price: editCourseData.price,
                estimatedPrice: editCourseData?.estimatedPrice,
                tags: editCourseData.tags,
                level: editCourseData.level,
                categories: editCourseData.categories,
                demoUrl: editCourseData.demoUrl,
                thubnail: editCourseData?.thubnail?.url,
            })
            setBenefits(editCourseData.benefits);
            setPrerequisites(editCourseData.perrequistites);
            setCourseContentData(editCourseData.courseData);
        }
    }, [editCourseData]);


    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        categories: "",
        demoUrl: "",
        thubnail: "",
    });
    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [perrequistites, setPrerequisites] = useState([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            links: [
                {
                    title: "",
                    url: "",
                },
            ],
            suggestion: "",
        },
    ]);

    const [courseData, setCourseData] = useState({});

    console.log(courseData);


    const handleSubmit = async () => {
        // Format benefits array
        const formattedBenefits = benefits.map((benefit) => ({
            title: benefit.title,
        }));
        // Format prerequisites array
        const formattedPrerequisites = perrequistites.map((perrequistites) => ({
            title: perrequistites.title,
        }));

        // Format course content array
        const formattedCourseContentData = courseContentData.map(
            (courseContent) => ({
                videoUrl: courseContent.videoUrl,
                title: courseContent.title,
                description: courseContent.description,
                videoSection: courseContent.videoSection,
                links: courseContent.links.map((link) => ({
                    title: link.title,
                    url: link.url,
                })),
                suggestion: courseContent.suggestion,
            })
        );

        //   prepare our data object
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            categories: courseInfo.categories,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            thubnail: courseInfo.thubnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            perrequistites: formattedPrerequisites,
            courseContent: formattedCourseContentData,
        };

        setCourseData(data);
    };


    const handleCourseCreate = async (e: any) => {
        const data = courseData;
        await editCourse({ id: editCourseData?._id, data });
    };

    return (
        <div className="w-full flex min-h-screen">
            <div className="w-[80%]">
                {active === 0 && (
                    <CourseInformation
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                    />
                )}

                {active === 1 && (
                    <CourseData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        perrequistites={perrequistites}
                        setperrequistites={setPrerequisites}
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
                        isEdit={true}
                    />
                )}
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    );
};

export default EditCourse;