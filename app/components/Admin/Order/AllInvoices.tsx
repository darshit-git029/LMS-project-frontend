"use client"
import React, { FC, useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loaders/Loader";
import { format } from "timeago.js";
import { useGetAllOrderQuery } from '@/redux/features/order/orderApi';
import { useGetAllUserQuery } from '@/redux/features/user/userAPI';
import { useGetAllCourseQuery } from '@/redux/features/courses/courseApi';

type Props = {
    isDashboard?: boolean;
};

const AllInvoices: FC<Props> = ({ isDashboard }) => {
    const { theme } = useTheme();
    const { isLoading, data } = useGetAllOrderQuery({});
    const { data: usersData } = useGetAllUserQuery({});
    const { data: coursesData } = useGetAllCourseQuery({});
  
    const [orderData, setOrderData] = useState<any>([]);

    useEffect(() => {
        if (data) {
            const temp = data.order.map((item: any) => {
                const user = usersData?.user.find((user: any) => user._id === item.userId);
                const course = coursesData?.course.find((course: any) => course._id === item.courseId);
                return {
                    ...item,
                    name: user?.name,
                    email: user?.email,
                    title: course?.name,
                    price: "$" + course?.price,
                };
            });
            setOrderData(temp);
        }
    }, [data, usersData, coursesData]);

    const columns: any = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "name", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
        ...(isDashboard
            ? []
            : [
                { field: "email", headerName: "Email", flex: 1 },
                { field: "title", headerName: "Course Title", flex: 1 },
            ]),
        { field: "price", headerName: "Price", flex: 0.5 },
        ...(isDashboard
            ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
            : [
                {
                    field: "emailIcon",
                    headerName: "Email-icon",
                    flex: 0.2,
                    renderCell: (params: any) => (
                    
                            <div className="flex justify-center items-center w-full h-full">
                                <a href={`mailto:${params.row.email}`}>
                                    <AiOutlineMail className="dark:text-white text-black" size={20} />
                                </a>
                            </div>
                    
                    ),
                },
            ]),
    ];

    const rows: any = [];

    orderData?.forEach((item: any) => {
        rows.push({
            id: item._id,
            name: item.name,
            email: item.email,
            title: item.title,
            price: item.price,
            created_at: format(item.createdAt),
        });
    });

    return (
        <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
            {isLoading ? (
                <Loader />
            ) : (
                <Box m={isDashboard ? "0" : "40px"}>
                    <Box
                        m={isDashboard ? "0" : "40px 0 0 0"}
                        height={isDashboard ? "35vh" : "90vh"}
                        overflow={"hidden"}
                        sx={{
                            "& .MuiDataGrid-root": { border: "none", outline: "none" },
                            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": { color: theme === "dark" ? "#fff" : "#000" },
                            "& .MuiDataGrid-sortIcon": { color: theme === "dark" ? "#fff" : "#000" },
                            "& .MuiDataGrid-row": { color: theme === "dark" ? "#fff" : "#000", borderBottom: theme === "dark" ? "1px solid #ffffff30!important" : "1px solid #ccc!important" },
                            "& .MuiTablePagination-root": { color: theme === "dark" ? "#fff" : "#000" },
                            "& .MuiDataGrid-cell": { borderBottom: "none!important" },
                            "& .MuiDataGrid-columnHeaders": { backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC", borderBottom: "none", color: theme === "dark" ? "#black" : "#000" },
                            "& .MuiDataGrid-virtualScroller": { backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0" },
                            "& .MuiDataGrid-footerContainer": { color: theme === "dark" ? "#fff" : "#000", borderTop: "none", backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC" },
                            "& .MuiCheckbox-root": { color: theme === "dark" ? `#b7ebde !important` : `#000 !important` },
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `#fff !important` },
                        }}
                    >
                        <DataGrid
                            checkboxSelection={isDashboard ? false : true}
                            rows={rows}
                            columns={columns}
                            components={isDashboard ? {} : { Toolbar: GridToolbar }}
                        />
                    </Box>
                </Box>
            )}
        </div>
    );
};

export default AllInvoices;
