import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { OAuth } from "../components";

function Admin() {
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
  });
  const [focusedInput, setFocusedInput] = useState({
    firstname: false,
    lastname: false,
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
    <div className="w-full min-h-screen px-5 flex justify-center items-center">
      <div className="w-full max-w-[1400px] mx-auto min-h-screen">
        {/* Masker Section */}
        <div className="w-full h-[40vh] text-[35px] sm:text-5xl text-zinc-800 font-extrabold font-poppins tracking-tight uppercase flex flex-col justify-center gap-2 sm:gap-4">
          {["Welcome to", "Admin Panel"].map((item, index) => {
            return (
              <div
                key={`${item.toLowerCase().split(" ").join("_")}_${index}`}
                className="flex items-center w-fit gap-1 overflow-hidden"
                style={{ transform: "scaleY(1.4)" }}
              >
                {index === 0 && (
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "fit-content" }}
                    viewport={{ amount: 0.5 }}
                    transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                    className="rounded-md overflow-hidden"
                  >
                    <img
                      src="/admin.jpg"
                      alt="admin"
                      className="w-[80px] h-[35px] sm:w-[100px] sm:h-[48px] object-cover"
                    />
                  </motion.div>
                )}
                <h1>{item}</h1>
              </div>
            );
          })}
        </div>
        {/* Form Section */}
        <div className="w-full max-w-[1400px] min-h-screen mx-auto py-10">
          {/* Form Heading */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="font-poppins tracking-tighter"
            >
              Fill the form below :
            </motion.h1>
          </div>

          {/* Contact Form */}
          <div className="flex flex-col gap-2 sm:gap-5 my-5 sm:my-10">
            {/* Admin First Name and Admin Last Name */}
            <div className="flex flex-col lg:flex-row flex-wrap lg:items-center gap-2 sm:gap-4 lg:gap-5 font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
              {/* First Name */}
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col sm:flex-row flex-wrap sm:items-end gap-2 sm:gap-5 flex-1 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Enter your first name
                </span>
                {/* Input Filed */}
                <div className="relative flex-1 group">
                  {!focusedInput.firstname && !formDetails.firstname && (
                    <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                      Type your first name*
                    </span>
                  )}
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formDetails.firstname}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleInputChange}
                    className="border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
              </motion.div>
              {/* Last Name */}
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col sm:flex-row flex-wrap sm:items-end gap-2 sm:gap-5 flex-1 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Enter your last name
                </span>
                {/* Input Filed */}
                <div className="relative flex-1 group">
                  {!focusedInput.lastname && !formDetails.lastname && (
                    <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                      Type your last name*
                    </span>
                  )}
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formDetails.lastname}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleInputChange}
                    className="border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
              </motion.div>
            </div>

            {/* Admin Email */}
            <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col lg:flex-row flex-wrap lg:items-end gap-2 lg:gap-5 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Please provide your email address here
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
              </motion.div>
            </div>

            {/* Admin Password */}
            <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col lg:flex-row flex-wrap lg:items-center gap-2 lg:gap-5 py-2"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Enter your password
                </span>
                {/* Input Filed */}
                <div className="relative w-full flex-1 group">
                  {!focusedInput.password && !formDetails.password && (
                    <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                      **********
                    </span>
                  )}
                  <input
                    type="text"
                    id="password"
                    name="password"
                    value={formDetails.password}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleInputChange}
                    className="border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
                <span style={{ transform: "scaleY(1.1)" }}>
                  to access ADMIN panel
                </span>
              </motion.div>
            </div>
          </div>

          {/* Sign In and Google Button */}
          <motion.div
            initial="initial"
            whileInView="view"
            className="relative h-[30vh] flex rounded-xl overflow-hidden"
          >
            {/* Left Silde Container */}
            <motion.div
              variants={{
                initial: { y: 0, opacity: 1 },
                view: { y: "-100%", opacity: 1 },
              }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: 1.8,
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="bg-[#CDEA68] w-[50%] h-full rounded-l-xl z-[99]"
            />
            {/* Right Silde Container */}
            <motion.div
              variants={{
                initial: { y: 0, opacity: 1 },
                view: { y: "100%", opacity: 1 },
              }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: 1.8,
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="bg-[#CDEA68] w-[50%] h-full rounded-r-xl z-[99]"
            />

            {/* Main Buttons */}
            <motion.div
              initial="initial"
              whileInView="buttonView"
              className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] h-full flex flex-col sm:flex-row items-center justify-center sm:items-center gap-3 w-full"
            >
              <div className="overflow-hidden">
                <motion.div
                  variants={{
                    initial: { y: "100%" },
                    buttonView: { y: 0 },
                  }}
                  viewport={{ margin: "-100px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  <button
                    type="button"
                    className="h-fit flex items-center text-sm font-normal font-poppins tracking-tight border border-zinc-900 rounded-full px-5 py-3 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group uppercase"
                  >
                    Sign In
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

              {/* Google Btn */}
              <div className="overflow-hidden">
                <motion.div
                  variants={{
                    initial: { y: "100%" },
                    buttonView: { y: 0 },
                  }}
                  viewport={{ margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  <OAuth />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
