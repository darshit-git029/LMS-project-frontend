"use client"
import { useGetAlluserCourseQuery } from '@/redux/features/courses/courseApi'
import { useGetHeroDataQuery } from '@/redux/Layout/layoutApi'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {}

const page = (props: Props) => {

    enum LAYOUT {
        CATEGORIES = "Categories"
    }

    const searchParams = useSearchParams()
    const search = searchParams?.get("title")
    const {data,isLoading} = useGetAlluserCourseQuery(undefined,{})
    const {data:categoiresData}  = useGetHeroDataQuery(LAYOUT.CATEGORIES,{})
    const [Route,setRoute] = useState("Login")
    const [open,setOpen] = useState("false")
    const [courses,setCourses] = useState([])
    const [category,setCategory] = useState("All")

    useEffect(() => {
        if(category === "All"){
            setCourses(data?.course)
        }if(category !== "All"){
            setCourses(data?.course.filter((item:any) => item.category === category))
        }
        if(search){
            setCourses(data?.course.filter((item:any) => item.name.toLowerCase().included(search.toLowerCase())))
        }
    },[data,search,category])


  return (
    <div>page</div>
  )
}

export default page