import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux-slices/UserSlice";

function Admin() {
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [focusedInput, setFocusedInput] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
  });
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //INFO: Handle placeholder gets disappear when specific input field gets focused
  const handleOnFocus = (e) => {
    const { id } = e.target;
    setFocusedInput((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  //INFO: Handle placeholder gets visible when specific input filed gets empty value
  const handleOnBlur = (e) => {
    const { id, value } = e.target;
    if (!value) {
      setFocusedInput((prev) => ({
        ...prev,
        [id]: false,
      }));
    }
  };

  //INFO: Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  //INFO: Handle Admin form
  const handleAdminForm = async (e) => {
    e.preventDefault();
    if (
      formDetails.firstname &&
      formDetails.lastname &&
      formDetails.email &&
      formDetails.password
    ) {
      try {
        dispatch(loginStart());
        const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/admin/login`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ formDetails }),
        };
        const res = await fetch(apiUrl, options);
        const data = await res.json();

        if (res.ok) {
          toast.success(data.message, {
            theme: "colored",
            position: "bottom-center",
          });
          setFormDetails({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
          });
          setFocusedInput({
            firstname: false,
            lastname: false,
            email: false,
            password: false,
          });
          dispatch(loginSuccess(data.userDetails));
          navigate("/dashboard?tab=dashboard");
        } else {
          toast.error(data.extraDetails, {
            theme: "colored",
            position: "bottom-center",
          });
          dispatch(loginFailure());
        }
      } catch (error) {
        console.log(`Admin Login Error: ${error}`);
        dispatch(loginFailure());
      }
    } else {
      toast.error("Please fill all input fields!", {
        theme: "colored",
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen px-2 sm:px-5">
      <div className="w-full max-w-[1400px] mx-auto min-h-screen">
        {/* Masker Section */}
        <div className="w-full h-fit text-[35px] sm:text-5xl text-zinc-800 font-extrabold font-poppins tracking-tight uppercase flex flex-col justify-center gap-2 sm:gap-4 py-10">
          {["Welcome to", "Admin Panel"].map((item, index) => {
            return (
              <div
                key={`${item.toLowerCase().split(" ").join("_")}_${index}`}
                className="flex items-center gap-1 overflow-hidden w-fit"
                style={{ transform: "scaleY(1.4)" }}
              >
                {index === 0 && (
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "fit-content" }}
                    viewport={{ amount: 0.5 }}
                    transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                    className="overflow-hidden rounded-md"
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
        <form
          onSubmit={handleAdminForm}
          className="w-full max-w-[1400px] min-h-screen mx-auto py-5"
        >
          {/* Form Heading */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="tracking-tighter font-poppins"
            >
              Fill the form below :
            </motion.h1>
          </div>

          {/* Contact Form */}
          <div className="flex flex-col gap-2 my-5 sm:gap-5 sm:my-10">
            {/* Admin First Name and Admin Last Name */}
            <div className="flex flex-col lg:flex-row flex-wrap lg:items-center gap-2 sm:gap-4 lg:gap-5 font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
              {/* First Name */}
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col flex-wrap flex-1 gap-2 py-2 sm:flex-row sm:items-end sm:gap-5"
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
                    autoComplete="off"
                    className="border-t-0 border-r-0 border-l-0 border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
              </motion.div>
              {/* Last Name */}
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col flex-wrap flex-1 gap-2 py-2 sm:flex-row sm:items-end sm:gap-5"
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
                    autoComplete="off"
                    className="border-t-0 border-r-0 border-l-0 border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
              </motion.div>
            </div>

            {/* Admin Email */}
            <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col flex-wrap gap-2 py-2 lg:flex-row lg:items-end lg:gap-5"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Please provide your email address here
                </span>
                {/* Input Filed */}
                <div className="relative flex-1 w-full group">
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
                    autoComplete="off"
                    className="border-t-0 border-r-0 border-l-0 border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
              </motion.div>
            </div>

            {/* Admin Password */}
            <div className="font-poppins tracking-tight text-[25px] sm:text-[35px] text-zinc-800 font-medium overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col flex-wrap gap-2 py-2 lg:flex-row lg:items-center lg:gap-5"
              >
                <span style={{ transform: "scaleY(1.1)" }}>
                  Enter your password
                </span>
                {/* Input Filed */}
                <div className="relative flex-1 w-full group">
                  {!focusedInput.password && !formDetails.password && (
                    <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-400 group-hover:text-zinc-500 font-light py-1 pointer-events-none">
                      ************
                    </span>
                  )}
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formDetails.password}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleInputChange}
                    autoComplete="off"
                    className="border-t-0 border-r-0 border-l-0 border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-light text-zinc-500 text-sm px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                  />
                </div>
                <span style={{ transform: "scaleY(1.1)" }}>
                  to access ADMIN panel
                </span>
              </motion.div>
            </div>
          </div>

          {/* Sign In Button */}
          <motion.div
            initial="initial"
            whileInView="view"
            className="relative h-[20vh] flex rounded-xl overflow-hidden"
          >
            {/* Left Silde Container */}
            <motion.div
              variants={{
                initial: { y: 0, opacity: 1 },
                view: { y: "-100%", opacity: 0 },
              }}
              transition={{
                duration: 2,
                delay: 0.4,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="bg-[#CDEA68] w-[50%] h-full rounded-l-xl z-[99]"
            />
            {/* Right Silde Container */}
            <motion.div
              variants={{
                initial: { y: 0, opacity: 1 },
                view: { y: "100%", opacity: 0 },
              }}
              transition={{
                duration: 2,
                delay: 0.4,
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
                    type="submit"
                    className="h-fit flex items-center text-sm font-normal font-poppins tracking-tight border border-zinc-900 rounded-full px-5 py-3 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 group uppercase"
                    disabled={loading}
                  >
                    {loading ? "Processing" : "Admin Login"}
                    {!loading && (
                      <div className="flex items-center justify-center w-1 h-1 overflow-hidden transition-all duration-300 rounded-full group-hover:w-5 group-hover:h-5 bg-zinc-800 group-hover:bg-zinc-200">
                        <MdArrowOutward
                          size="20"
                          color="#000"
                          className="relative top-[2vw] group-hover:top-0 transition-all duration-700"
                        />
                      </div>
                    )}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}

export default Admin;
