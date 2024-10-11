/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react'
import { Box, Button } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import { useGetAllCourseQuery } from '@/redux/features/courses/courseApi'
import Loader from '../../Loaders/Loader'
import { format } from "timeago.js"


type Props = {}

function Allcourses({ }: Props) {

    const [theme, setTheme] = useState()
    const { isLoading, data, error } = useGetAllCourseQuery({})
    const columns = [
        { field: "id", headerName: "ID", flrx: 0.5 },
        { field: "name", headerName: "name", flrx: 1 },
        { field: "rating", headerName: "rating", flrx: .5 },
        { field: "purchased", headerName: "purchased", flrx: .5 },
        { field: "createdAt", headerName: "createdAt", flrx: 0.5 },
        {
            field: "",
            headerName: "Edit", flrx: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button>
                            <AiOutlineEdit size={20} className='dark:text-black text-black' />
                        </Button>
                    </>
                )
            }
        },
        {
            field: " ",
            headerName: "Delete", flrx: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button>
                            <AiOutlineDelete size={20} className='dark:text-black  text-black' />
                        </Button>
                    </>
                )
            }
        }
    ]

    const rows: any = []

    {
        data && data.course.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                rating: item.rating,
                purchased: item.purchased,
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
                    <Box m="20px">
                        <Box
                            m="40px 0 0 0"
                            height="80vh"
                            sx={{
                                "& .MuiDataGrid-root": {
                                    border: "none",
                                    outline: "none",
                                },
                                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                    color: theme === "dark" ? "#fff" : "#000",
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
                                    color: theme === "dark" ? "#fff" : "#000",
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