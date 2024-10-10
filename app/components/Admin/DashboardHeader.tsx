import ThemeSwitcher from '@/app/utils/ThemeSwitcher'
import React, { useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'

type Notification = {
    _id: string
    title: string
    message: string
    createdAt: string
}

type Props = {
    notifications: Notification[]
}

function DashboardHeader({ notifications }: Props) {
    const [open, setOpen] = useState(false)

    const handleNotificationStatusChange = (id: string) => {
        console.log(`Marking notification ${id} as read`)
    }

    return (
        <div className="w-full flex justify-end items-center p-6 fixed top-5 right-0">
            <ThemeSwitcher />
            <div className="relative cursor-pointer m-2" onClick={() => setOpen(!open)}>
                <IoMdNotificationsOutline className="text-2xl cursor-pointer text-black dark:text-white" />
                <span className="absolute -top-2 right-2 rounded-full bg-[#37a39a] w-[18px] h-[18px] text-[12px] flex items-center justify-center text-white">
                   3
                </span>
            </div>
            {open && (
                <div className="w-[350px] h-[60vh] overflow-y-scroll py-3 px-2 border border-[#ffffff0c] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-[1000000000] rounded">
                    <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
                        Notifications
                    </h5>
                    {notifications ? (
                        notifications.map((item: Notification, index: number) => (
                            <div
                                className="dark:bg-[#2d3a4e] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]"
                                key={index}
                            >
                                <div className="w-full flex items-center justify-between p-2">
                                    <p className="text-black dark:text-white">{item.title}</p>
                                    <p
                                        className="text-black dark:text-white cursor-pointer"
                                        onClick={() => handleNotificationStatusChange(item._id)}
                                    >
                                        Mark as read
                                    </p>
                                </div>
                                <p className="px-2 text-black dark:text-white">
                                    {item.message}
                                </p>
                                <p className="p-2 text-black dark:text-white text-[14px]">
                                    {format(new Date(item.createdAt), 'dd MMM yyyy, HH:mm')}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-black dark:text-white">No notifications</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default DashboardHeader
