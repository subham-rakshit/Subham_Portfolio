import React, { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const wcmContent = [
  {
    id: "WCM_1",
    title: "Versatile Skill Set",
    content:
      "I bring a comprehensive skill set that spans the entire development stack. Whether it's front-end design with React, back-end logic with Node.js, or database management with MongoDB, I have the expertise to handle every aspect of your project. My versatility ensures that I can see the bigger picture and deliver a cohesive, fully functional application.",
  },
  {
    id: "WCM_2",
    title: "Proven Track Record",
    content:
      "I have successfully completed numerous projects across various fileds, from small to big applications. My portfolio includes a wide range of web applications, each designed to solve specific category and deliver measurable results in terms of quality, reliability, and user interface.",
  },
  {
    id: "WCM_3",
    title: "Best Practices",
    content:
      "I follows industry best practices in coding, security, and user experience design. This commitment ensures that the applications I develop are not only functional but also secure, maintainable, and future-proof. I use modern development tools and workflows to ensure that your project is delivered on time and to the highest standards.",
  },
  {
    id: "WCM_4",
    title: "Problem-Solving Skills",
    content:
      "Complex challenges excite me. I enjoy diving into the basics of a problem, understanding its core, and devising effective solutions. My problem-solving mindset ensures that I can tackle any issues that arise during development, ensuring smooth progress and a high-quality end product.",
  },
  {
    id: "WCM_5",
    title: "Dedication to Growth",
    content:
      "When you bring me on board, you're not just hiring a developer, you're investing in someone who is committed to growing alongside your company. I'm passionate about contributing to the long-term success of the organization, continuously seeking ways to enhance my skills and bring more value to the team.",
  },
];

function Home() {
  const [selectedWCM, setSelectedWCM] = useState("");
  return (
    <>
      {/* Landing Section */}
      <div className="w-full min-h-screen bg-zinc-900 flex flex-col">
        {/* Masker Info Section */}
        <div className="w-full max-w-[1300px] mx-auto my-auto font-Founders_Grotesk_X-Condensed font-bold text-white px-5">
          {["Welcome", "I'm Subham"].map((item, index) => {
            return (
              <div className="masker mb-5" key={`${item}${index}`}>
                <div className="w-fit flex items-center overflow-hidden gap-2">
                  {index === 1 && (
                    <div className="hidden sm:inline">
                      <div className="w-[70px] rounded-md h-[60px] flex justify-center items-center bg-[#B8D253] overflow-hidden">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/BG%20Remove%20Subham.png?alt=media&token=9602e2d7-57fd-4095-914e-317ef801d2b7"
                          alt="profile image"
                          className="w-[65px] h-[60px] bg-cover relative top-[2px]"
                        />
                      </div>
                    </div>
                  )}
                  <h1
                    className={`mb-[1vw] uppercase ${
                      index === 0 ? "text-[45px]" : "text-[30px]"
                    } sm:text-[85px] leading-[.75] tracking-tighter`}
                  >
                    {item}
                  </h1>
                </div>
              </div>
            );
          })}
          {/* Masker Info Animated Section */}
          <div className="masker mt-3">
            <div className="w-fit flex items-end overflow-hidden gap-2">
              <span className="mb-[1vw] capitalize text-[25px] sm:text-[60px] leading-[.75] tracking-tighter font-semibold">
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
            </div>
          </div>
        </div>

        {/* Landing Bottom Section */}
        <div className="py-5 border-t border-zinc-700 px-5 flex flex-col gap-2 md:flex-row md:items-center justify-between">
          <div className="masker">
            <p className="font-poppins text-white font-light text-[12px]">
              Building user-friendly interface
            </p>
          </div>

          <div className="masker">
            <p className="font-poppins text-white font-light text-[12px]">
              Scalable backend architectures
            </p>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            className="flex items-center gap-2 group transition-all duration-300"
          >
            <span className="font-poppins text-white group-hover:text-zinc-900 group-hover:bg-zinc-200 font-light group-hover:font-medium text-[12px] border-[1px] border-zinc-600 rounded-full px-5 py-2 transition-all duration-300">
              DOWNLOAD RESUME
            </span>
            <MdArrowOutward
              size="35"
              className="rounded-full border-[1px] border-zinc-600 p-1 text-zinc-400 group-hover:text-zinc-900 group-hover:bg-zinc-200 transition-all duration-300"
            />
          </a>
        </div>
      </div>

      {/* Markee Section */}
      <div className="w-full py-16 bg-[#004D43] rounded-tl-[40px] rounded-tr-[40px]">
        <div className="border-t-[1px] border-b-[1px] border-zinc-300 overflow-hidden whitespace-nowrap text-white flex gap-10">
          <motion.h1
            initial={{ x: "0" }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 20 }}
            className="text-[100px] lg:text-[180px] uppercase font-Founders_Grotesk_X-Condensed leading-none tracking-tighter font-bold mb-[15px]"
          >
            Welcome to my portfolio
          </motion.h1>
          <motion.h1
            initial={{ x: "0" }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 20 }}
            className="text-[100px] lg:text-[180px] uppercase font-Founders_Grotesk_X-Condensed leading-none tracking-tighter font-bold mb-[15px]"
          >
            Welcome to my portfolio
          </motion.h1>
          <motion.h1
            initial={{ x: "0" }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 20 }}
            className="text-[100px] lg:text-[180px] uppercase font-Founders_Grotesk_X-Condensed leading-none tracking-tighter font-bold mb-[15px]"
          >
            Welcome to my portfolio
          </motion.h1>
          <motion.h1
            initial={{ x: "0" }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 20 }}
            className="text-[100px] lg:text-[180px] uppercase font-Founders_Grotesk_X-Condensed leading-none tracking-tighter font-bold mb-[15px]"
          >
            Welcome to my portfolio
          </motion.h1>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full min-h-screen bg-[#CDEA68] pt-20 pb-10 rounded-tl-[40px] rounded-tr-[40px]">
        {/* About basic info */}
        <div className="w-full max-w-[1300px] mx-auto px-5 text-[#212121] font-poppins">
          <h1 className="text-3xl mb-4">
            Hello, I'm <span className="font-bold">Subham Rakshit</span>, a
            Passionate MERN Stack Developer
          </h1>
          <p className="text-xl tracking-tight leading-[3vw]">
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
        <div className="w-full border-t border-b py-5 px-10 border-zinc-900 my-10">
          <div className="w-full max-w-[1300px] mx-auto flex justify-between">
            <div className="flex items-center gap-3">
              <BsFillPersonCheckFill size="30" />
              <h1 className="font-poppins text-lg">Why Choose Me?</h1>
            </div>
            <ul className="w-[60%] flex flex-col gap-2">
              {wcmContent.map((item) => {
                return (
                  <li className="font-poppins" key={item.id}>
                    <div className="flex items-center justify-between">
                      <span
                        className={`${
                          item.id === selectedWCM
                            ? "font-semibold"
                            : "font-light"
                        } transition-all duration-300 ease-in-out`}
                      >
                        {item.title}
                      </span>
                      <button
                        type="button"
                        className={`border-b border-zinc-800 ${
                          item.id === selectedWCM
                            ? "font-semibold"
                            : "font-light"
                        } transition-all duration-300 ease-in-out`}
                        onClick={() => {
                          setSelectedWCM(item.id);
                        }}
                      >
                        READ
                      </button>
                    </div>
                    <div
                      className={`${
                        item.id === selectedWCM
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
              READE more
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
    </>
  );
}

export default Home;
