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
import Loader from "../../Loaders/Loader";

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
        category: "",
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


    const [courseData, setCourseData] = useState({});

    const handleSubmit = async () => {
        const formattedBenefits = benefits.map((benefit) => ({
            title: benefit.title,
        }));
        const formattedPrerequisites = perrequistites.map((perrequistites) => ({
            title: perrequistites.title,
        }));

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

        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            category: courseInfo.category,
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
            courseData: formattedCourseContentData,
        };
        setCourseData(data);
    };

    const handleCourseCreate = async (e: any) => {
        const data = courseData;
        if (isLoading) {
            <Loader />
        } else {
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