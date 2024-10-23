import React from "react";
import { style } from "../../../LMS-project-frontend/app/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div className="text-black dark:text-white py-8">
      <div className="w-[95%] 800px:w-[85%] m-auto">
        {/* Page Title */}
        <h1 className={`${style.title} !text-start pt-4`}>
          Platform Terms and Conditions
        </h1>

        <div className="mt-6 text-[16px] font-Poppins leading-8 text-justify">
          {/* Section 1: General Terms */}
          <h2 className="text-[22px] font-semibold">1. General Terms</h2>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere blanditiis architecto quasi impedit in dicta nisi, asperiores voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos accusantium quod numquam dolores.
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere blanditiis architecto quasi impedit in dicta nisi, asperiores voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos accusantium quod numquam dolores.
          </p>
          <br />

          {/* Section 2: User Responsibilities */}
          <h2 className="text-[22px] font-semibold">2. User Responsibilities</h2>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere blanditiis architecto quasi impedit in dicta nisi, asperiores voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos accusantium quod numquam dolores.
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere blanditiis architecto quasi impedit in dicta nisi, asperiores voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos accusantium quod numquam dolores.
          </p>
          <br />

          {/* Section 3: Payment and Fees */}
          <h2 className="text-[22px] font-semibold">3. Payment and Fees</h2>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere blanditiis architecto quasi impedit in dicta nisi, asperiores voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos accusantium quod numquam dolores.
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere blanditiis architecto quasi impedit in dicta nisi, asperiores voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos accusantium quod numquam dolores.
          </p>
          <br />

          {/* Section 4: Privacy Policy */}
          <h2 className="text-[22px] font-semibold">4. Privacy Policy</h2>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere blanditiis architecto quasi impedit in dicta nisi, asperiores voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos accusantium quod numquam dolores.
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere blanditiis architecto quasi impedit in dicta nisi, asperiores voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos accusantium quod numquam dolores.
          </p>
          <br />

          {/* Section 5: Termination and Suspension */}
          <h2 className="text-[22px] font-semibold">5. Termination and Suspension</h2>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere blanditiis architecto quasi impedit in dicta nisi, asperiores voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos accusantium quod numquam dolores.
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere blanditiis architecto quasi impedit in dicta nisi, asperiores voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos accusantium quod numquam dolores.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
