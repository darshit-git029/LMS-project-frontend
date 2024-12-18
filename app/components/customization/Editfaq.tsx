/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/Layout/layoutApi'
import React, { useEffect, useState } from 'react'
import Loader from '../Loaders/Loader';
import { style } from '@/app/style';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import toast from 'react-hot-toast';

type Props = {}

function Editfaq({ }: Props) {
    enum LayoutType {
        FAQ = 'FAQ',

    }
    const { data, isLoading, refetch } = useGetHeroDataQuery(LayoutType.FAQ, { refetchOnMountOrArgChange: true })


    const [editLayout, { isSuccess, error }] = useEditLayoutMutation()
    const [questions, setQuestion] = useState<any[]>([])

    useEffect(() => {
        if (data) {
            setQuestion(data.getLayout[0].faq)
        }
        if (isSuccess) {
            refetch()
            toast.success("Question updated successfully")
        }
        if (error) {
            if ("data" in error) {
                const errordata = error as any
                toast.error(errordata.data.message)
            }
        }
    }, [data, isSuccess, error, refetch])



    const toggleQuestion = (id: any) => {
        setQuestion((prevQuestion) =>
            prevQuestion.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
        )
    }

    const handleQuestionChange = (id: any, value: string) => {
        setQuestion((prevQuestion) =>
            prevQuestion.map((q) => (q._id === id ? { ...q, question: value } : q))
        )
    }


    const handleAnswerChange = (id: any, value: string) => {
        setQuestion((prevQuestion) =>
            prevQuestion.map((q) => (q._id === id ? { ...q, answer: value } : q))
        )
    }

    const newFaqHandler = () => {
        setQuestion([
            ...questions, { question: "", answer: "" }
        ])
    }

    const areQuestionsUnchanged = (originalQuestion: any[], newQuestion: any[]) => {
        return JSON.stringify(originalQuestion) === JSON.stringify(newQuestion)
    }

    const isAnyQuestionEmpty = (questions: any[]) => {
        return questions.some((q) => q.question === "" || q.answer === "")
    }

    const handleEdit = async (e: any) => {
        if (!areQuestionsUnchanged(data.getLayout[0].faq, questions) && !isAnyQuestionEmpty(questions)) {

            try {
                await editLayout({
                    type: LayoutType.FAQ,
                    faq: questions
                });
            } catch (error) {
                toast.error("Error updating the hero section");
            }
        }
    }

    return (
        <div>
            <>
                {
                    isLoading ? (
                        <Loader />
                    ) : (
                        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
                            <div className="mt-12">
                                <dl className="space-y-8">
                                    {questions?.map((q: any) => (
                                        <div
                                            key={q._id}
                                            className={`${q._id !== questions[0]?._id && "border-t"
                                                } border-gray-200 pt-6`}
                                        >
                                            <dt className="text-lg">
                                                <button
                                                    className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                                                    onClick={() => toggleQuestion(q._id)}
                                                >
                                                    <input
                                                        className={`${style.input} border-none`}
                                                        value={q.question}
                                                        onChange={(e: any) =>
                                                            handleQuestionChange(q._id, e.target.value)
                                                        }
                                                        placeholder={"Add your question..."}
                                                    />

                                                    <span className="ml-6 flex-shrink-0">
                                                        {q.active ? (
                                                            <HiMinus className="h-6 w-6" />
                                                        ) : (
                                                            <HiPlus className="h-6 w-6" />
                                                        )}
                                                    </span>
                                                </button>
                                            </dt>
                                            {q.active && (
                                                <dd className="mt-2 pr-12">
                                                    <input
                                                        className={`${style.input} border-none`}
                                                        value={q.answer}
                                                        onChange={(e: any) =>
                                                            handleAnswerChange(q._id, e.target.value)
                                                        }
                                                        placeholder={"Add your answer..."}
                                                    />
                                                    <span className="ml-6 flex-shrink-0">
                                                        <AiOutlineDelete
                                                            className="dark:text-white text-black text-[18px] cursor-pointer"
                                                            onClick={() => {
                                                                setQuestion((prevQuestions) =>
                                                                    prevQuestions.filter((item) => item._id !== q._id)
                                                                );
                                                            }}
                                                        />
                                                    </span>
                                                </dd>
                                            )}
                                        </div>
                                    ))}
                                </dl>
                                <br />
                                <br />
                                <IoMdAddCircleOutline
                                    className="dark:text-white text-black text-[25px] cursor-pointer"
                                    onClick={newFaqHandler}
                                />
                            </div>

                            <div
                                className={`${style.button
                                    } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
              ${areQuestionsUnchanged(data.getLayout?.faq, questions) ||
                                        isAnyQuestionEmpty(questions)
                                        ? "!cursor-not-allowed"
                                        : "!cursor-pointer !bg-[#42d383]"
                                    }
              !rounded fixed bottom-12 right-12`}
                                onClick={
                                    areQuestionsUnchanged(data.getLayout?.faq, questions) ||
                                        isAnyQuestionEmpty(questions)
                                        ? () => null
                                        : handleEdit
                                }
                            >
                                Save
                            </div>
                        </div>
                    )
                }
            </>
        </div>
    )
}

export default Editfaq