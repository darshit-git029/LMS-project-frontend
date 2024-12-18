'use client'
import React from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface protectedPros {
    children: React.ReactNode
}

export default function AdminProtectd({ children }: protectedPros) {
    const { user } = useSelector((state: any) => state.auth)
    if (user) {
        const isAdmin = user?.role === "admin"
        return isAdmin ? children : redirect("/")
    }
}