import React from "react";
import { style } from "../../../LMS-project-frontend/app/style";

const About = () => {
  return (
    <div className="text-black dark:text-white py-10">
      <div className="w-[95%] 800px:w-[85%] m-auto">
        {/* Section Title */}
        <h1 className={`${style.title} 800px:!text-[45px] text-center leading-tight`}>
          What is <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">E-Learning?</span>
        </h1>
        <br />

        {/* Main Description */}
        <p className="text-[18px] font-Poppins leading-relaxed text-justify">
          Are you ready to take your programming skills to the next level? Look no further than
          <span className="font-semibold"> E-learning</span>, the premier programming community dedicated to helping new programmers achieve their goals and reach their full potential.
          <br />
          <br />
          As the founder and CEO of E-learning, I know firsthand the challenges that come with learning and growing in the programming industry. That&apos;s why I created E-learning &ndash; to provide new programmers with the resources and support they need to succeed.
        </p>
        <br />

        {/* Highlights */}
        <div className="grid grid-cols-1 800px:grid-cols-2 gap-8 my-8">
          {/* Personalized Learning Path Section */}
          <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-[22px] font-bold">Personalized Learning Path</h2>
            <p className="text-[16px] mt-4">
              At E-learning, we understand that every learner is different. That’s why we offer personalized learning paths tailored to your specific goals and pace. Whether you're a beginner or looking to master advanced concepts, our curated paths guide you step by step toward success.
            </p>
          </div>

          {/* Affordable Courses Section */}
          <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-[22px] font-bold">Affordable Courses</h2>
            <p className="text-[16px] mt-4">
              Our courses are designed to provide high-quality education without breaking the bank. At E-learning, we believe that education should be affordable for everyone.
            </p>
          </div>
        </div>

        <br />
        <p className="text-[18px] font-Poppins leading-relaxed text-justify">
          But E-learning is more than just a community &ndash; we&apos;re a family. Our supportive community of like-minded individuals is here to help you every step of the way, whether you&apos;re just starting out or looking to take your skills to the next level.
          <br />
          <br />
          With E-learning by your side, there&apos;s nothing standing between you and your dream job. Our courses and community will provide you with the guidance, support, and motivation you need to unleash your full potential and become a skilled programmer.
        </p>

        {/* Call to Action */}
        <div className="my-10 text-center">
          <p className="text-[20px] font-semibold mb-4">Join the E-learning family today and take your programming skills to new heights!</p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg text-[18px] font-bold shadow-md hover:shadow-lg transition-shadow duration-300">
            Get Started Now
          </button>
        </div>

        {/* Founder Signature */}
        <div className="text-center mt-10">
          <span className="text-[22px] font-bold">Furrisic Infotech</span>
          <h5 className="text-[18px] font-Poppins">Founder of E-learning</h5>
        </div>
      </div>
    </div>
  );
};

export default About;
