import Ratings from '@/app/utils/Ratings';
import Image from 'next/image';
import React from 'react';
import avatarDefault from "../../../../client/assect/client-1.jpg"
type Props = {
  item: any;
};

const ReviewCard = ({ item }: Props) => {
  return (
    <div className="w-full dark:bg-slate-500 dark:opacity-0.20 border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
      <div className="flex w-full">
        <Image
          src={item?.course?.reviews?.user?.avatar ? item?.user?.image || item?.course?.reviews?.user?.avatar.url : avatarDefault}
          // Ensure avatar URL is valid
          alt="review"
          width={50}
          height={50}
          className='w-[50px] h-[50px] rounded-full object-cover'
        />
        <div className="800px:flex w-full justify-between hidden">
          <div className="pl-2">
            <h5 className='dark:text-white text-black text-[20px]'>{item.user?.name || 'Anonymous'}</h5>
            <h5 className='dark:text-white text-black text-[15px]'>{item.profession}</h5>
          </div>
          <Ratings rating={item.rating} />
        </div>
      </div>
      <div className="mt-2">
        <h5 className='dark:text-white text-black text-[16px] pl-2'>{item.course?.reviews?.comment || 'No comment available'}</h5>
      </div>
    </div>
  );
};

export default ReviewCard;
