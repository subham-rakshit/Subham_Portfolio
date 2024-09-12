import React, { useEffect, useState } from "react";
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
import { SyncLoader } from "react-spinners";

function Home({ isFixed }) {
  const [selectedWCM, setSelectedWCM] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [projectsList, setProjectsList] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  //INFO: Fetch all project details
  useEffect(() => {
    const getAllProjects = async () => {
      try {
        setFetchLoading(true);
        const api = `${
          import.meta.env.VITE_BASE_URL
        }/api/admin/projects/get?limit=4`;
        const options = {
          method: "GET",
        };
        const res = await fetch(api, options);
        const data = await res.json();

        if (res.ok) {
          setProjectsList(data.projectsList);
          setFetchLoading(false);
        }
      } catch (error) {
        setFetchLoading(false);
        console.log(
          `Error from fetching all projects in DashProjectsPage: ${error}`
        );
      }
    };

    getAllProjects();
  }, []);

  if (fetchLoading) {
    return (
      //INFO: Loading while fetch
      <div className="flex items-center justify-center w-full h-screen">
        <SyncLoader color="#18181B" size={10} />
      </div>
    );
  } else {
    return (
      <div className="home-section">
        {/* //INFO: Landing Section */}
        <div className="w-full h-fit bg-[#FBF9ED] flex flex-col">
          {/* //INFO: Masker Info Section */}
          <div className="w-full max-w-[1400px] mx-auto my-auto flex flex-col lg:flex-row lg:items-center justify-between px-2 sm:px-5 overflow-hidden py-5">
            {isFixed && (
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: 360 }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                }}
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
              <div className="w-full lg:w-[56%] font-poppins font-bold text-zinc-800 mt-10 lg:mt-0 tracking-tighter">
                {["Welcome", "I'm Subham"].map((item, index) => {
                  return (
                    <div
                      className="mb-1 overflow-hidden masker py-[5px] sm:py-[10px]"
                      style={{ transform: "scaleY(1.3)" }}
                      key={`${item}${index}`}
                    >
                      <motion.div
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        transition={{
                          ease: [0.34, 1.56, 0.64, 1],
                          duration: 1.2,
                        }}
                        className="flex items-start overflow-hidden w-fit"
                      >
                        {index === 1 && isFixed && (
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "fit-content" }}
                            transition={{
                              ease: [0.34, 1.56, 0.64, 1],
                              duration: 0.8,
                              delay: 0.4,
                            }}
                            className="overflow-hidden"
                          >
                            <div className="sm:w-[90px] rounded-sm sm:rounded-md sm:h-[60px] flex justify-center items-center bg-[#B8D253] overflow-hidden w-[55px] h-[35px]">
                              <img
                                src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/BG%20Remove%20Subham.png?alt=media&token=9602e2d7-57fd-4095-914e-317ef801d2b7"
                                alt="profile image"
                                className="sm:w-[78px] sm:h-[60px] bg-cover relative top-[2px] w-[45px] h-[36px]"
                              />
                            </div>
                          </motion.div>
                        )}
                        <h1
                          className={`mb-[1vw] uppercase text-[45px] sm:text-[80px] leading-[.75] tracking-tighter font-extrabold`}
                        >
                          {item}
                        </h1>
                      </motion.div>
                    </div>
                  );
                })}
                {/* //INFO: Masker Info Animated Section */}
                <div className="overflow-hidden masker">
                  <motion.div
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{
                      ease: [0.34, 1.56, 0.64, 1],
                      duration: 1.5,
                    }}
                    className="flex items-end gap-2 py-2 w-fit"
                    style={{ transform: "scaleY(1.2)" }}
                  >
                    <span
                      className="mb-[1vw] capitalize text-[25px] sm:text-[40px] leading-[.75] tracking-tighter font-bold"
                      style={{ transform: "scaleY(1.2)" }}
                    >
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

          {/* //INFO: Landing Bottom Section */}
          <div className="flex flex-col justify-between gap-2 px-2 py-5 border-t sm:px-5 border-zinc-700 md:flex-row md:items-center">
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
              className="flex items-center gap-2 transition-all duration-300 group"
            >
              <span className="font-poppins text-zinc-800 group-hover:text-zinc-100 group-hover:bg-zinc-900 font-light group-hover:font-medium text-xs border-[1px] border-zinc-600 rounded-full px-3 sm:px-5 py-2 transition-all duration-300">
                VIEW RESUME
              </span>
              <MdArrowOutward
                size="35"
                className="rounded-full border-[1px] border-zinc-600 p-1 text-zinc-400 group-hover:text-zinc-100 group-hover:bg-zinc-900 transition-all duration-300"
              />
            </a>
          </div>
        </div>

        {/* //INFO: Markee Section */}
        <div className="w-full py-10 sm:py-20 bg-[#004D43] rounded-tl-[20px] sm:rounded-tl-[40px] rounded-tr-[20px] sm:rounded-tr-[40px]">
          <div className="border-t-[1px] border-b-[1px] border-zinc-300 overflow-hidden whitespace-nowrap text-white flex items-center">
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

        {/* //INFO: About Section */}
        <div className="w-full h-fit bg-[#CDEA68] py-10">
          {/* //INFO: About basic info */}
          <div className="w-full max-w-[1400px] mx-auto px-2 sm:px-5 text-[#212121] font-poppins">
            <h1 className="mb-4 overflow-hidden text-xl sm:text-3xl">
              Hello, I'm{" "}
              <span className="overflow-hidden font-bold">
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
              With a deep-rooted passion for crafting intuitive and efficient
              web applications, I specialize in the MERN stack, leveraging{" "}
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
          {/* //INFO: Why choose me section */}
          <div className="w-full max-w-[1400px] mx-auto border-t border-b border-zinc-900 py-5 px-2 sm:px-5 my-10">
            <div className="w-full max-w-[1300px] mx-auto flex flex-col sm:flex-row sm:justify-between">
              <div className="flex items-center gap-3 mb-5 sm:mb-0">
                <BsFillPersonCheckFill size="30" />
                <h1 className="text-lg font-poppins">Why Choose Me?</h1>
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
          {/* //INFO: Read More Btn */}
          <div className="flex justify-center">
            <Link to="/about">
              <button
                type="button"
                className="flex items-center gap-4 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 border rounded-full font-poppins border-zinc-900 bg-zinc-800 hover:bg-zinc-950 group"
              >
                READE MORE
                <div className="flex items-center justify-center w-1 h-1 overflow-hidden transition-all duration-300 bg-white rounded-full group-hover:w-5 group-hover:h-5">
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

        {/* //INFO: Play Section */}
        <div className="eyeplay relative w-full h-[50vh] lg:h-[80vh] bg-[url('https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/Portfolio%20play%20image.jpg?alt=media&token=331061ea-9018-4a79-90c3-bcf00b7259cd')] object-cover bg-center overflow-hidden cursor-pointer">
          <EyesPlayComponent queryClass="home-section" text="PLAY" />
        </div>

        {/* //INFO: Projects Lists Section */}
        <div className="w-full px-2 py-10 sm:px-5">
          <div className="w-full max-w-[1400px] overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{
                ease: [0.34, 1.56, 0.64, 1],
                duration: 0.8,
                delay: 0.5,
              }}
              className="text-xl tracking-tighter sm:text-3xl font-poppins"
            >
              Featured projects
            </motion.h1>
          </div>
          <div className="w-full max-w-[1400px] mx-auto mt-5 flex flex-wrap gap-5">
            {projectsList.map((project, i) => (
              <div
                className="w-full sm:w-[48%] lg:w-[45vw] whitespace-nowrap rounded-lg p-4 shadow-custom"
                key={project._id}
              >
                <Link to={`/project/${project.slug}`}>
                  <FeaturedProjectsComponent project={project} i={i} />
                </Link>
              </div>
            ))}
            {/* //INFO: Read More Btn */}
            <div className="flex justify-center w-full">
              <Link to="/projects">
                <button
                  type="button"
                  className="flex items-center gap-4 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 border rounded-full font-poppins border-zinc-900 bg-zinc-800 hover:bg-zinc-950 group"
                >
                  VIEW MORE
                  <div className="flex items-center justify-center w-1 h-1 overflow-hidden transition-all duration-300 bg-white rounded-full group-hover:w-5 group-hover:h-5">
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

        {/* //INFO: Journey Section */}
        <JourneySection queryClass="home-section" />
      </div>
    );
  }
}

export default Home;
