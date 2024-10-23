/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useGetHeroDataQuery } from '@/redux/Layout/layoutApi';
import React, { useEffect, useState } from 'react'
import Loader from '../Loaders/Loader';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { style } from '@/app/style';

type Props = {}

const Faq = (props: Props) => {

    enum LayoutType {
        FAQ = "FAQ"
    }

    const { data, isLoading } = useGetHeroDataQuery(LayoutType.FAQ, { refetchOnMountOrArgChange: true })
    const [activeQuestion, setActiveQuestion] = useState(null)
    const [questions, setQuestion] = useState<any[]>([])

    useEffect(() => {
        if (data) {
            setQuestion(data?.getLayout[0].faq)
        }
    }, [data])
    console.log(data);

    const toggleQuestion = (id: any) => {
        setActiveQuestion(activeQuestion === id ? null : id)
    }


    return (
        <div>
            <>
                {
                    isLoading ? (
                        <Loader />
                    ) : (
                        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
                            <h1 className={`${style.title} 800px:text-[40px]`}>Ferquently Asked <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">Question</span> </h1>
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
                                                     <dd className="mt-2 pr-12">
                                                    <p className='text-base font-Poppins dark:text-white text-black'>Q. {q.question}</p>
                                                    
                                                </dd>

                                                    <span className="ml-6 flex-shrink-0">
                                                        {activeQuestion === q._id ? (
                                                            <HiMinus className="h-6 w-6" />
                                                        ) : (
                                                            <HiPlus className="h-6 w-6" />
                                                        )}
                                                    </span>
                                                </button>
                                            </dt>
                                            {activeQuestion === q._id && (
                                                <dd className="mt-4 pr-12">
                                                    <p className='text-base font-Poppins dark:text-white text-black'>ANS: {q.answer}</p>
                                                    
                                                </dd>
                                            )}            
                                        </div>
                                    ))}
                                </dl>
                                <br />
                                <br />
                            </div>


                        </div>
                    )
                }
            </>
        </div>
    )
}

export default Faq