import React from "react";
import { CgWebsite } from "react-icons/cg";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function FeaturedProjectsComponent() {
  return (
    <div className="w-full bg-[#FBF9ED] py-10">
      <div className="w-full max-w-[1400px] px-5 overflow-hidden">
        <motion.h1
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ amout: 0.5 }}
          transition={{
            ease: [0.34, 1.56, 0.64, 1],
            duration: 0.8,
            delay: 0.5,
          }}
          className="text-xl sm:text-3xl font-poppins tracking-tighter"
        >
          Featured projects
        </motion.h1>
      </div>
      <div className="border-t border-zinc-600 mt-10 px-5 py-5 sm:py-10">
        <div className="w-full max-w-[1400px] mx-auto flex flex-wrap justify-between gap-5">
          {/* Shibaji Project */}
          <div className="w-full sm:w-[48%]">
            <div className="flex items-center gap-2 mb-4">
              <CgWebsite size="30" />
              <h1 className="text-sm font-poppins font-medium tracking-tighter">
                Shibaji Sangha
              </h1>
            </div>
            <div className="relative w-full h-[220px] lg:h-[400px] rounded-lg overflow-hidden p-2 bg-white cursor-pointer group">
              <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex justify-center items-center z-[99] overflow-hidden">
                {"SHIBAJI".split("").map((item, index) => {
                  return (
                    <span
                      key={`${item}${index}`}
                      className="relative translate-y-full group-hover:translate-y-0 text-4xl text-[#cdea68] font-extrabold tracking-tighter text-center transition-transform duration-500"
                      style={{ transitionDelay: `${index * 0.04}s` }}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
              <motion.img
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ margin: "-50px" }}
                transition={{
                  ease: [0.61, 1, 0.88, 1],
                  duration: 0.5,
                }}
                src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/Shibaji%20Combine%20Wb.png?alt=media&token=291f1b35-b7c0-4539-bd4a-89f1a1a02f6d"
                alt="shibaji sangha"
                className="w-full h-full object-cover bg-center group-hover:scale-[0.9] transition-all duration-500"
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
            <div className="relative w-full h-[220px] lg:h-[400px] rounded-lg overflow-hidden p-2 bg-white cursor-pointer group">
              <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex justify-center items-center z-[99] overflow-hidden">
                {"NXTWATCH".split("").map((item, index) => {
                  return (
                    <span
                      key={`${item}${index}`}
                      className="relative translate-y-full group-hover:translate-y-0 text-4xl text-[#cdea68] font-extrabold tracking-tighter text-center transition-transform duration-500"
                      style={{ transitionDelay: `${index * 0.04}s` }}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
              <motion.img
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ margin: "-50px" }}
                transition={{
                  ease: [0.61, 1, 0.88, 1],
                  duration: 0.5,
                  delay: 0.5,
                }}
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
            <div className="relative w-full h-[220px] lg:h-[400px] rounded-lg overflow-hidden p-2 bg-white cursor-pointer group">
              <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex justify-center items-center z-[99] overflow-hidden">
                {"NXTTRENDZ".split("").map((item, index) => {
                  return (
                    <span
                      key={`${item}${index}`}
                      className="relative translate-y-full group-hover:translate-y-0 text-4xl text-[#cdea68] font-extrabold tracking-tighter text-center transition-transform duration-500"
                      style={{ transitionDelay: `${index * 0.04}s` }}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
              <motion.img
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ margin: "-50px" }}
                transition={{
                  ease: [0.61, 1, 0.88, 1],
                  duration: 0.5,
                }}
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
            <div className="relative w-full h-[220px] lg:h-[400px] rounded-lg overflow-hidden p-2 bg-white cursor-pointer group">
              <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex justify-center items-center z-[99] overflow-hidden">
                {"JOBBY".split("").map((item, index) => {
                  return (
                    <span
                      key={`${item}${index}`}
                      className="relative translate-y-full group-hover:translate-y-0 text-4xl text-[#cdea68] font-extrabold tracking-tighter text-center transition-transform duration-500"
                      style={{ transitionDelay: `${index * 0.04}s` }}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
              <motion.img
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ margin: "-50px" }}
                transition={{
                  ease: [0.61, 1, 0.88, 1],
                  duration: 0.5,
                  delay: 0.5,
                }}
                src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/Jobby%20Combine.png?alt=media&token=9af35a1a-6a11-4a53-9953-6036f610184b"
                alt="Jobby Combine"
                className="w-full h-full object-cover group-hover:scale-90 transition-transform duration-500"
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
