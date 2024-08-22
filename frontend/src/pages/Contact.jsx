import React from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { EyesPlayComponent, FlipWords } from "../components";

function Contact({ isFixed }) {
  return (
    <div className="contact-page-section w-full min-h-screen">
      {/* Contact Landing Section */}
      <div className="w-full min-h-[55vh] px-5 flex items-center justify-center">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col overflow-hidden">
          {["Let's Start", "Working Together"].map((item, index) => {
            return (
              <div
                key={`${item}-${index}`}
                className="overflow-hidden flex items-center py-2"
                style={{ transform: "scaleY(1.4)" }}
              >
                {index === 0 && (
                  <motion.div
                    initial={{ width: 0 }} // Start with width 0
                    whileInView={isFixed && { width: "fit-content" }} // Animate to fit-content (adjust as needed)
                    viewport={{ amount: 0.5 }} // Trigger when half the element is in view
                    transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }} // Smooth transition with a bit more duration
                    className="mr-1 rounded-[5px] overflow-hidden"
                  >
                    <img
                      src="/contactstart.png"
                      alt="contact"
                      className="w-[100px] h-[45px] object-cover"
                    />
                  </motion.div>
                )}
                <span className="w-fit font-poppins uppercase text-5xl font-extrabold tracking-tight">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-full min-h-screen px-5 py-8">
        <div className="w-full max-w-[1400px] mx-auto py-2">
          {/* Heading */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="font-poppins tracking-tighter"
            >
              Fill the form below :
            </motion.h1>
          </div>

          {/* Contact Form */}
          <div className="flex flex-col gap-5 my-10">
            {/* Name and Company name */}
            <div className="flex flex-wrap items-center gap-5 font-poppins tracking-tight text-3xl text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-wrap items-end gap-2 flex-1 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>Hi! My name is</span>
                <input
                  type="text"
                  className="border-b border-zinc-500 text-center font-light text-zinc-700 text-lg px-2 py-1 bg-transparent focus:outline-none flex-1"
                  placeholder="Enter you name*"
                />
              </motion.div>
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-wrap items-end gap-2 flex-1 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  and I represent
                </span>
                <input
                  type="text"
                  className="border-b border-zinc-500 text-center font-light text-zinc-700 text-lg px-2 py-1 bg-transparent focus:outline-none flex-1"
                  placeholder="Company name type here*"
                />
              </motion.div>
            </div>

            {/* Job role */}
            <div className="font-poppins tracking-tight text-3xl text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-wrap items-center gap-5 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  I am looking for a candidate for the role of
                </span>
                <input
                  type="text"
                  className="border-b border-zinc-500 text-center font-light text-zinc-700 text-lg px-2 py-1 bg-transparent focus:outline-none flex-1"
                  placeholder="For which role*"
                />
              </motion.div>
            </div>

            {/* More Details About the Job */}
            <div className="font-poppins tracking-tight text-3xl text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-wrap items-center gap-5 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Here's more information about the role:
                </span>
                <input
                  type="text"
                  className="border-b border-zinc-500 text-center font-light text-zinc-700 text-lg px-2 py-1 bg-transparent focus:outline-none flex-1"
                  placeholder="Job details type here..."
                />
              </motion.div>
            </div>

            {/* Email Address */}
            <div className="font-poppins tracking-tight text-3xl text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-wrap items-center gap-5 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  You can reach me at
                </span>
                <input
                  type="text"
                  className="border-b border-zinc-500 text-center font-light text-zinc-700 text-lg px-2 py-1 bg-transparent focus:outline-none flex-1"
                  placeholder="name@example.com*"
                />
                <span style={{ transform: "scaleY(1.1)" }}>
                  to discuss further.
                </span>
              </motion.div>
            </div>

            {/* Phone Number */}
            <div className="font-poppins tracking-tight text-3xl text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-wrap items-center gap-5 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Optionally, I'm providing my phone number
                </span>
                <input
                  type="text"
                  className="border-b border-zinc-500 text-center font-light text-zinc-700 text-lg px-2 py-1 bg-transparent focus:outline-none flex-1"
                  placeholder="Enter your phone number*"
                />
              </motion.div>
            </div>

            {/* Send Inquiry Button */}
            <div className="mt-10 overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.9 }}
                className="w-full flex justify-start sm:justify-end"
              >
                <button
                  type="button"
                  className="h-fit flex items-center text-sm font-normal font-poppins tracking-tight border border-zinc-900 rounded-full px-5 py-3 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group uppercase"
                >
                  Send Inquiry
                  <div className="w-1 group-hover:w-5 h-1 group-hover:h-5 bg-zinc-800 group-hover:bg-zinc-200 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300">
                    <MdArrowOutward
                      size="20"
                      color="#000"
                      className="relative top-[2vw] group-hover:top-0 transition-all duration-700"
                    />
                  </div>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="relative w-full min-h-screen flex flex-col justify-center items-center gap-8 px-5 text-zinc-900 bg-[#CDEA68]">
        <EyesPlayComponent queryClass="contact-page-section" />
        <FlipWords href="https://easings.net/">Linkedin</FlipWords>
        <FlipWords href="#">GitHub</FlipWords>
        <FlipWords href="#">Facebook</FlipWords>
        <FlipWords href="#">Instagram</FlipWords>
      </div>
    </div>
  );
}

export default Contact;
