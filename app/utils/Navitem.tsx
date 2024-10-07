/* eslint-disable react/jsx-key */
import Link from 'next/link'
import React from 'react'

export const navItemData = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Course",
        url: "/course"
    }, {
        name: "About",
        url: "/about"
    }, {
        name: "Policy",
        url: "/policy"
    }, {
        name: "FAQ",
        url: "/faq"
    }
]


type Props = {
    activeItem: number
    isMobile: boolean
}

const Navitem: React.FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className="hidden 800px:flex">
                {
                    navItemData && navItemData.map((i, index) => (
                        <Link href={`${i.url}`} key={index} passHref>
                            <span
                                className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-[18px] px-6 font-Poppins font-[400]`}
                            >{i.name}</span>
                        </Link>
                    ))
                }
            </div>
            {
                isMobile && (
                    <div className="800px:hidden mt-5">
                           <div className=" w-full py-6 text-center">
                            <Link href="/" className='text-[25px] font-Poppins font-[500] text-black dark:text-white'>
                                Elearning
                            </Link>
                        </div>
                            {
                                navItemData && navItemData.map((i, index) => (
                                    <Link href="/" passHref>
                                        <span
                                            className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                                        >
                                            {i.name}
                                        </span>
                                    </Link>
                                ))
                            }
                        </div>
                )
            }

        </>
    )
}

export default Navitem