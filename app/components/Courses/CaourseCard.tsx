"use cilent"
import Ratings from '@/app/utils/Ratings'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useEffect } from 'react'
import { AiOutlineOrderedList } from 'react-icons/ai'

type Props = {
    item: any
    isProfile: boolean
    refetch?: any
}

const CourseCard: FC<Props> = ({ isProfile, item, refetch }) => {
    useEffect(() => {
        if (item) {

        }
    }, [item, refetch])
    return (
        <>
            <Link href={!isProfile ? `course/${item._id}` : `course-access/${item._id}`}>
                <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
                    <Image src={item?.thubnail?.url} width={500} height={500} objectFit="content" className="rounded w-full" alt="" />
                    <br />
                    <h1 className="font-poppins text-[16px] dark:text-white text-black">
                        {item?.name}
                    </h1>
                    <div className="w-full flex items-center justify-between pt-2">
                        <Ratings rating={item?.rating} />
                        <h5 className={`text-black dark:text-white ${isProfile && "hidden 800px:inline"}`}>
                            {item?.purchased} student
                        </h5>
                    </div>
                    <div className="w-full flex items-center justify-between pt-2">
                        <div className="flex">

                            <h3 className='text-lg dark:text-white text-black'>{item?.price} $</h3>
                            <h5 className='pl-3 text-[14px] mt-[-5px] line-through opacity-80 dark:text-white text-black'>{item?.estimatedPrice} $</h5>
                        </div>
                        <div className="flex">
                            <AiOutlineOrderedList size={20} className='dark:text-white text-black' />
                            <h5 className='pl-2 text-black dark:text-white'>{item?.courseData?.length} Lecture</h5>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default CourseCard