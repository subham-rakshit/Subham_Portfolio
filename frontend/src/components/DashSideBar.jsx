import React, { useState } from "react";
import { MdToc, MdClose, MdDashboard, MdArrowOutward } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { GrProjects, GrCertificate } from "react-icons/gr";
import { GiSkills } from "react-icons/gi";
import { IoCreate } from "react-icons/io5";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function DashSideBar({ tab }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{
        width: "fit-content",
        height: "fit-content",
        borderRadius: "50%",
      }}
      animate={
        open
          ? { width: "250px", height: "fit-content", borderRadius: "20px" }
          : { width: "fit-content", height: "fit-content", borderRadius: "50%" }
      }
      transition={{ duration: 0.4, ease: [0.68, -0.2, 0.32, 1.6] }}
      className="absolute top-0 left-0 mx-2 sm:mx-5 rounded-full px-2 py-2 glass-effect flex flex-col justify-start items-start overflow-auto sidebar-scetion z-[999]"
    >
      {/* Toggle Button */}
      <div className={`flex items-center w-full rounded-full overflow-hidden`}>
        {open ? (
          <MdClose
            size="30"
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
        ) : (
          <MdToc
            size="30"
            className="cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
        )}
      </div>

      {/* Dashboard Section */}
      <motion.div
        initial={{
          width: 0,
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          opacity: 0,
        }}
        animate={
          open
            ? {
                width: "100%",
                height: "fit-content",
                marginTop: "10px",
                marginBottom: "10px",
                opacity: 1,
              }
            : {
                width: 0,
                height: 0,
                marginTop: 0,
                marginBottom: 0,
                opacity: 0,
              }
        }
        transition={{ duration: 0.3, ease: [0.68, -0.2, 0.32, 1.6] }}
        className={`flex flex-col gap-3 py-5 w-full overflow-y-auto overflow-x-hidden ${
          open ? "inline-block" : "hidden"
        } transition-all duration-500 ease-in-out sidebar-tab-container`}
      >
        {/* Group 1 */}
        <motion.div initial="initial" whileInView="view" className="px-1">
          <h1 className="text-lg font-bold font-poppins">Analytics</h1>
          <div className="flex flex-col gap-1 mt-2 text-sm font-poppins">
            {/* Dashboard */}
            <Link to="/dashboard?tab=dashboard">
              <div
                className={`flex items-center gap-2 py-1 pl-2 rounded-lg cursor-pointer hover:shadow-custom ${
                  tab === "dashboard" ? "shadow-custom" : ""
                }`}
              >
                <MdDashboard size="23" className="text-zinc-700" />
                <motion.span
                  variants={{
                    initial: { x: "100%" },
                    view: { x: 0 },
                  }}
                  transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  Dashboard
                </motion.span>
              </div>
            </Link>
            {/* Profile */}
            <Link to="/dashboard?tab=profile">
              <div
                className={`flex items-center gap-2 py-1 pl-2 rounded-lg cursor-pointer hover:shadow-custom ${
                  tab === "profile" ? "shadow-custom" : ""
                }`}
              >
                <FaUserCircle size="23" className="text-zinc-700" />
                <motion.span
                  variants={{
                    initial: { x: "100%" },
                    view: { x: 0 },
                  }}
                  transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  Profile
                </motion.span>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Group 2 */}
        <motion.div initial="initial" whileInView="view" className="px-1">
          <h1 className="text-lg font-bold font-poppins">Content</h1>
          <div className="flex flex-col gap-1 mt-2 text-sm font-poppins">
            {/* Projects */}
            <Link to="/dashboard?tab=projects">
              <div
                className={`flex items-center gap-2 py-1 pl-2 rounded-lg cursor-pointer hover:shadow-custom ${
                  tab === "projects" ? "shadow-custom" : ""
                }`}
              >
                <GrProjects size="23" className="text-zinc-700" />
                <motion.span
                  variants={{
                    initial: { x: "100%" },
                    view: { x: 0 },
                  }}
                  transition={{ duration: 1.3, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  Projects
                </motion.span>
              </div>
            </Link>
            {/* Skills */}
            <Link to="/dashboard?tab=skills">
              <div
                className={`flex items-center gap-2 py-1 pl-2 rounded-lg cursor-pointer hover:shadow-custom ${
                  tab === "skills" ? "shadow-custom" : ""
                }`}
              >
                <GiSkills size="23" className="text-zinc-700" />
                <motion.span
                  variants={{
                    initial: { x: "100%" },
                    view: { x: 0 },
                  }}
                  transition={{ duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  Skills
                </motion.span>
              </div>
            </Link>
            {/* Certificates */}
            <Link to="/dashboard?tab=certificates">
              <div
                className={`flex items-center gap-2 py-1 pl-2 rounded-lg cursor-pointer hover:shadow-custom ${
                  tab === "certificates" ? "shadow-custom" : ""
                }`}
              >
                <GrCertificate size="23" className="text-zinc-700" />
                <motion.span
                  variants={{
                    initial: { x: "100%" },
                    view: { x: 0 },
                  }}
                  transition={{ duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  Certificates
                </motion.span>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Group 3 */}
        <motion.div initial="initial" whileInView="view" className="px-1">
          <h1 className="text-lg font-bold font-poppins">Customise</h1>
          <div className="flex flex-col gap-1 mt-2 text-sm font-poppins">
            {/* Create Projects */}
            <Link to="/dashboard?tab=create-projects">
              <div
                className={`flex items-center gap-2 py-1 pl-2 rounded-lg cursor-pointer hover:shadow-custom ${
                  tab === "create-projects" ? "shadow-custom" : ""
                }`}
              >
                <IoCreate size="23" className="text-zinc-700" />
                <motion.span
                  variants={{
                    initial: { x: "100%" },
                    view: { x: 0 },
                  }}
                  transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  Create Projects
                </motion.span>
              </div>
            </Link>
            {/* Create About */}
            <Link to="/dashboard?tab=create-about">
              <div
                className={`flex items-center gap-2 py-1 pl-2 rounded-lg cursor-pointer hover:shadow-custom ${
                  tab === "create-about" ? "shadow-custom" : ""
                }`}
              >
                <IoCreate size="23" className="text-zinc-700" />
                <motion.span
                  variants={{
                    initial: { x: "100%" },
                    view: { x: 0 },
                  }}
                  transition={{ duration: 1.7, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  Create About
                </motion.span>
              </div>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Clear Filter Button */}
      <Link to="/dashboard?tab=dashboard" className="w-full">
        <button
          type="button"
          className={`${
            open ? "inline-block" : "hidden"
          } w-full h-fit flex justify-between items-center text-sm font-semibold font-poppins tracking-tight border border-zinc-900 rounded-full px-3 py-2 bg-[transparent] hover:bg-zinc-950 text-zinc-900 hover:text-white gap-4 group transition-all duration-300 ease-in-out`}
        >
          Clear All
          <div className="flex items-center justify-center w-1 h-1 overflow-hidden transition-all duration-300 rounded-full group-hover:w-5 group-hover:h-5 bg-zinc-800 group-hover:bg-zinc-200">
            <MdArrowOutward
              size="20"
              color="#000"
              className="relative top-[2vw] group-hover:top-0 transition-all duration-700"
            />
          </div>
        </button>
      </Link>
    </motion.div>
  );
}

export default DashSideBar;
