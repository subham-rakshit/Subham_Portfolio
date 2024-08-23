import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { EyesPlayComponent, FlipWords } from "../components";

function Contact({ isFixed }) {
  const [formDetails, setFormDetails] = useState({
    username: "",
    companyname: "",
    jobrole: "",
    jobdetails: "",
    email: "",
    phonenumber: "",
  });
  const [focusedInput, setFocusedInput] = useState({
    username: false,
    companyname: false,
    jobrole: false,
    jobdetails: false,
    email: false,
    phonenumber: false,
  });

  // Handle placeholder gets disappear when specific input field gets focused
  const handleOnFocus = (e) => {
    const { id } = e.target;
    setFocusedInput((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // Handle placeholder gets visible when specific input filed gets empty value
  const handleOnBlur = (e) => {
    const { id, value } = e.target;
    if (!value) {
      setFocusedInput((prev) => ({
        ...prev,
        [id]: false,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  return (
    <div className="contact-page-section w-full min-h-screen">
      {/* Contact Landing Section */}
      <div className="w-full min-h-[50vh] sm:min-h-[55vh] lg:min-h-[60vh] px-5 flex items-center justify-center">
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
                      className="w-[80px] sm:w-[100px] h-[35px] sm:h-[46px] object-cover"
                    />
                  </motion.div>
                )}
                <span className="w-fit font-poppins uppercase text-3xl sm:text-5xl font-extrabold tracking-tight">
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
          <div className="flex flex-col gap-2 sm:gap-5 my-5 sm:my-10">
            {/* Name and Company name */}
            <div className="flex flex-col lg:flex-row flex-wrap lg:items-center gap-2 sm:gap-4 lg:gap-5 font-poppins tracking-tight text-xl sm:text-3xl text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col sm:flex-row flex-wrap sm:items-end gap-2 sm:gap-5 flex-1 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>Hi! My name is</span>
                {/* Input Filed */}
                <div className="relative flex-1 group">
                  {!focusedInput.username && !formDetails.username && (
                    <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                      Enter your name*
                    </span>
                  )}
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formDetails.username}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleInputChange}
                    className="border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col sm:flex-row flex-wrap sm:items-end gap-2 sm:gap-5 flex-1 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  and I represent
                </span>
                {/* Input Filed */}
                <div className="relative flex-1 group">
                  {!focusedInput.companyname && !formDetails.companyname && (
                    <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                      Company name type here*
                    </span>
                  )}
                  <input
                    type="text"
                    id="companyname"
                    name="companyname"
                    value={formDetails.companyname}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleInputChange}
                    className="border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
              </motion.div>
            </div>

            {/* Job role */}
            <div className="font-poppins tracking-tight text-xl sm:text-3xl text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col lg:flex-row flex-wrap lg:items-center gap-2 lg:gap-5 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  I'm looking for a candidate for the role of
                </span>
                {/* Input Filed */}
                <div className="relative w-full flex-1 group">
                  {!focusedInput.jobrole && !formDetails.jobrole && (
                    <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                      For which role*
                    </span>
                  )}
                  <input
                    type="text"
                    id="jobrole"
                    name="jobrole"
                    value={formDetails.jobrole}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleInputChange}
                    className="border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
              </motion.div>
            </div>

            {/* More Details About the Job */}
            <div className="font-poppins tracking-tight text-xl sm:text-3xl text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col lg:flex-row flex-wrap lg:items-center gap-2 lg:gap-5 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Here's more information about the role:
                </span>
                {/* Input Filed */}
                <div className="relative w-full flex-1 group">
                  {!focusedInput.jobdetails && !formDetails.jobdetails && (
                    <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                      Job details type here...
                    </span>
                  )}
                  <input
                    type="text"
                    id="jobdetails"
                    name="jobdetails"
                    value={formDetails.jobdetails}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleInputChange}
                    className="border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
              </motion.div>
            </div>

            {/* Email Address */}
            <div className="font-poppins tracking-tight text-xl sm:text-3xl text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col lg:flex-row flex-wrap lg:items-center gap-2 lg:gap-5 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  You can reach me at
                </span>
                {/* Input Filed */}
                <div className="relative w-full flex-1 group">
                  {!focusedInput.email && !formDetails.email && (
                    <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                      name@example.com*
                    </span>
                  )}
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formDetails.email}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleInputChange}
                    className="border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
                <span style={{ transform: "scaleY(1.1)" }}>
                  to discuss further.
                </span>
              </motion.div>
            </div>

            {/* Phone Number */}
            <div className="font-poppins tracking-tight text-xl sm:text-3xl text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col lg:flex-row flex-wrap lg:items-center gap-2 lg:gap-5 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Optionally, I'm providing my phone number
                </span>
                {/* Input Filed */}
                <div className="relative flex-1 group">
                  {!focusedInput.phonenumber && !formDetails.phonenumber && (
                    <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                      Enter your phone number*
                    </span>
                  )}
                  <input
                    type="text"
                    id="phonenumber"
                    name="phonenumber"
                    value={formDetails.phonenumber}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleInputChange}
                    className="border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
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
      <div className="relative w-full py-20 sm:py-0 sm:min-h-screen flex flex-col justify-center items-center gap-5 sm:gap-8 px-5 text-zinc-900 bg-[#CDEA68]">
        <EyesPlayComponent queryClass="contact-page-section" />

        <FlipWords href="https://www.linkedin.com/in/subhamjitu97/">
          Linkedin
        </FlipWords>
        <FlipWords href="https://github.com/subham-rakshit">GitHub</FlipWords>
        <FlipWords href="https://www.facebook.com/subham.rakshit.142">
          Facebook
        </FlipWords>
        <FlipWords href="https://www.instagram.com/subham_rakshit_1/">
          Instagram
        </FlipWords>
      </div>
    </div>
  );
}

export default Contact;
