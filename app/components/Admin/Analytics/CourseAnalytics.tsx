/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, Label, YAxis, LabelList } from "recharts"
import Loader from '../../Loaders/Loader'
import {useGetCourseAnalyticsQuery } from '@/redux/features/Analytics/analyticsApi'
import { style } from '@/app/style'


type Props = {}

const CourseAnalytics = (props: Props) => {

    const { data, isLoading, error } = useGetCourseAnalyticsQuery({})


    const analyticsData:any = []

    data && data.course.last12Months.forEach((item:any) => {
        analyticsData.push({name:item.month,uv:item.count})
    })

    const minvalue = 0

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className="h-screen">
                        <div className="mt-[50px]">
                            <h1 className={`${style.title} px-5 !text-start`}>Course Analytics</h1>
                            <p className={`${style.label} px-5 `}> Last 12 months analytics data</p>
                        </div>
                        <div className="w-full h-[90%] flex items-center jutify-center">
                            <ResponsiveContainer width="90%" height="90%">
                                <BarChart width={150} height={300} data={analyticsData}>
                                    <XAxis dataKey="name">
                                        <Label offset={0} position="insideBottom" />
                                    </XAxis>
                                    <YAxis domain={[minvalue, "auto"]} />
                                    <Bar dataKey="uv" fill='#37a88a'>
                                        <LabelList dataKey="uv" position="top" />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                )
            }
        </>
    )
}

export default CourseAnalytics