import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import EyesPlayComponent from "./EyesPlayComponent";

function JourneySection({ queryClass }) {
  return (
    <div className="journey relative w-full bg-[#cdea68] py-5 sm:py-10 px-2 flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-2 lg:gap-3">
        {/* Eye Play */}
        <div className="relative w-full h-[150px] sm:h-[200px]">
          <EyesPlayComponent queryClass={queryClass} scale={0.7} />
        </div>
        {["Ready", "To Start", "The Journey"].map((text, index) => {
          const textId = `${text.toLowerCase().split(" ").join("_")}${index}`;

          return (
            <div
              key={textId}
              className="px-2 pb-1 mx-auto sm:pb-2 w-fit"
              style={{ transform: "scaleY(1.3)" }}
            >
              <h1
                className="font-Founders_Grotesk_X-Condensed text-[50px] sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-center text-zinc-950 uppercase z-[99] leading-none pt-0"
                style={{ lineHeight: 0.8 }}
              >
                {text}
              </h1>
            </div>
          );
        })}

        {/* Read More Btn */}
        <div className="flex justify-center mt-5 overflow-hidden">
          <Link to="/contact">
            <button
              type="button"
              className="flex items-center font-poppins text-sm font-semibold border border-zinc-900 rounded-full px-5 py-3 bg-[transparent] hover:bg-zinc-950 text-zinc-800 hover:text-white gap-4 group transition-all duration-300 group"
            >
              CONTACT ME
              <div className="flex items-center justify-center w-1 h-1 overflow-hidden transition-all duration-300 rounded-full group-hover:w-5 group-hover:h-5 bg-zinc-800 group-hover:bg-zinc-200">
                <MdArrowOutward
                  size="20"
                  color="#000"
                  className="relative top-[2vw] group-hover:top-0 transition-all duration-700"
                />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JourneySection;
