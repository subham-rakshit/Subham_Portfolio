import React, { useState } from "react";
import {
  EyesPlayComponent,
  FeaturedProjectsComponent,
  JourneySection,
} from "../components";
import { wcmContent } from "../data/data";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { MdArrowOutward } from "react-icons/md";
import { BsFillPersonCheckFill } from "react-icons/bs";

function Home({ isFixed }) {
  const [selectedWCM, setSelectedWCM] = useState("");
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="home-section">
      {/* Landing Section */}
      <div className="w-full min-h-screen bg-[#FBF9ED] flex flex-col">
        {/* Masker Info Section */}
        <div className="w-full max-w-[1400px] mx-auto my-auto flex flex-col lg:flex-row lg:items-center justify-between px-5 overflow-hidden">
          {isFixed && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: 360 }}
              whileInView={{
                scale: 1,
                opacity: 1,
                rotate: 0,
              }}
              viewport={{ margin: "-50px" }}
              transition={{
                ease: [0.34, 1.56, 0.64, 1],
                duration: 1.1,
              }}
              className="flex lg:justify-center w-fit lg:w-[40%] overflow-hidden"
            >
              <img
                src="/jitu3.jpg"
                alt="Subham"
                className="w-[160px] sm:w-[250px] lg:w-[400px] h-[160px] sm:h-[250px] lg:h-[400px] object-cover"
              />
            </motion.div>
          )}

          {isFixed && (
            <div className="overflow-hidden w-full lg:w-[56%] font-Founders_Grotesk_X-Condensed font-bold text-zinc-800 mt-5 lg:mt-0">
              {["Welcome", "I'm Subham"].map((item, index) => {
                return (
                  <div
                    className="masker mb-5 overflow-hidden"
                    key={`${item}${index}`}
                  >
                    <motion.div
                      initial={{ y: "100%" }}
                      whileInView={{ y: 0 }}
                      viewport={{ margin: "-50px" }}
                      transition={{
                        ease: [0.34, 1.56, 0.64, 1],
                        duration: 1.2,
                      }}
                      className="w-fit flex items-center overflow-hidden"
                    >
                      {index === 1 && isFixed && (
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "fit-content" }}
                          viewport={{ margin: "-50px" }}
                          transition={{
                            ease: [0.34, 1.56, 0.64, 1],
                            duration: 0.8,
                            delay: 0.4,
                          }}
                          className="hidden sm:inline-block overflow-hidden"
                        >
                          <div className="w-[70px] rounded-md h-[68px] flex justify-center items-center bg-[#B8D253] overflow-hidden">
                            <img
                              src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/BG%20Remove%20Subham.png?alt=media&token=9602e2d7-57fd-4095-914e-317ef801d2b7"
                              alt="profile image"
                              className="w-[65px] h-[60px] bg-cover relative top-[2px]"
                            />
                          </div>
                        </motion.div>
                      )}
                      <h1
                        className={`mb-[1vw] uppercase ${
                          index === 0 ? "text-[45px]" : "text-[30px]"
                        } sm:text-[85px] leading-[.75] tracking-tighter`}
                      >
                        {item}
                      </h1>
                    </motion.div>
                  </div>
                );
              })}
              {/* Masker Info Animated Section */}
              <div className="masker mt-3">
                <motion.div
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ margin: "-50px" }}
                  transition={{
                    ease: [0.34, 1.56, 0.64, 1],
                    duration: 1.5,
                  }}
                  className="w-fit flex items-end overflow-hidden gap-2"
                >
                  <span className="mb-[1vw] capitalize text-[25px] sm:text-[40px] leading-[.75] tracking-tighter font-bold">
                    <Typewriter
                      words={[
                        "MERN Stack Developer",
                        "Frontend Web Developer",
                        "Backend Web Developer",
                        "Web Application Developer",
                        "Software Engineer",
                        "API Developer",
                        "Full-Stack Developer",
                      ]}
                      loop={0}
                      cursor
                      cursorStyle="_"
                      cursorColor="white"
                      typeSpeed={80}
                      deleteSpeed={80}
                      delaySpeed={1500}
                    />
                  </span>
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {/* Landing Bottom Section */}
        <div className="py-5 border-t border-zinc-700 px-5 flex flex-col gap-2 md:flex-row md:items-center justify-between">
          <div className="masker">
            <p className="font-poppins text-zinc-800 font-light text-[12px]">
              Building user-friendly interface
            </p>
          </div>

          <div className="masker">
            <p className="font-poppins text-zinc-800 font-light text-[12px]">
              Scalable backend architectures
            </p>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            className="flex items-center gap-2 group transition-all duration-300"
          >
            <span className="font-poppins text-zinc-800 group-hover:text-zinc-100 group-hover:bg-zinc-900 font-light group-hover:font-medium text-xs border-[1px] border-zinc-600 rounded-full px-3 sm:px-5 py-2 transition-all duration-300">
              DOWNLOAD RESUME
            </span>
            <MdArrowOutward
              size="35"
              className="rounded-full border-[1px] border-zinc-600 p-1 text-zinc-400 group-hover:text-zinc-100 group-hover:bg-zinc-900 transition-all duration-300"
            />
          </a>
        </div>
      </div>

      {/* Markee Section */}
      <div className="w-full py-10 sm:py-20 bg-[#004D43] rounded-tl-[20px] sm:rounded-tl-[40px] rounded-tr-[20px] sm:rounded-tr-[40px]">
        <div className="border-t-[1px] border-b-[1px] border-zinc-300 overflow-hidden whitespace-nowrap text-white flex">
          <motion.h1
            initial={{ x: "0" }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 20 }}
            className="text-[80px] sm:text-[150px] lg:text-[180px] uppercase font-Founders_Grotesk_X-Condensed leading-none tracking-tighter font-bold mb-[15px] pr-10"
          >
            Welcome to my portfolio
          </motion.h1>
          <motion.h1
            initial={{ x: "0" }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 20 }}
            className="text-[80px] sm:text-[150px] lg:text-[180px] uppercase font-Founders_Grotesk_X-Condensed leading-none tracking-tighter font-bold mb-[15px] pr-10"
          >
            Welcome to my portfolio
          </motion.h1>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full min-h-screen bg-[#CDEA68] pt-10 pb-10">
        {/* About basic info */}
        <div className="w-full max-w-[1400px] mx-auto px-5 text-[#212121] font-poppins">
          <h1 className="text-xl sm:text-3xl mb-4 overflow-hidden">
            Hello, I'm{" "}
            <span className="font-bold overflow-hidden">
              {"Subham Rakshit".split("").map((l, i) => {
                return (
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ margin: "-10px" }}
                    transition={{
                      ease: [0.34, 1.56, 0.64, 1],
                      duration: 0.25,
                      delay: 0.025 * i,
                    }}
                    key={`${l}_${i}`}
                    className={`inline-block ${l === "m" ? "mr-2" : ""}`}
                  >
                    {l}
                  </motion.span>
                );
              })}
            </span>
            , a Passionate MERN Stack Developer
          </h1>
          <p className="text-lg sm:text-xl tracking-tight leading-[30px] sm:leading-[35px]">
            With a deep-rooted passion for crafting intuitive and efficient web
            applications, I specialize in the MERN stack, leveraging{" "}
            <span className="underline">MongoDB</span>,{" "}
            <span className="underline">Express.js</span>,{" "}
            <span className="underline">React</span>, and{" "}
            <span className="underline">Node.js</span> to build dynamic,
            responsive, and scalable solutions. My journey in web development
            began with a curiosity about how websites work behind the scenes,
            which quickly evolved into a full-fledged career where I now bring
            ideas to life through code.
          </p>
        </div>
        {/* Why choose me section */}
        <div className="w-full max-w-[1400px] mx-auto border-t border-b border-zinc-900 py-5 px-5 my-10">
          <div className="w-full max-w-[1300px] mx-auto flex flex-col sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3 mb-5 sm:mb-0">
              <BsFillPersonCheckFill size="30" />
              <h1 className="font-poppins text-lg">Why Choose Me?</h1>
            </div>
            <ul className="w-full sm:w-[60%] flex flex-col gap-2">
              {wcmContent.map((item) => {
                return (
                  <li className="font-poppins" key={item.id}>
                    <div className="flex items-center justify-between">
                      <span
                        className={`${
                          item.id === selectedWCM && isShown
                            ? "font-semibold"
                            : "font-light"
                        } transition-all duration-300 ease-in-out`}
                      >
                        {item.title}
                      </span>
                      <button
                        type="button"
                        className={`border-b border-zinc-800 ${
                          item.id === selectedWCM && isShown
                            ? "font-semibold"
                            : "font-light"
                        } transition-all duration-300 ease-in-out`}
                        onClick={() => {
                          setIsShown((prev) => !prev);
                          setSelectedWCM(item.id);
                        }}
                      >
                        READ
                      </button>
                    </div>
                    <div
                      className={`${
                        item.id === selectedWCM && isShown
                          ? "max-h-[fit-content] opacity-100"
                          : "max-h-0 opacity-0"
                      } my-1 overflow-hidden transition-all duration-500 ease-in-out`}
                    >
                      <p className="font-light">{item.content}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* Read More Btn */}
        <div className="flex justify-center">
          <Link to="/about">
            <button
              type="button"
              className="flex items-center font-poppins text-sm font-semibold border border-zinc-900 rounded-full px-5 py-2 bg-zinc-800 hover:bg-zinc-950 text-white gap-4 group transition-all duration-300 group"
            >
              READE MORE
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

      {/* Play Section */}
      <div className="eyeplay relative w-full h-screen bg-[url('https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/Portfolio%20play%20image.jpg?alt=media&token=331061ea-9018-4a79-90c3-bcf00b7259cd')] bg-cover bg-center bg-fixed overflow-hidden cursor-pointer">
        <EyesPlayComponent queryClass="home-section" text="PLAY" />
      </div>

      {/* Feature Projects Section */}
      <FeaturedProjectsComponent />

      {/* Journey Section */}
      <JourneySection queryClass="home-section" />
    </div>
  );
}

export default Home;
