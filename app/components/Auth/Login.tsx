/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { style } from '../../style'
import { useLoginMutation } from '@/redux/features/auth/authapi'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { Button } from '@mui/material'
import { LuLoader2 } from 'react-icons/lu'


type Props = {
    setRoute: (Route: string) => void
    setOpen:(open:boolean) => void
}

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email!").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6)
})



const Login: FC<Props> = ({setRoute,setOpen}) => {


    const [show, setShow] = useState(false)
    const [login,{isSuccess,error,isLoading}] = useLoginMutation()

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {  
            await login({email,password})
        }
    })

    useEffect(() => {
        if(isSuccess){
            setOpen(false)
            toast.success("Login Successfully")
        }if(error){
            if("data" in error){
                const errordata = error as any
                toast.error(errordata.data.message)
            }
        }
    },[isSuccess,error,setOpen])


    const { errors, touched, values, handleChange, handleSubmit } = formik

    return (
                
        <div className='w-full p-2'>
            <h1 className={`${style.title}`}>
                Login with Elearning
            </h1>
            <form  onSubmit={handleSubmit}>
                <label className={`${style.label}`} htmlFor="email">
                    Enter your Email
                </label>
                <input
                    type="email"
                    name=""
                    value={values.email}
                    onChange={handleChange}
                    id="email"
                    placeholder="furrisic@gmail.com"
                    className={`${errors.email && touched.email && "border-red-500"} ${style.input
                        }`}
                />
                {errors.email && touched.email && (
                    <span className="text-red-500 pt-2 block">{errors.email}</span>
                )}
                <div className="w-full mt-5 relative mb-1">
                    <label className={`${style.label}`} htmlFor="email">
                        Enter your password
                    </label>
                    <input
                        type={!show ? "password" : "text"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        placeholder="password!@%"
                        className={`${errors.password && touched.password && "border-red-500"
                            } ${style.input}`}
                    />
                    {!show ? (
                        <AiOutlineEyeInvisible
                            className="absolute bottom-3 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShow(true)}
                        />
                    ) : (
                        <AiOutlineEye
                            className="absolute bottom-3 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShow(false)}
                        />
                    )}
                    {errors.password && touched.password && (
                        <span className="text-red-500 pt-2 block">{errors.password}</span>
                    )}
                </div>
               
                <div className="w-full mt-5">
                    {
                        isLoading ? (
                            <Button className={`${style.button}`}>
                            <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please Wait
                          </Button>                
                        ) : (
                            <input type="submit" value="Login" className={`${style.button}`}/>
                        )
                    }

                </div>
                <br />
                <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
                    Or join with
                </h5>
                <div className="flex items-center justify-center my-3">
                    <FcGoogle size={30} className="cursor-pointer mr-2"
                        onClick={() => signIn("google")}
                    />
                    <AiFillGithub size={30} className="cursor-pointer ml-2" onClick={() => signIn("github")} />
                </div>
                <h5 className="text-center pt-4 font-Poppins text-[14px]">
                    Not have any account?{" "}
                    <span
                        className="text-[#2190ff] pl-1 cursor-pointer"
                        onClick={() => setRoute("Sign-Up")}
                    >
                        Sign up
                    </span>
                </h5>
            </form>
        </div>
    )
}

export default Login
