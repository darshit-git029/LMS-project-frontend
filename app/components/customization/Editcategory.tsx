'use client';
import { style } from '@/app/style';
import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/Layout/layoutApi';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Loader from '../Loaders/Loader';
import toast from 'react-hot-toast';

type Props = {};

// enum LayoutType {
//     CATEGORIES = "Categories",
// }

const EditCategories = (props: Props) => {
    const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
        refetchOnMountOrArgChange: true,
    });
    const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        if (data && data.getLayout.length > 0) {
            setCategories(data.getLayout[0]?.category || []);
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

    const handleCategoriesAdd = (id: string, value: string) => {
        setCategories(prevCategories =>
            prevCategories.map((cat:any) => (cat._id === id ? { ...cat, title: value } : cat))
        );
    };

    const newCategoriesHandler = () => {
        if (categories[categories.length - 1]?.title === "") {
            toast.error("Category title cannot be empty");
        } else {
            setCategories(prevCategories => [...prevCategories, { _id: '', title: '' }]); // Set a default ID
        }
    };

    const areCategoriesUnchanged = (originalCategories: any[], newCategories: any[]) => {
        return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
    };

    const isAnyCategoryTitleEmpty = (categories: any[]) => {
        return categories.some(cat => cat.title === "");
    };

    const editCategoriesHandler = async () => {
        if (!areCategoriesUnchanged(data.getLayout[0].category, categories) && 
            !isAnyCategoryTitleEmpty(categories)) {
            await editLayout({
                type: "Categories",
                category: categories,
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
                    {categories && categories.map((item, index) => (
                        <div className="p-3" key={item._id || index}>
                            <div className="flex items-center w-full justify-center">
                                <input
                                    className={`${style.input} !w-[unset] !border-none !text-[20px]`}
                                    value={item.title}
                                    onChange={(e) => handleCategoriesAdd(item._id, e.target.value)}
                                    placeholder="Enter category title..."
                                />
                                <AiOutlineDelete
                                    className="dark:text-white text-black text-[18px] cursor-pointer"
                                    onClick={() => {
                                        setCategories(prevCategories =>
                                            prevCategories.filter(cat => cat._id !== item._id)
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
                            ${areCategoriesUnchanged(data.getLayout[0]?.category, categories) ||
                                isAnyCategoryTitleEmpty(categories)
                                ? "!cursor-not-allowed"
                                : "!cursor-pointer !bg-[#42d383]"}
                            !rounded absolute bottom-12 right-12`}
                        onClick={
                            areCategoriesUnchanged(data.getLayout[0]?.category, categories) ||
                            isAnyCategoryTitleEmpty(categories)
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
