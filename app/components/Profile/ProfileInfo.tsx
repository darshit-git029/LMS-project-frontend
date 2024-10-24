'use client'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import avatarDefault from "../../../assect/Dumy-profile.jpeg"
import { AiOutlineCamera } from 'react-icons/ai'
import { style } from '@/app/style'
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userAPI'
import { useLoaduserQuery } from '@/redux/features/apiSlice'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
type Props = {
    avatar: string | null
    user: any
    refetch:any
}

const ProfileInfo: FC<Props> = ({ user, avatar ,refetch}) => {

    const [name, setName] = useState(user && user.name)
    const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation()
    const [editProfile,{isSuccess:success,error:errors}] = useEditProfileMutation()
    const [loaduser , setLoaduser] = useState(false)
    const {} = useLoaduserQuery(undefined,{skip:loaduser ? false : true})
    const {data} = useSession()

    const imageHandler = (e: any) => {
        const fileReader = new FileReader()
        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                const avatar = fileReader.result    
                updateAvatar(
                    avatar
                )
            }
        }
        fileReader.readAsDataURL(e.target.files[0])
    };

    useEffect(() => {
        if(isSuccess || success){
            toast.success("Profile updated Successfully")
            refetch()
            setLoaduser(true)
        }if(error || errors){
            toast.error("could not update profile picture")
        }
    },[isSuccess,error,success,errors,refetch])

    const handelSubmit =  async (e:any) => {
        e.preventDefault()
        if(name !== ""){
           await editProfile({
                name:name,

            })
        }

    }

    return (
        <>
            <div className='w-full flex justify-center'>
                <div className="relative z-[1]">
                    <Image
            src={user.avatar || avatar ? user.avatar.url : avatarDefault}
            width={120}
                        height={120}
                        alt=""
                        className="w-[100px]  h-[100px] cursor-pointer border border-[#37a39a] rounded-full"
                    >
                    </Image>
                    <input
                        type='file'
                        name=''
                        id='avatar'
                        className='hidden'
                        onChange={imageHandler}
                        accept='image/png image/jpg image/jpeg image/webp'
                    >
                    </input>
                    <label htmlFor='avatar'>
                        <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                            <AiOutlineCamera size={20} className='z-[0]' />
                        </div>
                    </label>
                </div>
            </div>
            <br />
            <br />
            <div className="w-full pl-6 800px:pl-10">
                <form onSubmit={handelSubmit}>
                    <div className="800px:w-[50%] m-auto block pb-4"  >
                        <div className="w-[100%]">
                            <label className='block pb-2 text-black dark:text-white'>Full Name</label>
                            <input
                                type='text'
                                className={`${style.input} !w-[95%] mb-4 800px:mb-0`}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="w-[100%]">
                            <label className='block pt-5 pb-2 text-black dark:text-white'>Email</label>
                            <input
                                type='text'
                                className={`${style.input} !w-[95%] mb-4 800px:mb-0`}
                                readOnly
                                value={user?.email}
                            />
                        </div>
                        <div className="text-center">
                            <input
                                className={` w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer hover:text-white hover:bg-slate-900`}
                                required
                                value="update"
                                type='submit'
                            />
                        </div>
                    </div>
                </form>
            </div>

        </>

    )
}

export default ProfileInfo