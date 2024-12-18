/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use cilent"
import { style } from "../../../style";

import React, { FC } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loaders/Loader";
import { useGetUserAnalyticsQuery } from "@/redux/features/Analytics/analyticsApi";
type Props = {
  isDashboard?: boolean;
}



const UserAnalytics: FC<Props> = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUserAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });


  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          <div className={`${!isDashboard ? "mt-[50px]" : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"}`}>
            <div className={`${isDashboard ? "!ml-8 mb-5" : ''}`}>
              <h1 className={`${style.title} ${isDashboard && '!text-[20px]'} px-5 !text-start`}>
                Users Analytics
              </h1>
              {
                !isDashboard && (
                  <p className={`${style.label} px-5`}>
                    Last 12 months analytics data{" "}
                  </p>
                )
              }
            </div>

            <div className={`w-full ${isDashboard ? 'h-[30vh]' : 'h-screen'} flex items-center justify-center`}>
              <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={!isDashboard ? "50%" : '100%'}>
                <AreaChart
                  data={analyticsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#4d62d9"
                    fill="#4d62d9"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      }
    </>
  )
}

export default UserAnalytics