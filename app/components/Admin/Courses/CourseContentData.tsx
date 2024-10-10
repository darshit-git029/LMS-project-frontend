import toast from 'react-hot-toast'
import { style } from '../../../style'
import React, { FC, useState } from 'react'
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai'
import { BsPencil } from 'react-icons/bs'
import { FaS } from 'react-icons/fa6'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

type Props = {
    active: number
    setActive: (active: number) => void
    courseContentData: any
    setCourseContentData: (courseContentData: any) => void
    handleSubmit: any
}

const CourseContentData: FC<Props> = ({ courseContentData, setCourseContentData, active, setActive, handleSubmit: handleCourseSubmit }) => {

    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    )

    const [activeSection, setActiveSection] = useState(1)
    const handleSubmit = (e: any) => {
        e.preventDefault()

    }

    const handleCollepseToggle = (index: number) => {
        const updateCollepes = [...isCollapsed]
        updateCollepes[index] = !updateCollepes[index]
        setIsCollapsed(updateCollepes)
    }

    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updateData = [...courseContentData]
        updateData[index].links.splice(linkIndex, 1)
        setCourseContentData(updateData)
    }
    const prevButton = () => {
        setActive(active - 1);
    }

    const newcontentHandler = (item:any) => {
        if(item.title === "" || item.description === "" || item.vedioUrl === "" || item.link[0].title === "" || item.link[0].url === ""){
            toast.error("Please fill all the filed")
        }else{
            let newVedioSection = ""
            if(courseContentData > 0){
                const lastVedioSection = courseContentData[courseContentData.length - 1].vedioSection
            }

        }
    }

    return (
        <>
            <div className='w-[80%] m-auto mt-24 p-3'>
                <form onSubmit={handleSubmit}>
                    {
                        courseContentData.map((item: any, index: number) => {
                            const showsectionInput = index === 0 || item.vedioSection != courseContentData[index - 1].vedioSection

                            return (
                                <>
                                    <div className={`w-full bg-[#cdc8c817] p-4 ${showsectionInput ? "mt-10" : "mb-0"}`}>
                                        {
                                            showsectionInput && (
                                                <>
                                                    <div className="w-full flex items-center">
                                                        <input type='text'
                                                            className={`text-[20px] ${item?.vedioSection === "Untitled Section" ? "w-[170px]" : "w-min"} font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline=none`}
                                                            value={item.vedioSection}
                                                            onChange={(e) => {
                                                                e.preventDefault()
                                                                const updateData = [...courseContentData]
                                                                updateData[index].item.vedioSection = e.target.value
                                                                setIsCollapsed(updateData)
                                                            }}
                                                        />
                                                        <BsPencil className='cursor-pointer dark:text-white text-black' />
                                                    </div>
                                                </>
                                            )
                                        }
                                        <div className="flex items-center justify-between my-0">
                                            <div className="">

                                                {
                                                    isCollapsed[index] ? (
                                                        <>
                                                            {item.title ? (
                                                                <p className="font-Poppins text-white dark:text-black">
                                                                    {index + 1}.{item.title}
                                                                </p>
                                                            ) : <></>
                                                            }
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )
                                                }
                                            </div>
                                            <div className="flex items-center">
                                                <AiOutlineDelete className={`dark:text-white text-black text-[20px] mr-2 ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                                                    onClick={() => {
                                                        if (index > 0) {
                                                            const updateData = [...courseContentData]
                                                            updateData.splice(index, 1)
                                                            setCourseContentData(updateData)
                                                        }
                                                    }}
                                                />
                                                <MdOutlineKeyboardArrowDown
                                                    fontSize="large"
                                                    style={{
                                                        transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)",
                                                    }}
                                                    className='text-black dark:text-white'
                                                    onClick={() => handleCollepseToggle(index)}
                                                />
                                            </div>
                                        </div>
                                        {
                                            !isCollapsed[index] && (
                                                <>
                                                    <div className="my-3">
                                                        <label htmlFor="" className={style.label}>Vedio Title</label>
                                                        <input type='text'
                                                            className={style.input}
                                                            placeholder="Project plan.."
                                                            value={item.title}
                                                            onChange={(e) => {
                                                                const updateData = [...courseContentData]
                                                                updateData[index].title = e.target.value
                                                                setCourseContentData(updateData)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="my-3">
                                                        <label htmlFor="" className={style.label}>Vedio Url</label>
                                                        <input type='text'
                                                            className={style.input}
                                                            placeholder="Project url.."
                                                            value={item.vedioUrl}
                                                            onChange={(e) => {
                                                                const updateData = [...courseContentData]
                                                                updateData[index].vedioUrl = e.target.value
                                                                setCourseContentData(updateData)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="my-3">
                                                        <label htmlFor="" className={style.label}>Vedio Description</label>
                                                        <textarea
                                                            rows={8}
                                                            cols={30}
                                                            className={`${style.input} !h-min`}
                                                            placeholder="Project vedio description"
                                                            value={item.description}
                                                            onChange={(e: any) => {
                                                                e.preventDefault()
                                                                const updateData = [...courseContentData]
                                                                updateData[index].description = e.target.value
                                                                setCourseContentData(updateData)
                                                            }}
                                                        />
                                                    </div>


                                                    {
                                                        item?.link ? (
                                                            item?.links.map((link: any, linkIndex: number) => (
                                                                <div className="mb-3" >
                                                                    <div className="w-full flex justify-between">
                                                                        <label className={style.label}>
                                                                            Link {linkIndex + 1}
                                                                        </label>
                                                                        <AiOutlineDelete
                                                                            className={`dark:text-white text-black text-[20px] mt-2 ${linkIndex > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                                                                            onClick={() => {
                                                                                linkIndex === 0 ? null : handleRemoveLink(index, linkIndex)
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <input
                                                                        type='text'
                                                                        placeholder='Source Code (Link Title)'
                                                                        className={style.input}
                                                                        value={link.title}
                                                                        onChange={(e) => {
                                                                            e.preventDefault()
                                                                            const updateData = [...courseContentData];
                                                                            updateData[index].links[linkIndex].links.title = e.target.value;
                                                                            setCourseContentData(updateData);
                                                                        }}
                                                                    />
                                                                    <div className="my-3">
                                                                        <label htmlFor="" className={style.label}>Link Url</label>
                                                                        <input
                                                                            type='text'
                                                                            className={`${style.input}`}
                                                                            placeholder="Source Code Url"
                                                                            value={link.url}
                                                                            onChange={(e) => {
                                                                                e.preventDefault()
                                                                                const updateData = [...courseContentData];
                                                                                updateData[index].links[linkIndex].url = e.target.value;
                                                                                setCourseContentData(updateData);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>No links available</p>
                                                        )
                                                    }


                                                    < div
                                                        className="w-full 800px:w-[180px] flex gap-3 items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                                                        onClick={() => prevButton()}
                                                    >
                                                        Prev
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            index === courseContentData.length - 1 && (
                                                <div>
                                                    <p className='flex items-center gap-3 cursor-pointer text-[18px] text-black dark:text-white mt-6 ' onClick={(e:any) => newcontentHandler(item)}>
                                                        <AiOutlinePlusCircle className=''/>Add New Content``
                                                    </p>
                                                </div>
                                            )
                                        }
                                    </div >
                                </>
                            )
                        })
                    }
                </form>
            </div >
        </>
    )
}

export default CourseContentData