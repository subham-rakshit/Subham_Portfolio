import React from "react";
import { MdArrowOutward } from "react-icons/md";

function OAuth() {
  return (
    <button
      type="button"
      className="h-fit flex items-center text-sm font-normal font-poppins tracking-tight border border-zinc-900 rounded-full px-5 py-3 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-3 group transition-all duration-300 group uppercase"
    >
      <img
        src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
        alt="google"
      />
      Google
      <div className="w-1 group-hover:w-5 h-1 group-hover:h-5 bg-zinc-800 group-hover:bg-zinc-200 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300">
        <MdArrowOutward
          size="20"
          color="#000"
          className="relative top-[2vw] group-hover:top-0 transition-all duration-700"
        />
      </div>
    </button>
  );
}

export default OAuth;
