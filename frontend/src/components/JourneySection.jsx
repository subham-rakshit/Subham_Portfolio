import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import EyesPlayComponent from "./EyesPlayComponent";

function JourneySection({ queryClass }) {
  return (
    <div className="journey relative w-full bg-[#CDEA68] py-5 sm:py-10 px-5 flex flex-col justify-center items-center overflow-hidden cursor-move">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-2 lg:gap-5">
        {/* Eye Play Mobile */}
        <div className="relative w-full h-[200px] sm:hidden">
          <EyesPlayComponent queryClass={queryClass} />
        </div>
        {/* Eye Play Desktop */}
        <EyesPlayComponent
          queryClass={queryClass}
          extraStyle="hidden sm:flex"
        />
        {["Ready", "To Start", "The Journey"].map((text, index) => {
          const textId = `${text.toLowerCase().split(" ").join("_")}${index}`;

          return (
            <div
              key={textId}
              className="w-fit mx-auto flex items-center overflow-hidden"
            >
              <h1 className="font-Founders_Grotesk_X-Condensed text-4xl sm:text-8xl font-extrabold tracking-tighter text-center text-zinc-900 uppercase leading-[.75] py-2 z-[99]">
                {text}
              </h1>
            </div>
          );
        })}

        {/* Read More Btn */}
        <div className="flex justify-center mt-10 overflow-hidden">
          <Link to="/contact">
            <button
              type="button"
              className="flex items-center font-poppins text-sm font-semibold border border-zinc-900 rounded-full px-5 py-3 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group"
            >
              CONTACT ME
              <div className="w-1 group-hover:w-5 h-1 group-hover:h-5 bg-zinc-800 group-hover:bg-zinc-200 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300">
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
