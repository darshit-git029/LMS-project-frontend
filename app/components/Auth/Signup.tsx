"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { style } from "../../style"
import { toast } from "react-hot-toast";
import Verification from "./Verification";
import { useRegisterMutation } from "@/redux/features/auth/authapi";
import { Button } from "@mui/material";
import { LuLoader2 } from "react-icons/lu";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, isSuccess, error, isLoading }] = useRegisterMutation()

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successful"
      toast.success(message)
      setRoute("Verification")
    }
    if (error) {
      if ("data" in error) {
        const errordata = error as any
        toast.error(errordata.data.message)
      }
    }
  }, [isSuccess, error])


  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name, email, password
      }
      await register(data)
    }
  }
  )


  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${style.title}`}>Join to ELearning</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className={`${style.label}`} htmlFor="email">
            Enter your Name
          </label>
          <input
            type="text"
            name=""
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="Furrisic"
            className={`${errors.name && touched.name && "border-red-500"} ${style.input
              }`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
          )}
        </div>
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
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5">
          {
            isLoading ? (
              <Button className={`${style.button}`}>
                <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <input type="submit" value="Sign Up" className={`${style.button}`} />
            )
          }
        </div>
        <br />

        <div className="flex items-center justify-center my-3">

        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Already have an account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Signup;