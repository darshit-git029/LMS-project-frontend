/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { FC, useState } from 'react'
import { Box, Button } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMail } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import Loader from '../../Loaders/Loader'
import { format } from "timeago.js"
import { useGetAllUserQuery } from '@/redux/features/user/userAPI'
import { userAgent } from 'next/server'
import { style } from '../../../../app/style'


type Props = {
    isTeam : boolean
}

const Allcourses:FC<Props> = ({isTeam}) => {

    const {theme, setTheme} = useTheme()
    const [active,setActive] = useState(false)
    const { isLoading, data, error } = useGetAllUserQuery({})
    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "name", flex: 0.4 },
        { field: "email", headerName: "eamil", flex: .5 },
        { field: "role", headerName: "role", flex: 0.2 },
        { field: "courses", headerName: "courses", flex: .3 },
        { field: "createdAt", headerName: "createdAt", flex: 0.5 },
        {
            field: " ",
            headerName: "Delete", flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button>
                            <AiOutlineDelete size={20} className='dark:text-white  text-black' />
                        </Button>
                    </>
                )
            }
        },
        {
            field: "",
            headerName: "Email", flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button>
                            <a href={`mailto:${params.row.email}`}>
                            <AiOutlineMail size={20} className='dark:text-white text-black' />
                            </a>
                        </Button>
                    </>
                )
            }
        },
    ]

    const rows: any = []

    if(isTeam){
        const newData =data && data.user.filter((item:any) => item.role === "admin")
        newData && newData.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role:item.role,
                courses: item.courses.length,
                createdAt: format(item.createdAt)
            })
        })
    }else{
        data && data.user.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role:item.role,
                courses: item.courses.length,
                createdAt: format(item.createdAt)
            })
        })
    }

    return (
        <div className='mt-[120px]'>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <Box m="20px" zIndex="-1">
                        <div className="w-full flex justify-end">
                            <div className={`${style.button} !w-[200px] dark:bg-[#3e4396] dark:border-[#ffffff60] !h-[35px]`} onClick={() => setActive(active)}>Add New Member</div>
                        </div>
                        <Box
                            m="40px 0 0 0"
                            height="80vh"
                            sx={{
                                "& .MuiDataGrid-root": {
                                  border: "none",
                                  outline: "none",
                                },
                                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                  color: theme === "dark" ? "#black" : "#000",
                                },
                                "& .MuiDataGrid-sortIcon": {
                                  color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-row": {
                                  color: theme === "dark" ? "#fff" : "#000",
                                  borderBottom:
                                    theme === "dark"
                                      ? "1px solid #ffffff30!important"
                                      : "1px solid #ccc!important",
                                },
                                "& .MuiTablePagination-root": {
                                  color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-cell": {
                                  borderBottom: "none!important",
                                },
                                "& .name-column--cell": {
                                  color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                  borderBottom: "none",
                                  color: theme === "dark" ? "#black" : "#000",
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                  backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                                },
                                "& .MuiDataGrid-footerContainer": {
                                  color: theme === "dark" ? "#fff" : "#000",
                                  borderTop: "none",
                                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                },
                                "& .MuiCheckbox-root": {
                                  color:
                                    theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                                },
                                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                  color: `#fff !important`,
                                },
                              }}
                        >
                            <DataGrid checkboxSelection rows={rows} columns={columns} />
                        </Box>
                    </Box>
                )
            }
        </div>
    )
}

export default Allcourses