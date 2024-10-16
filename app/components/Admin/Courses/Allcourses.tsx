/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from 'react'
import { Box, Button, Modal } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import { useDeleteCourseMutation, useGetAllCourseQuery } from '@/redux/features/courses/courseApi'
import Loader from '../../Loaders/Loader'
import { format } from "timeago.js"
import { style } from '@/app/style'
import toast from 'react-hot-toast'
import Link from 'next/link'


type Props = {}

const Allcourses = ({ }: Props) => {

    const { theme, setTheme } = useTheme()
    const [open, setOpen] = useState(false)
    const [courseId, setCourseId] = useState("")
    const { isLoading, data, error, refetch } = useGetAllCourseQuery({},
        { refetchOnMountOrArgChange: true })
    const [deleteCourse, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteCourseMutation({})

    const handleDelete = async () => {
        const id = courseId;
        await deleteCourse(id);
    };

    useEffect(() => {
        if (deleteSuccess) {
            refetch();
            toast.success("Delete user successfully!");
            setOpen(false);
        }
        if (deleteError) {
            if ("data" in deleteError) {
                const errorMessage = deleteError as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [deleteSuccess, deleteError, refetch])

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "name", flex: 1 },
        { field: "rating", headerName: "rating", flex: .5 },
        { field: "purchased", headerName: "purchased", flex: .5 },
        { field: "createdAt", headerName: "createdAt", flex: 0.5 },
        {
            field: "",
            headerName: "Edit", flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link href={`/admin/edit-course/${params.row.id}`}>
                            <Button>
                                <AiOutlineEdit size={20} className='dark:text-white text-black' />
                            </Button>
                        </Link>
                    </>
                )
            }
        },
        {
            field: " ",
            headerName: "Delete", flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button
                            onClick={() => {
                                setOpen(!open);
                                setCourseId(params.row.id);
                            }}
                        >
                            <AiOutlineDelete size={20} className='dark:text-white  text-black' />
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
                rating: item.rating.toFixed(2),
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
                            <DataGrid rows={rows} columns={columns} />
                        </Box>
                        {open && (
                            <Modal
                                open={open}
                                onClose={() => setOpen(!open)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                    <h1 className={`${style.title}`}>
                                        Are you sure you want to delete this user?
                                    </h1>
                                    <div className="flex w-full items-center justify-between mb-6 mt-4">
                                        <div
                                            className={`${style.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                                            onClick={() => setOpen(!open)}
                                        >
                                            Cancel
                                        </div>
                                        <div
                                            className={`${style.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        )}
                    </Box>
                )
            }
        </div>
    )
}

export default Allcourses