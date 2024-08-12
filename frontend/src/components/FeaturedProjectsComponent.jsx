import React from "react";
import { CgWebsite } from "react-icons/cg";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

function FeaturedProjectsComponent() {
  return (
    <div className="w-full bg-zinc-200 py-20">
      <h1 className="text-4xl font-poppins tracking-tighter px-10">
        Featured projects
      </h1>
      <div className="border-t border-zinc-600 mt-10 px-10 py-10">
        <div className="w-full max-w-[1300px] mx-auto flex flex-wrap justify-between gap-5">
          {/* Shibaji Project */}
          <div className="w-full sm:w-[48%]">
            <div className="flex items-center gap-2 mb-4">
              <CgWebsite size="30" />
              <h1 className="text-sm font-poppins font-medium tracking-tighter">
                Shibaji Sangha
              </h1>
            </div>
            <div className="w-full h-[400px] rounded-lg overflow-hidden p-5 bg-white cursor-pointer group">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/Shibaji%20Combine%20Wb.png?alt=media&token=291f1b35-b7c0-4539-bd4a-89f1a1a02f6d"
                alt="shibaji sangha"
                className="w-full h-full object-cover group-hover:scale-[0.9] transition-all duration-500"
              />
            </div>
            <div className="w-full flex items-center gap-2 flex-wrap mt-3">
              {[
                "MERN Stack",
                "Tailwind",
                "Redux Toolkit",
                "Firebase",
                "JWT",
                "Nodemailer",
              ].map((stack, index) => {
                const stackId = `${stack.split(" ").join("_")}${index}`;

                return (
                  <span
                    key={stackId}
                    className="px-4 py-1 rounded-full border border-zinc-600 text-xs font-poppins font-normal tracking-tighter"
                  >
                    {stack}
                  </span>
                );
              })}
            </div>
          </div>
          {/* NxtWatch Project */}
          <div className="w-full sm:w-[48%]">
            <div className="flex items-center gap-2 mb-4">
              <CgWebsite size="30" />
              <h1 className="text-sm font-poppins font-medium tracking-tighter">
                NxtWatch
              </h1>
            </div>
            <div className="w-full h-[400px] rounded-lg overflow-hidden p-5 bg-white cursor-pointer group">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/NxtWatch%20Combine.png?alt=media&token=46b239b5-f2ca-42f2-aa31-f85dc7f7b955"
                alt="nxtwatch"
                className="w-full h-full object-cover group-hover:scale-[0.9] transition-all duration-500"
              />
            </div>
            <div className="w-full flex items-center gap-2 flex-wrap mt-3">
              {["ReactJs", "JWT"].map((stack, index) => {
                const stackId = `${stack
                  .toLowerCase()
                  .split(" ")
                  .join("_")}${index}`;

                return (
                  <span
                    key={stackId}
                    className="px-4 py-1 rounded-full border border-zinc-600 text-xs font-poppins font-normal tracking-tighter"
                  >
                    {stack}
                  </span>
                );
              })}
            </div>
          </div>
          {/* Nxt Trendz Project */}
          <div className="w-full sm:w-[48%]">
            <div className="flex items-center gap-2 mb-4">
              <CgWebsite size="30" />
              <h1 className="text-sm font-poppins font-medium tracking-tighter">
                NxtTrendz
              </h1>
            </div>
            <div className="w-full h-[400px] rounded-lg overflow-hidden p-5 bg-white cursor-pointer group">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/Nxt%20Trendz%20Combine.png?alt=media&token=134c5528-9db4-4d4b-8524-4a4fee99777d"
                alt="nxttrendz"
                className="w-full h-full object-cover group-hover:scale-[0.9] transition-all duration-500"
              />
            </div>
            <div className="w-full flex items-center gap-2 flex-wrap mt-3">
              {["ReactJs", "JWT"].map((stack, index) => {
                const stackId = `${stack.split(" ").join("_")}${index}`;

                return (
                  <span
                    key={stackId}
                    className="px-4 py-1 rounded-full border border-zinc-600 text-xs font-poppins font-normal tracking-tighter"
                  >
                    {stack}
                  </span>
                );
              })}
            </div>
          </div>
          {/* Jobby App Project */}
          <div className="w-full sm:w-[48%]">
            <div className="flex items-center gap-2 mb-4">
              <CgWebsite size="30" />
              <h1 className="text-sm font-poppins font-medium tracking-tighter">
                Jobby App
              </h1>
            </div>
            <div className="w-full h-[400px] rounded-lg overflow-hidden p-5 bg-white cursor-pointer group">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/Jobby%20Combine.png?alt=media&token=9af35a1a-6a11-4a53-9953-6036f610184b"
                alt="nxttrendz"
                className="w-full h-full object-cover group-hover:scale-[0.9] transition-all duration-500"
              />
            </div>
            <div className="w-full flex items-center gap-2 flex-wrap mt-3">
              {["ReactJs", "JWT"].map((stack, index) => {
                const stackId = `${stack.split(" ").join("_")}${index}`;

                return (
                  <span
                    key={stackId}
                    className="px-4 py-1 rounded-full border border-zinc-600 text-xs font-poppins font-normal tracking-tighter"
                  >
                    {stack}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Read More Btn */}
      <div className="flex justify-center">
        <Link to="/projects">
          <button
            type="button"
            className="flex items-center font-poppins text-sm font-semibold border border-zinc-900 rounded-full px-5 py-3 bg-zinc-800 hover:bg-zinc-950 text-white gap-4 group transition-all duration-300 group"
          >
            VIEW ALL PROJECTS
            <div className="w-1 group-hover:w-5 h-1 group-hover:h-5 bg-white rounded-full overflow-hidden flex items-center justify-center transition-all duration-300">
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
  );
}

export default FeaturedProjectsComponent;
