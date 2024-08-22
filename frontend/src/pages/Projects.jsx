import React from "react";
import { motion } from "framer-motion";
import { EyesPlayComponent } from "../components";

function Projects({ isFixed }) {
  return (
    <div
      className="projects-section w-full min-h-screen"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Projects Landing */}
      <div className="relative w-full h-[70vh] py-20 overflow-hidden">
        {/* Projects Masker */}
        <div className="w-fit mx-5 overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={isFixed && { y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="flex gap-2"
          >
            <span
              className="font-poppins font-extrabold text-5xl tracking-tighter"
              style={{ transform: "scaleY(1.2)" }}
            >
              PROJECTS
            </span>
            <span className="font-poppins font-bold text-xs">(11)</span>
          </motion.div>
        </div>
        {/* Eye Playe Section */}
        <motion.div
          initial={{ y: "100%" }}
          animate={isFixed && { y: "0%" }}
          transition={{
            duration: 1.1,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="relative w-full h-[60vh] p-5"
        >
          <EyesPlayComponent queryClass="projects-section" scale={1.2} />
        </motion.div>
        <div className="absolute top-[100%] -translate-y-[100%] w-full flex flex-col items-center px-5">
          <div className="w-[95%] max-w-[1000px] h-[8vh] bg-[#d8d8d8] rounded-t-2xl translate-y-[10px] z-[99999]" />
          <div className="w-full h-[8vh] bg-[#cbcbca] rounded-t-2xl z-[99999]" />
        </div>
      </div>
      {/* All Projects */}
      <div className="w-full min-h-screen bg-[#CDEA68] rounded-t-2xl py-12 px-5">
        {/* All Projects Heading */}
        <div className="w-full max-w-[1400px] mx-auto overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{
              margin: "-100px",
            }}
            transition={{
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="text-3xl font-poppins tracking-tighter group"
          >
            <h1>
              Purpose driven, projects designed to deliver impactful user
              experiences and showcase my skills
            </h1>
          </motion.div>
        </div>

        {/* Projects Lists */}
        <div className="h-[50vh] bg-red-500 w-full max-w-[1400px] mx-auto mt-10"></div>
      </div>
    </div>
  );
}

export default Projects;
