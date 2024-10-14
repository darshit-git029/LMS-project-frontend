/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
'use client'
import { style } from '@/app/style';
import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/Layout/layoutApi';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Loader from '../Loaders/Loader';
import toast from 'react-hot-toast';

type Props = {}

enum LayoutType {
    CATEGORIES = "Categories"
}

const EditCategories = (props: Props) => {
    const { data, isLoading, refetch } = useGetHeroDataQuery(LayoutType.CATEGORIES, {
        refetchOnMountOrArgChange: true,
    });
    const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();
    const [category, setCategories] = useState<any>([]);

    useEffect(() => {
        if (data) {
            setCategories(data.getLayout[0].category);
        }
        if (layoutSuccess) {
            refetch();
            toast.success("Categories updated successfully");
        }

        if (error && "data" in error) {
            const errorData = error as any;
            toast.error(errorData?.data?.message);
        }
    }, [data, layoutSuccess, error, refetch]);

    const handleCategoriesAdd = (id: any, value: string) => {
        setCategories((prevCategory: any) =>
            prevCategory.map((i: any) =>
                i._id === id ? { ...i, title: value } : i
            )
        );
    };

    const newCategoriesHandler = () => {
        if (category[category.length - 1]?.title === "") {
            toast.error("Category title cannot be empty");
        } else {
            setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
        }
    };

    const areCategoriesUnchanged = (originalCategories: any[], newCategories: any[]) => {
        return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
    };

    const isAnyCategoryTitleEmpty = (category: any[]) => {
        return category.some((q) => q.title === "");
    };

    const editCategoriesHandler = async () => {
        if (!areCategoriesUnchanged(data.getLayout[0]?.category, category) &&
            !isAnyCategoryTitleEmpty(category)) {
            await editLayout({
                type: LayoutType.CATEGORIES,
                category,
            });
        }
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="mt-[120px] text-center">
                    <h1 className={`${style.title}`}>All Categories</h1>
                    {category &&
                        category.map((item: any, index: number) => (
                            <div className="p-3" key={item._id || index}>
                                <div className="flex items-center w-full justify-center">
                                    <input
                                        className={`${style.input} !w-[unset] !border-none !text-[20px]`}
                                        value={item.title}
                                        onChange={(e) =>
                                            handleCategoriesAdd(item._id, e.target.value)
                                        }
                                        placeholder="Enter category title..."
                                    />
                                    <AiOutlineDelete
                                        className="dark:text-white text-black text-[18px] cursor-pointer"
                                        onClick={() => {
                                            setCategories((prevCategory: any) =>
                                                prevCategory.filter((i: any) => i._id !== item._id)
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    <br />
                    <br />
                    <div className="w-full flex justify-center">
                        <IoMdAddCircleOutline
                            className="dark:text-white text-black text-[25px] cursor-pointer"
                            onClick={newCategoriesHandler}
                        />
                    </div>
                    <div
                        className={`${style.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
                            ${areCategoriesUnchanged(data.getLayout[0]?.category, category) ||
                                isAnyCategoryTitleEmpty(category)
                                ? "!cursor-not-allowed"
                                : "!cursor-pointer !bg-[#42d383]"
                            }
                            !rounded absolute bottom-12 right-12`}
                        onClick={
                            areCategoriesUnchanged(data.getLayout[0]?.category, category) ||
                                isAnyCategoryTitleEmpty(category)
                                ? () => null
                                : editCategoriesHandler
                        }
                    >
                        Save
                    </div>
                </div>
            )}
        </>
    );
};

export default EditCategories;
