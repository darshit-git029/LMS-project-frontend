"use client"
import { style } from "../../../style";
import React, { FC } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  perrequistites: { title: string }[];
  setperrequistites: (perrequistites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  perrequistites,
  setperrequistites,
  active,
  setActive,
}) => {

  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = benefits.map((benefit, idx) =>
      idx === index ? { title: value } : benefit
    );
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    // Add only if the last benefit title is not empty
    if (benefits[benefits.length - 1]?.title !== "") {
      setBenefits([...benefits, { title: "" }]);
    } else {
      toast.error("Please fill the current benefit before adding another");
    }
  };

  const handleperrequistitesChange = (index: number, value: string) => {
    const updatedperrequistites = perrequistites.map((perrequistites, idx) =>
      idx === index ? { title: value } : perrequistites
    );
    setperrequistites(updatedperrequistites);
  };

  const handleAddperrequistites = () => {
    if (perrequistites[perrequistites.length - 1]?.title !== "") {
      setperrequistites([...perrequistites, { title: "" }]);
    } else {
      toast.error("Please fill the current perrequistites before adding another");
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (benefits[benefits.length - 1]?.title !== "" && perrequistites[perrequistites.length - 1]?.title !== "") {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields to proceed to the next step!");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${style.label} text-[20px]`} htmlFor="benefit">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit, index) => (
          <input
            type="text"
            key={index}
            name={`benefit-${index}`}
            placeholder="You will be able to build a full stack LMS Platform..."
            required
            className={`${style.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AiOutlinePlusCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
        />
      </div>

      <div>
        <label className={`${style.label} text-[20px]`} htmlFor="perrequistites">
          What are the perrequistites for starting this course?
        </label>
        <br />
        {perrequistites.map((perrequistites, index) => (
          <input
            type="text"
            key={index}
            name={`perrequistites-${index}`}
            placeholder="You need basic knowledge of MERN stack"
            required
            className={`${style.input} my-2`}
            value={perrequistites.title}
            onChange={(e) => handleperrequistitesChange(index, e.target.value)}
          />
        ))}
        <AiOutlinePlusCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddperrequistites}
        />
      </div>

      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex gap-3 items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex gap-3 items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
