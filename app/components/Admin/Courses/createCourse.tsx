/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseData from "./CourseData";
import CourseOptions from "./CourseOption";
import CourseContent from "../Courses/CourseContentData";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "../../../../redux/features/courses/courseApi";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {};

const CreateCourse = (props: Props) => {
    const [createCourse, { isLoading, isSuccess, error }] =
        useCreateCourseMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Course created successfully");
            redirect("/admin/courses");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error]);

    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        category:"",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        categories: "",
        demoUrl: "",
        thubnail: "",
    });
<<<<<<< HEAD
    
=======
>>>>>>> 0d6789fdb81da322022f56d1d51c9e2b3214d47c
    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [perrequistites, setPrerequisites] = useState([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "",
            videoLength: "",
            links: [
                {
                    title: "",
                    url: "",
                },
            ],
            suggestion: "",
        },
    ]);

<<<<<<< HEAD
=======

    const [courseData, setCourseData] = useState({});

>>>>>>> 0d6789fdb81da322022f56d1d51c9e2b3214d47c

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
        const formattedCourseContentData = courseContentData?.map(
            (courseContent) => ({
                videoUrl: courseContent.videoUrl,
                title: courseContent.title,
                description: courseContent.description,
                videoLength: courseContent.videoLength,
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
<<<<<<< HEAD
            category: courseInfo.category,
=======
            categories: courseInfo.categories,
>>>>>>> 0d6789fdb81da322022f56d1d51c9e2b3214d47c
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            thubnail: courseInfo.thubnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            perrequistites: formattedPrerequisites,
            courseData: formattedCourseContentData,
        };
        setCourseData(data);
    };

    const handleCourseCreate = async (e: any) => {
        const data = courseData;
        if (!isLoading) {
            await createCourse(data);
        }
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
                    <CourseContent
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
    );
};

export default CreateCourse;