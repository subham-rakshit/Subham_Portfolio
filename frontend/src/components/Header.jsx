import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { FaGripLines } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal } from "flowbite-react";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";

import { useDispatch, useSelector } from "react-redux";
import {
  initialRender,
  keyAuthStart,
  keyAuthSuccess,
  keyAuthFailure,
} from "../redux-slices/AdminKeySlice";

import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux-slices/UserSlice";

function Header({ isFixed }) {
  const { loading, isAuthenticated } = useSelector((state) => state.adminKey);
  const { userInfo } = useSelector((state) => state.user);
  const [authKey, setAuthKey] = useState("");
  const [focusedInput, setFocusedInput] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [path, setPath] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //NOTE: Onscroll navbar background change logic
  window.addEventListener("scroll", function () {
    let headerElem = document.querySelector(".navbar");
    headerElem.classList.toggle("sticky-nav", window.scrollY > 0);
  });

  //IDEA: Authentication for ADMIN --->
  //NOTE: Handle placeholder gets disappear when specific input field gets focused
  const handleOnFocus = () => {
    setFocusedInput(true);
  };

  //NOTE: Handle placeholder gets visible when specific input filed gets empty value
  const handleOnBlur = (e) => {
    const { value } = e.target;
    if (!value) {
      setFocusedInput(false);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setAuthKey(value);
  };

  //NOTE: Admin Key Checks
  const handleAdminAuth = async (e) => {
    e.preventDefault();

    if (authKey.length > 0) {
      try {
        dispatch(keyAuthStart());
        const apiURL = "/api/admin/key";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ authKey }),
        };
        const res = await fetch(apiURL, options);
        const data = await res.json();

        if (res.ok) {
          if (data.success) {
            setAuthKey("");
            setFocusedInput(false);
            setOpenModal(false);
            dispatch(keyAuthSuccess());
            toast.success(data.message, {
              theme: "colored",
              position: "bottom-center",
            });
            navigate("/admin");
          }
        } else {
          setAuthKey("");
          setFocusedInput(false);
          dispatch(keyAuthFailure());
          toast.error(data.extraDetails, {
            theme: "colored",
            position: "bottom-center",
          });
        }
      } catch (error) {
        console.log(`Admin Key Error: ${error.message}`);
      }
    } else {
      toast.error("Please provide the key!", {
        theme: "colored",
        position: "bottom-center",
      });
    }
  };

  //NOTE: Sign out handle
  const handleSignOut = async () => {
    if (userInfo) {
      try {
        dispatch(signOutStart());
        const apiURL = "/api/admin/signout";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await fetch(apiURL, options);
        if (res.ok) {
          toast.success("You have successfully Sign Out.", {
            theme: "colored",
            position: "bottom-center",
          });
          dispatch(signOutSuccess());
          dispatch(initialRender());
        }
      } catch (error) {
        dispatch(signOutFailure());
        console.log(`SignOut Error: ${error.message}`);
      }
    } else {
      toast.error("Please Login first!", {
        theme: "colored",
        position: "bottom-center",
      });
    }
  };
  //IDEA: Authentication for ADMIN --->

  const handleProfile = () => {
    setIsProfileClicked((prev) => !prev);
  };

  // Extracting the pathname from path location
  useEffect(() => {
    const urlParams = new URLSearchParams(location);
    const pathURL = urlParams.get("pathname");
    if (isFixed) {
      setPath(pathURL);
    }
  }, [location, isFixed]);

  return (
    <div
      className={`navbar relative w-full px-5 py-2 font-poppins text-zinc-800 transition-all duration-300 ease-in-out`}
    >
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="logo">
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/shibaji-website.appspot.com/o/PORTFOLIO%20LOGO%20(2).png?alt=media&token=ca91aa87-3de1-41af-9a8a-a0260af1a218"
              alt="portfolio logo"
              className="w-[50px] h-[40px] cursor-pointer filter brightness-0"
            />
          </Link>
        </div>
        {/* Destop NavItems View */}
        <div className="flex items-center gap-8">
          {/* NavLinks */}
          <div className="hidden sm:inline-block">
            <ul className="flex items-center gap-5 pl-0 list-none">
              {[
                { name: "Home", link: "/" },
                { name: "About", link: "/about" },
                { name: "Projects", link: "/projects" },
                { name: "Contact", link: "/contact" },
              ].map((item, index) => (
                <Link to={item.link} key={`${item.name}${index}`}>
                  <li
                    key={`${item.name}${index}`}
                    className={`text-sm capitalize cursor-pointer hover:font-medium transition-all duration-500 ease-in-out ${
                      index === 3 && "ml-10 lg:ml-36"
                    } ${path && path === item.link && "font-medium"}`}
                  >
                    {item.name}
                    <motion.hr
                      initial={{ width: 0, border: "none" }}
                      animate={
                        path && path === item.link
                          ? {
                              width: "100%",
                              border: "1px solid rgb(217, 102, 255)",
                            }
                          : { width: 0, border: "none" }
                      }
                      transition={{ duration: 0.4, delay: 0.2, ease: "linear" }}
                      className="w-0"
                    />
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* NavLinks Mobile View */}
          <div className="flex items-center gap-5">
            {/* Nav Toggle Button in Mobile view */}
            <button
              type="button"
              className="transition-all duration-300 delay-200 sm:hidden"
              onClick={() => setIsClicked((prev) => !prev)}
            >
              <FaGripLines size="20" />
            </button>

            {/* Profile */}
            <div
              className="relative rounded-full cursor-pointer w-9 h-9"
              style={{ boxShadow: "0px 0px 5px 1px #000" }}
              onClick={handleProfile}
            >
              <img
                src="/jitu2.jpg"
                alt="profile"
                className="object-cover w-full h-full rounded-full"
              />
              <div
                className={`absolute top-[100%] left-[100%] -translate-x-[100%] w-[220px] flex flex-col justify-center items-start gap-2 overflow-hidden ${
                  isProfileClicked ? "h-[140px] px-3 shadow-customInset" : "h-0"
                } transition-all duration-500 ease-linear rounded-lg bg-zinc-100 mt-[1px] z-[99] tracking-tighter`}
              >
                <span className="flex flex-col text-[12px] font-poppins text-zinc-500">
                  <span>subhamrakshit667</span>
                  <span>subhamrakshit667@gmail.com</span>
                </span>

                <button
                  type="button"
                  className="text-xs font-poppins text-zinc-500 hover:text-zinc-700 transition-all duration-200 ease-linear font-[500]"
                  onClick={
                    () =>
                      isAuthenticated
                        ? userInfo
                          ? navigate("/dashboard?tab=dashboard") //INFO: If authenticated and userInfo is present
                          : navigate("/admin") // INFO: authenticated but userInfo is null
                        : setOpenModal(true) // INFO: not authenticated
                  }
                >
                  {isAuthenticated && userInfo ? "Dashboard" : "Admin Login"}
                </button>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-xs font-poppins font-[500] text-blue-800 hover:text-red-500 transition-all duration-200 ease-linear"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Nav Items Container */}
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={
            isClicked ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 }
          }
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={`absolute sm:hidden top-0 left-0 w-full h-screen overflow-hidden bg-[rgba(66,66,66,0.8)] backdrop-blur-[10px] flex flex-col justify-between p-5`}
        >
          <MdClose
            color="#FBF9ED"
            size="30"
            className="self-end cursor-pointer"
            onClick={() => setIsClicked((prev) => !prev)}
          />
          {/* Navigation Items Mobile view */}
          <ul className="flex flex-col gap-5 pl-0 mt-5 list-none">
            {[
              { name: "Home", link: "/" },
              { name: "About", link: "/about" },
              { name: "Projects", link: "/projects" },
              { name: "Contact", link: "/contact" },
            ].map((item, index) => (
              <Link to={item.link} key={`${item.name}${index}`}>
                <li
                  className={`w-fit text-3xl text-[#FBF9ED] font-Founders_Grotesk_X-Condensed capitalize cursor-pointer transition-all duration-300 ${
                    path && path === item.link
                      ? "text-[#B8D253] font-bold"
                      : "text-[#FBF9ED] font-normal"
                  }`}
                >
                  {item.name}
                  <motion.hr
                    initial={{ width: 0, border: "none" }}
                    animate={
                      path && path === item.link
                        ? {
                            width: "100%",
                            border: "1px solid rgb(217, 102, 255)",
                          }
                        : { width: 0, border: "none" }
                    }
                    transition={{ duration: 0.4, delay: 0.2, ease: "linear" }}
                    className="w-0"
                  />
                </li>
              </Link>
            ))}
          </ul>

          {/* Social Links Mobile view */}
          <ul className="flex items-center justify-between gap-2 pl-0 mt-5 list-none">
            {[
              {
                name: "linkedin_1",
                href: "/linkedin.png",
                link: "https://www.linkedin.com/in/subhamjitu97/",
              },
              {
                name: "github_2",
                href: "/github-light.png",
                link: "https://github.com/subham-rakshit",
              },
              {
                name: "facebook_3",
                href: "/facebook.png",
                link: "https://www.facebook.com/subham.rakshit.142",
              },
              {
                name: "instagram_4",
                href: "/instagram.png",
                link: "https://www.instagram.com/subham_rakshit_1/",
              },
            ].map((logo) => (
              <Link to={logo.link} key={logo.name}>
                <li
                  key={logo.name}
                  className={`w-fit hover:scale-[1.2] transition-all duration-300 ease-in-out`}
                >
                  <img src={logo.href} alt={logo.name} className="w-7 h-w-7" />
                </li>
              </Link>
            ))}
          </ul>
        </motion.div>

        {/* Popup Modal */}
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="flex flex-col gap-5 text-center">
              {loading ? (
                <PuffLoader
                  color="#fff"
                  className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200"
                />
              ) : (
                <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
              )}

              <div className="relative flex-1 w-full group">
                {!authKey && !focusedInput && (
                  <span className="absolute left-1/2 top-full -translate-x-[50%] -translate-y-[100%] text-sm w-full text-center font-poppins text-zinc-200 group-hover:text-zinc-400 font-light py-1 pointer-events-none">
                    Please provide the KEY *
                  </span>
                )}
                <input
                  type="text"
                  id="authKey"
                  name="authKey"
                  value={authKey}
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  onChange={handleInputChange}
                  autoComplete="off"
                  className="border-b-[1px] group-hover:border-b-[2px] border-zinc-500 group-hover:border-zinc-800 text-center font-semibold text-zinc-200 text-xl px-2 py-1 bg-transparent focus:outline-none focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:ring-0 w-full cursor-pointer"
                />
              </div>
              <div className="flex justify-center gap-4">
                <Button color="success" onClick={handleAdminAuth}>
                  Authenticate
                </Button>
                <Button color="failure" onClick={() => setOpenModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Header;
