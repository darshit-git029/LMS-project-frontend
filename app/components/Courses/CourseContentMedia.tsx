/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react'
import CoursePlayer from '../Admin/Courses/CoursePlayer'
import { style } from '@/app/style'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai'
import Image from 'next/image'
import { useAddAnswerInQuestionMutation, useAddNewQuestionMutation, useAddReplyInReviewMutation, useAddReviewInCourseMutation, useGetAllCourseQuery, useGetAllCourseUsersQuery, useGetAlluserCourseQuery, useGetCourseContentDataQuery } from '@/redux/features/courses/courseApi'
import toast from 'react-hot-toast'
import { format } from 'timeago.js'
import { BiMessage } from 'react-icons/bi'
import { VscVerifiedFilled } from 'react-icons/vsc'
import Ratings from '@/app/utils/Ratings'

type Props = {
    data: any
    id: string
    activeVideo: number
    setActiveVideo: (activeVideo: number) => void
    user: any
    refetch: any
}

const CourseContentMedia: FC<Props> = ({ data, id, activeVideo, setActiveVideo, user, refetch }) => {

    const [activeBar, setActiveBar] = useState(0)
    const [question, setQuestions] = useState("")
    const [answer, setAnswer] = useState("")
    const [questionId, setQuestionId] = useState("")
    const [rating, setRating] = useState(0)
    const [reviewId, setReviewId] = useState("")
    const [review,setReview] = useState("")
    const [reply,setReply] = useState("")
    const [isReviewReply, setIsReviewReply] = useState(false);

    const [addNewQuestion, { isSuccess, error, isLoading: answerCreationLoading }] = useAddNewQuestionMutation({})

    const handleQuestion = (e: any) => {
        e.preventDefault()
        if (question.length === 0) {
            toast.error("Question can't be emapty")
        } else {

            addNewQuestion({ question, courseId: id, contentId: data?.[activeVideo]?._id })
        }
    }

    const [addAnswerInQuestion, { isSuccess: Answersuccess, error: answerEror }] = useAddAnswerInQuestionMutation({})
    const handleAnswerSubmit = () => {
        addAnswerInQuestion({
            answer,
            courseId: id,
            contentId: data?.[activeVideo]?._id,
            questionId: questionId,
        });
    };
    const { data: courseData , refetch:courseRefetch} = useGetAllCourseUsersQuery(
        id,
        { refetchOnMountOrArgChange: true }
      );
    const [addReviewInCourse, { isSuccess: reviewSuccess, error: reviewError }] = useAddReviewInCourseMutation({})

    const handleReviewSubmit = async () => {
        if (review.length === 0) {
            toast.error("Review can't be empty");
        } else {
            addReviewInCourse({ review, rating, courseId: id });
        }
    };
    const course = courseData?.course
    const isReviewExist = course?.reviews?.find(
      (item: any) => item.user._id === user?._id
    );
    console.log(course);
    
    const handleReviewReplySubmit = () => {
        if (!replyCreationLoading) {
          if (reply === "") {
            toast.error("Reply can't be empty");
          } else {
            addReplyInReview({ comment: reply, courseId: id, reviewId });
          }
        }
      };

    const [
        addReplyInReview,
        {
          isSuccess: replySuccess,
          error: replyError,
          isLoading:replyCreationLoading
        },
      ] = useAddReplyInReviewMutation({});
    
      
      useEffect(() => {
        if (replySuccess) {
            setReply("");
            refetch();
          }
          if (replyError) {
            if ("data" in replyError) {
              const errorMessage = error as any;
              toast.error(errorMessage.data.message);
            }
          }
      },[replySuccess, replyError, error,refetch])

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

    }, [isSuccess, error, refetch])

    useEffect(() => {
        if (Answersuccess) {
            refetch()
            setAnswer("")
            toast.success("Answer Added successfully")
        } if (answerEror) {
            if ("data" in answerEror) {
                const errordata = error as any
                toast.error(errordata.data.message)
            }
        }
    }, [Answersuccess, answerEror, refetch, error])

    useEffect(() => {
        if (reviewSuccess) {
            
            courseRefetch()
            toast.success("Review Added successfully")
        } if (reviewError) {
            if ("data" in reviewError) {
                console.log(error);

            }
        }
    }, [reviewSuccess, reviewError, error])



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
                            isReviewExist && (
                                <><br />
                                    <div className="w-full flex">

                                        <Image
                                            src={
                                                user.avatar
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
                                            onClick={handleReviewSubmit}
                                        >
                                            Submit
                                        </div>
                                    </div>
                                    <br />
                                </>
                            )
                        }
                        <br />
                        <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
                        <div className="w-full">
                            {(course.reviews && [...course.reviews].reverse())?.map(
                                (item: any, index: number) => {
                                    return (
                                        <div className="w-full my-5 dark:text-white text-black" key={index}>
                                            <div className="w-full flex">
                                                <div>
                                                    <Image
                                                        src={
                                                            item?.user.avatar
                                                                ? item?.user.avatar.url
                                                                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                                        }
                                                        width={50}
                                                        height={50}
                                                        alt=""
                                                        className="w-[50px] h-[50px] rounded-full object-cover"
                                                    />
                                                </div>
                                                <div className="ml-2">
                                                    <h1 className="text-[18px]">{item.user.name || "user"}</h1>
                                                    <Ratings rating={item.rating} />
                                                    <p>{item.comment}</p>
                                                    <small className="text-[#0000009e] dark:text-[#ffffff83]">
                                                        {format(item.createdAt)} •
                                                    </small>
                                                </div>
                                            </div>
                                            {user.role === "admin" &&  (
                                                <span
                                                    className={`${style.label} !ml-10 cursor-pointer`}
                                                    onClick={() => {
                                                        setIsReviewReply(true);
                                                        setReviewId(item?._id);
                                                    }}
                                                >
                                                    Add Reply
                                                </span>
                                            )}

                                            {isReviewReply && (
                                                <div className="w-full flex relative">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your reply..."
                                                        value={reply}
                                                        onChange={(e: any) => setReply(e.target.value)}
                                                        className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#000] dark:border-[#fff] p-[5px] w-[95%]"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="absolute right-0 bottom-1"
                                                        onClick={handleReviewReplySubmit}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            )}

                                            { item.commentReplies &&  item?.commentReplies.map((i: any, index: number) => (
                                                <div className="w-full flex 800px:ml-16 my-5" key={index}>
                                                    <div className="w-[50px] h-[50px]">
                                                        <Image
                                                            src={
                                                                i.user.avatar
                                                                    ? i.user.avatar.url
                                                                    : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                                            }
                                                            width={50}
                                                            height={50}
                                                            alt=""
                                                            className="w-[50px] h-[50px] rounded-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="pl-2">
                                                        <div className="flex items-center">
                                                            <h5 className="text-[20px]">{i.user.name}</h5>{" "}
                                                            <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                                                        </div>
                                                        <p>{i.comment}</p>
                                                        <small className="text-[#ffffff83]">
                                                            {format(i.createdAt)} •
                                                        </small>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }
                            )}
                        </div>
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
    handleAnswerSubmit,
    questionId,
    setQuestionId,
    answerCreationLoading,
}: any) => {
    return (
        <>
            <div className="w-full my-3">
                {data?.[activeVideo]?.questions.map((item: any, index: any) => (
                    <CommentItem
                        key={index}
                        data={data}
                        activeVideo={activeVideo}
                        item={item}
                        index={index}
                        answer={answer}
                        setAnswer={setAnswer}
                        questionId={questionId}
                        setQuestionId={setQuestionId}
                        handleAnswerSubmit={handleAnswerSubmit}
                        answerCreationLoading={answerCreationLoading}
                    />
                ))}
            </div>
        </>
    );
};

const CommentItem = ({
    questionId,
    setQuestionId,
    item,
    answer,
    setAnswer,
    handleAnswerSubmit,
    answerCreationLoading,
}: any) => {
    const [replyActive, setreplyActive] = useState(false);
    return (
        <>
            <div className="my-4">
                <div className="flex mb-2">
                    <div>
                        <Image
                            src={
                                item.user.avatar
                                    ? item.user.avatar.url
                                    : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                    </div>
                    <div className="pl-3 dark:text-white text-black">
                        <h5 className="text-[20px]">{item?.user.name}</h5>
                        <p>{item?.question}</p>
                        <small className="text-[#000000b8] dark:text-[#ffffff83]">
                            {/* {format(item?.time?.createdAt)} • */}
                        </small>
                    </div>
                </div>
                <div className="w-full flex">
                    <span
                        className="800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2"
                        onClick={() => {
                            setreplyActive(!replyActive)
                            setQuestionId(item._id);
                        }}
                    >
                        {!replyActive
                            ? item.questionReplies.length !== 0
                                ? "All Replies"
                                : "Add Reply"
                            : "Hide Replies"}
                    </span>
                    <BiMessage
                        size={20}
                        className="dark:text-[#ffffff83] cursor-pointer text-[#000000b8]"
                    />
                    <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]">
                        {item.questionReplies.length}
                    </span>
                </div>

                {replyActive && questionId === item._id && (

                    <>
                        {item.questionReplies.map((item: any) => (
                            <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white" key={item._id}>
                                <div>
                                    <Image
                                        src={
                                            item.user.avatar
                                                ? item.user.avatar.url
                                                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                        }
                                        width={50}
                                        height={50}
                                        alt=""
                                        className="w-[50px] h-[50px] rounded-full object-cover"
                                    />
                                </div>
                                <div className="pl-3">
                                    <div className="flex items-center">
                                        <h5 className="text-[20px]">{item.user.name}</h5>{" "}
                                        {item.user.role === "admin" && (
                                            <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                                        )}
                                    </div>
                                    <p>{item.answer || "new Answer"}</p>
                                    <small className="text-[#ffffff83]">
                                        {/* {format(item.questions?.createdAt)} • */}
                                    </small>
                                </div>
                            </div>
                        ))}
                        <>
                            <div className="w-full flex relative dark:text-white text-black">
                                <input
                                    type="text"
                                    placeholder="Enter your answer..."
                                    value={answer}
                                    onChange={(e: any) => setAnswer(e.target.value)}
                                    className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:text-white text-black dark:border-[#fff] p-[5px] w-[95%] ${answer === "" ||
                                        (answerCreationLoading && "cursor-not-allowed")
                                        }`}
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 bottom-1"
                                    onClick={handleAnswerSubmit}
                                    disabled={answer === "" || answerCreationLoading}
                                >
                                    Submit
                                </button>
                            </div>
                            <br />
                        </>
                    </>
                )}
            </div>
        </>
    );
}

export default CourseContentMedia

