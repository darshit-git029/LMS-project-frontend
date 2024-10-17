import Heading from '@/app/utils/Heading'
import { useGetCourseContentDataQuery } from '@/redux/features/courses/courseApi'
import React, { useState } from 'react'
import CourseContentMedia from './CourseContentMedia'
import CourseContentList from './CourseContentList'

type Props = {
  id: any
  user:any
}

const CourseContent = ({ id,user }: Props) => {

  const { data: contentData, isLoading, error ,refetch} = useGetCourseContentDataQuery(id,{refetchOnMountOrArgChange:true})
  const [activeVideo, setActiveVideo] = useState(0)
  const data = contentData?.content
  console.log("constetn data",data);
  

  return (
    <div className='w-full grid 800px:grid-cols-10'>
      <Heading
        title={data?.[activeVideo]?.title}
        description="E-learing is a paltfrom for student to learn and get help form teachers"
        keyWord={data?.[activeVideo]?.tags}
      />
      <div className="col-span-7">
        <CourseContentMedia data={data} id={id} activeVideo={activeVideo} setActiveVideo={setActiveVideo} user={user} refetch={refetch}/>
      </div>
      <div className="hidden 800px:block 800px:col-span-3">
        <CourseContentList data={data} setActiveVideo={setActiveVideo} activeVideo={activeVideo} />
      </div>
    </div>
  )
}

export default CourseContent