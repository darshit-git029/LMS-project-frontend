'use client'
import React from "react";
import userAuth from "./UserAuth";
import { redirect } from "next/navigation";

interface protectedPros{
    children:React.ReactNode
}

export default function Protected({children}:protectedPros){
    const isAuthenticated = userAuth()

    return isAuthenticated ? children : redirect("/")
}