/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react'
import CoursePlayer from '../Admin/Courses/CoursePlayer'
import { style } from '@/app/style'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai'
import { useGetHeroDataQuery } from '@/redux/Layout/layoutApi'
import { HiMinus, HiPlus } from 'react-icons/hi'
import Image from 'next/image'
import { comment } from 'postcss'
import { ClassNames } from '@emotion/react'
import { useAddNewQuestionMutation } from '@/redux/features/courses/courseApi'
import Loader from '../Loaders/Loader'
import toast from 'react-hot-toast'
import { Key } from '@mui/icons-material'
import { format } from 'timeago.js'

type Props = {
    data: any
    id: string
    activeVideo: number
    setActiveVideo: (activeVideo: number) => void
    user: any
    refetch:any
}

const CourseContentMedia: FC<Props> = ({ data, id, activeVideo, setActiveVideo, user,refetch }) => {

    const [activeBar, setActiveBar] = useState(0)
    const [question, setQuestions] = useState("")
    const [answer, setAnswer] = useState("")
    const [questionId, setQuestionId] = useState("")
    const isReviewExist = data?.reviews?.find((item: any) => item?.user?._id === user._id)
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [addNewQuestion, { isSuccess, error, isLoading: answerCreationLoading }] = useAddNewQuestionMutation({})

    const handleQuestion = (e: any) => {
        e.preventDefault()
        if (question.length === 0) {
            toast.error("Question can't be emapty")
        } else {

            addNewQuestion({ question, courseId: id, contentId: data?.[activeVideo]?._id })
        }
    }

    const handleAnswerSubmit = () => {

    }

    useEffect(() => {
        if (isSuccess) {
            refetch()
            setQuestions("")
            toast.success("Question Posted successfully")
        }
        if (error) {
            if ("data" in error) {
                const errordata = error as any
                toast.error(errordata.data.message)
            }
        }
    }, [isSuccess, error])

    return (
        <>
            <div className='w-[95%] 800px:w-[86%] py-4 m-auto'>
                <CoursePlayer title={data?.[activeVideo]?.title} videoUrl={data?.[activeVideo]?.videoUrl} />
                <div className="w-full flex items-center justify-between mt-10">
                    <div className={`${style.button} !w-[unset] !min-h-[40px] !py-[unset] items-center ${activeVideo === 0 && "!cursor-no-drop opacity-[.8] "} `} onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}>
                        <AiOutlineArrowLeft className='mr-2' />
                        Prew Lesson
                    </div>
                    <div className={`${style.button} !w-[unset] !min-h-[40px] !py-[unset] items-center ${activeVideo === 0 && "!cursor-no-drop opacity-[.8] "} `} onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo + 1)}>
                        <AiOutlineArrowRight className='mr-2' />
                        next Lesson
                    </div>
                </div>
                <br />
                <h1 className='text-[25px] dark:text-white text-black'>{data?.[activeVideo]?.title}</h1>
                <br /><br />
                <div className="w-full flex items-center justify-between p-4  bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner ">
                    {
                        ["Overview", "Resource", "Q&A", "Review"].map((item: any, index: number) => (
                            <h5 key={index} className={`800px:text-[20px] cursor-pointer text-black dark:text-white ${activeBar === index && "text-red-500 dark:text-red-500"}`} onClick={() => setActiveBar(index)}>
                                {item}
                            </h5>
                        ))
                    }
                </div>
                {
                    activeBar === 0 && <div className="w-full">
                        <br />
                        <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                            Course Details
                        </h1>
                        <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                            {data?.[activeVideo]?.description}
                        </p>
                    </div>
                }
                {
                    activeBar === 1 && <div className="w-full">
                        <br />
                        <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                            Course Details
                        </h1>
                        <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                            {data?.[activeVideo]?.description}
                        </p>
                    </div>
                }

                {activeBar === 2 && (
                    <>
                        <div className="flex w-full">
                            <Image
                                src={
                                    user?.avatar
                                        ? user.avatar.url
                                        : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                }
                                width={50}
                                height={50}
                                alt=""
                                className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                            <textarea
                                name=""
                                value={question}
                                onChange={(e) => setQuestions(e.target.value)}
                                id=""
                                cols={40}
                                rows={5}
                                placeholder="Write your question..."
                                className="outline-none bg-transparent ml-3 border dark:text-white text-black border-[#0000001d] dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                            ></textarea>
                        </div>
                        <div className="w-full flex justify-end">
                            <div
                                className={`${style.button
                                    } !w-[120px] !h-[40px] text-[18px] mt-5 `}
                                onClick={answerCreationLoading ? () => { } : handleQuestion}
                            >
                                Submit
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
                        <div>
                            <CommentReply
                                data={data}
                                activeVideo={activeVideo}
                                answer={answer}
                                setAnswer={setAnswer}
                                handleAnswerSubmit={handleAnswerSubmit}
                                user={user}
                                questionId={questionId}
                                setQuestionId={setQuestionId}
                                answerCreationLoading={answerCreationLoading}
                            />
                        </div>
                    </>
                )}

                {
                    activeBar === 3 && <div className="w-full">
                        {
                            !isReviewExist && (
                                <><br />
                                    <div className="w-full flex">

                                        <Image
                                            src={
                                                user?.avatar
                                                    ? user?.avatar.url
                                                    : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                            }
                                            width={50}
                                            height={50}
                                            alt=""
                                            className="w-[50px] h-[50px] rounded-full object-cover"
                                        />
                                        <br />
                                        <div className="w-full">
                                            <h5 className="text-black dark:text-white pl-3 text-[20px] font-[400]">
                                                Give Ratings
                                            </h5>
                                            <div className="w-full flex ml-2 pb-3">
                                                {
                                                    [1, 2, 3, 4, 5].map((i) => rating >= i ?
                                                        (<h5><AiFillStar key={i} onClick={() => setRating(i)} className='cursor-pointer ' color='rgb(246,186,0)' size={25} /></h5>) :
                                                        (<AiOutlineStar key={i} onClick={() => setRating(i)} className='cursor-pointer ' color='rgb(246,186,0)' size={25} />))
                                                }
                                            </div>
                                            <textarea
                                                name=""
                                                value={review}
                                                onChange={(e) => setReview(e.target.value)}
                                                id=""
                                                cols={40}
                                                rows={5}
                                                placeholder="Write your Review..."
                                                className="outline-none bg-transparent ml-3 border dark:text-white text-black border-[#0000001d] dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-end">
                                        <div
                                            className={`${style.button
                                                } !w-[120px] !h-[40px] text-[18px] mt-5 `}
                                        >
                                            Submit
                                        </div>
                                    </div>
                                    <br />
                                </>
                            )
                        }
                    </div>
                }
            </div >

        </>
    )
}

const CommentReply = ({
    data,
    activeVideo,
    answer,
    setAnswer,
    user,
    questionId,
    handleAnswerSubmit,
    answerCreationLoading
}: any) => {
    return (
        <>
            {
                data?.[activeVideo]?.questions.map((item: any, index: number) => {
                    return (
                        <CommentData
                            key={index}
                            data={data}
                            activeVideo={activeVideo}
                            item={item}
                            answer={answer}
                            setAnswer={setAnswer}
                            handleAnswerSubmit={handleAnswerSubmit}
                        />
                    )
                })
            }
        </>
    )
}

const CommentData = ({
    data,
    activeVideo,
    item,
    answer,
    setAnswer,
    handleAnswerSubmit
}: any) => {
    console.log(item);
    
    return (
        <>
            <div className="my-3">
                <div className="flex mb-4">
                    <div className="w-[50px] h-[50px]">
                        <div className="w-[50px] h-[50px] flex items-center justify-between bg-slate-500 rounded-[50px]">
                            <h1 className='dark:text-white text-black pl-3 uppercase text-[18px]'>
                                {item?.user?.name.slice(0,2)}
                            </h1>
                        </div>
                    </div>
                    <div className="pl-3">
                        <h1 className='text-[20px]'>{item?.user?.name|| "user"}</h1>
                        <p>{item.question}</p>
                        <small className='text-[#ffffff83]'>{format(item.createdAt)}</small>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseContentMedia