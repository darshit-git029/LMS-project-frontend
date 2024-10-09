import { style } from '@/app/style'
import { useUpdatePasswordMutation } from '@/redux/features/user/userAPI'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaSlack } from 'react-icons/fa'

type Props = {
    user:any
}

const Changepassword = ({}) => {
    const [newPassword,setNewpassword] = useState("")
    const [oldPassword,setOldpassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [updatePassword,{isSuccess,error}] = useUpdatePasswordMutation();
const [password,setPassword] = useState()

const passwordchangehandler = async () => {
    if(newPassword !== confirmPassword){
        toast.error("Password dose not match")
    }else{
        await updatePassword({oldPassword,newPassword})
    }
}

  return (
    <>
        <div className="w-full pl-7 px-2 800px:px-5 800px:pl-8">
            <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2">
            Change Password
            </h1>
        </div>
    <br />
    <br />
    <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={passwordchangehandler}>
            <div className="800px:w-[50%] m-auto block pb-4"  >
                <div className="w-[100%]">
                    <label className='block pb-2'>Enter your old password</label>
                    <input
                        type='password'
                        className={`${style.input} !w-[95%] mb-4 800px:mb-0`}
                        required
                        value={oldPassword}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="w-[100%]">
                    <label className='block pt-5 pb-2'>Enter yor new password</label>
                    <input
                        type='password'
                        className={`${style.input} !w-[95%] mb-4 800px:mb-0`}
                        required
                        value={newPassword}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <div className="w-[100%]">
                    <label className='block pt-5 pb-2'>Enter yor confirm password</label>
                    <input
                        type='text'
                        className={`${style.input} !w-[95%] mb-4 800px:mb-0`}
                        required
                        value={confirmPassword}
                        onChange={(e) => setPassword(e.target.value)}

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

export default Changepassword