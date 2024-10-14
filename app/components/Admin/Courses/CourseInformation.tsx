/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { style } from '@/app/style'
import { useGetHeroDataQuery } from '@/redux/Layout/layoutApi'
import React, { FC, useEffect, useState } from 'react'
import { MdTurnRight } from 'react-icons/md'

type Props = {
    courseInfo: any
    setCourseInfo: (courseInfo: any) => void
    active: number
    setActive: (active: number) => void
}

enum LayoutType {
    CATEGORIES = "Categories"
}

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {

    const [drageing, setDraging] = useState(false)

    const { data } = useGetHeroDataQuery(LayoutType.CATEGORIES,{});

    const [category,setCategory] = useState([])

    useEffect(() => {
        if(data){
            setCategory(data?.getLayout[0].category)
        }
    },[data])
    console.log(data);
    
    const handleSubmit = (e: any) => {
        e.preventDefault()
        setActive(active + 1)
    }

    const handelFileChange = (e: any) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                e.prevenetDefault()
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thubnail: reader.result })
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const draggingOver = (e: any) => {
        e.preventDefault()
        setDraging(true)
    }
    const draggingLeave = (e: any) => {
        e.preventDefault()
        setDraging(false)
    }
    const handelDrop = (e: any) => {
        e.preventDefault()
        setDraging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                setCourseInfo({ ...courseInfo, thubnail: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }


    return (
        <div className=' w-[80%] m-auto mt-24'>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <label htmlFor='' className={`${style.label}`}>
                        Course Name
                    </label>
                    <input
                        type='text'
                        name=''
                        required
                        value={courseInfo.name}
                        onChange={(e) =>
                            setCourseInfo({ ...courseInfo, name: e.target.value })
                        }
                        id='name'
                        placeholder='MERN stack LMS platfrom with next 14'
                        className={`${style.input}`}
                    >
                    </input>
                </div><br />
                <div className="mb-5">
                    <label htmlFor='' className={`${style.label}`}>
                        Course Description
                    </label>
                    <textarea cols={20} rows={8}
                        name=''
                        required
                        value={courseInfo.description}
                        onChange={(e) =>
                            setCourseInfo({ ...courseInfo, description: e.target.value })
                        }
                        id=''
                        placeholder='type your course description here'
                        className={`${style.input} !h-min !py-2`}
                    >
                    </textarea>
                </div>
                <br />
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label htmlFor='' className={`${style.label}`}>
                            Course Price
                        </label>
                        <input
                            type='number'
                            name=''
                            required
                            value={courseInfo.price}
                            onChange={(e) =>
                                setCourseInfo({ ...courseInfo, price: e.target.value })
                            }
                            id='price'
                            placeholder="00"
                            className={`${style.input}`}
                        >
                        </input>
                    </div>
                    <div className="w-[45%]">
                        <label htmlFor='' className={`${style.label}`}>
                            Estimate Price (optional)
                        </label>
                        <input
                            type='number'
                            name=''
                            required
                            value={courseInfo.estimatedPrice}
                            onChange={(e) =>
                                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
                            }
                            id='estimatedPrice'
                            placeholder="00"
                            className={`${style.input}`}
                        >
                        </input>
                    </div>
                </div>
                <br />
                <div className="w-full flex justify-between">
                <div className="w-[45%]">
                    <label htmlFor='' className={`${style.label}`}>
                        Course Tags
                    </label>
                    <input
                        type='text'
                        name=''
                        required
                        value={courseInfo.tags}
                        onChange={(e) =>
                            setCourseInfo({ ...courseInfo, tags: e.target.value })
                        }
                        id='tags'
                        placeholder="type your course tags here"
                        className={`${style.input}`}
                    >
                    </input>
                </div>
                    <div className="w-[45%]">
                        <label htmlFor='' className={`${style.label}`}>
                            Course Categories
                        </label>
                        <select name="" id="" value={courseInfo.category}  className={`${style.input} dark:text-white text-black dark:bg-black bg-white` } onChange={(e) => setCourseInfo({...courseInfo, category:e.target.value})}>
                            <option value="">Select category</option>
                            {
                               category.map((item:any) => (
                                    <option value={item.title} key={item._id}>{item.title}</option>
                               ))
                            }
                        </select>
                    </div>
                </div>
                
                <br />
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label htmlFor='' className={`${style.label}`}>
                            Course Level
                        </label>
                        <input
                            type='text'
                            name=''
                            required
                            value={courseInfo.level}
                            onChange={(e) =>
                                setCourseInfo({ ...courseInfo, level: e.target.value })
                            }
                            id='level'
                            placeholder="type your course level EX:Begginer,Intermediat,Experience"
                            className={`${style.input}`}
                        >
                        </input>
                    </div>
                    <div className="w-[45%]">
                        <label htmlFor='' className={`${style.label}`}>
                            Demo Url
                        </label>
                        <input
                            type='text'
                            name=''
                            required
                            value={courseInfo.demoUrl}
                            onChange={(e) =>
                                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                            }
                            id='demoUrl'
                            placeholder="type your demo vedio url"
                            className={`${style.input}`}
                        >
                        </input>
                    </div>
                </div>
                <br />
                <input
                    type='file'
                    accept='image/*'
                    onChange={handelFileChange}
                    className='hidden'
                    id='file'
                ></input>
                <label htmlFor="file"
                    className={`w-full min-h-[10vh] border dark:border-white border-[#00000026] p-3 flex items-center justify-center cursor-pointer ${drageing ? "bg-blue-500" : "bg-transparent"}`}
                    onDragOver={draggingOver}
                    onDragLeave={draggingLeave}
                    onDrop={handelDrop}
                >
                    {
                        courseInfo.thubnail ? (
                            <img src={courseInfo.thubnail} alt="" className='max-h-[50vh] w-full object-cover' />
                        ) : (
                            <span className='text-black dark:text-white'>
                                Drag and drop your thubnail here or click to browse
                            </span>
                        )
                    }
                </label>
                <br />
                <div className="w-full flex items-center justify-end">
                    <input
                        type="submit"
                        value="Next"
                        className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                        
                        />
                </div>
                <br />
                <br />
            </form>
        </div>
    )
}

export default CourseInformation