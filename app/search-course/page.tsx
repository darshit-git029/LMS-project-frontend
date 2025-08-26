/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetAlluserCourseQuery } from "@/redux/features/courses/courseApi";
import { useGetHeroDataQuery } from "@/redux/Layout/layoutApi";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import CaourseCard from "../components/Courses/CaourseCard";
import Header from "../components/Header";
import Loader from "../components/Loaders/Loader";
import Heading from "../utils/Heading";
import { style } from "@/app/style";

type Props = {
  searchParams: { title?: string };
};

const Page = ({ searchParams }: Props) => {
  enum LAYOUT {
    CATEGORIES = "Categories",
  }

  const search = searchParams?.title || "";
  const { data, isLoading } = useGetAlluserCourseQuery(undefined, {});
  const { data: categoiresData } = useGetHeroDataQuery(LAYOUT.CATEGORIES, {});
  const [Route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [course, setCourses] = useState<any[]>([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (!data?.course) return;

    if (search) {
      setCourses(
        data.course.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (category === "All") {
      setCourses(data.course);
    } else {
      setCourses(
        data.course.filter((item: any) => item.category === category)
      );
    }
  }, [data, search, category]);

  const categories = categoiresData?.getLayout[0]?.category;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            Route={Route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
            <Heading
              title={"All courses - Elearning"}
              description={"Elearning is a programming community."}
              keyWord={
                "programming community, coding skills, expert insights, collaboration, growth"
              }
            />
            <br />
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                  } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${category === item.title
                          ? "bg-[crimson]"
                          : "bg-[#5050cb]"
                        } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>
            {course && course.length === 0 && (
              <p
                className={`${style.label} justify-center min-h-[50vh] flex items-center`}
              >
                {search
                  ? "No courses found!"
                  : "No courses found in this category. Please try another one!"}
              </p>
            )}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {course &&
                course.map((item: any, index: number) => (
                  <CaourseCard item={item} key={index} isProfile={false} />
                ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;
