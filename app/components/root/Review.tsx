import { style } from '@/app/style';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ReviewCard from '../Reviews/ReviewCard';
import { useGetAlluserCourseQuery } from '@/redux/features/courses/courseApi';
import Loader from '../Loaders/Loader';

type Props = {};

const Review = (props: Props) => {
    const { data, isLoading } = useGetAlluserCourseQuery({});
    const [course, setCourses] = useState<any[]>([]);
    console.log(data);
    
    useEffect(() => {
        if (data?.course) {
            setCourses(data.course);
        }
    }, [data]);
    
    if (isLoading) {
        <Loader/>
    }

    return (
        <div className='w-[90%] 800px:w-[85%] m-auto '>
            <div className="w-full 800px:flex items-center">
                <div className="w-full 800px:w-[50%]">
                    <Image
                        src={require("../../../assect/banner-img-1.png")}
                        alt="Business"
                        width={800}
                        height={800}
                    />
                </div>
                <div className="w-full 800px:w-[50%]">
                    <h1 className='text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white text-black 800px:leading-[60px]'>
                        Our Students Are <span className='text-gradient'>Our Strength</span><br />
                        See What They Say About Us
                    </h1>
                    <br />
                    <p className={style.label}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus sequi quod enim accusamus est suscipit minus asperiores quibusdam corporis magnam!
                    </p>
                </div>
            </div>
            <br /><br />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px] mb-12 border-0">
                {course.map((course, index) => (
                    <ReviewCard item={course} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Review;
