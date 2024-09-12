import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { motion } from "framer-motion";
import EyesPlayComponent from "./EyesPlayComponent";
import { MdArrowOutward } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import JourneySection from "./JourneySection";

//IDEA: Each Project Image Images
const Card = ({ containerRef, src, alt, top, left, rotate, className }) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4 rounded-lg cursor-grab active:cursor-grabbing",
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      // Uncomment below and remove dragElastic to remove movement after release
      // dragMomentum={false}
      dragElastic={0.65}
    />
  );
};

//IDEA: Card which holds the all Project's images
const Cards = ({
  thumbnailImage,
  largeScreenViewImage,
  mediumScreenViewImage,
  smallScreenViewImage,
}) => {
  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 z-0" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src={thumbnailImage}
        alt="Thumbanil Image"
        rotate="6deg"
        top="20%"
        left="25%"
        className="w-32 sm:w-56"
      />
      <Card
        containerRef={containerRef}
        src={largeScreenViewImage}
        alt="Large Image"
        rotate="-12deg"
        top="45%"
        left="0"
        className="w-56 sm:w-80"
      />
      <Card
        containerRef={containerRef}
        src={mediumScreenViewImage}
        alt="Medium Image"
        rotate="-6deg"
        top="20%"
        left="40%"
        className="w-48 sm:w-64"
      />
      <Card
        containerRef={containerRef}
        src={smallScreenViewImage}
        alt="Small Image"
        rotate="3deg"
        top="50%"
        left="40%"
        className="w-32 sm:w-44"
      />
    </div>
  );
};

//NOTE: MAIN ProjectItemDetails Function
function ProjectItemDetails() {
  const [projectItemDetails, setProjectItemDetails] = useState({});
  const [fetchLoading, setFetchLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location);
    const pathnameParams = urlParams.get("pathname");
    const projectSlug = pathnameParams.split("/")[2];

    const getProjectDetails = async () => {
      try {
        setFetchLoading(true);
        const api = `${
          import.meta.env.VITE_BASE_URL
        }/api/admin/projects/get?slug=${projectSlug}`;
        const options = {
          method: "GET",
        };
        const res = await fetch(api, options);
        const data = await res.json();
        // console.log(data);

        if (res.ok) {
          setProjectItemDetails(data.projectsList[0]);
          setFetchLoading(false);
        }
      } catch (error) {
        console.log(`Fetch Project's Item Details ERROR: ${error}`);
      }
    };

    if (projectSlug) {
      getProjectDetails();
    }
  }, []);

  if (fetchLoading) {
    //INFO: Loading while fetch
    return (
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-center h-screen">
        <SyncLoader color="#18181B" size={14} />
      </div>
    );
  } else {
    return (
      <div className="w-full min-h-screen project-item-details-section">
        {/* //INFO: Landing Section */}
        <div className="w-full px-2 sm:px-5">
          <div className="w-full max-w-[1400px] mx-auto h-fit flex items-center py-10 sm:py-14">
            <div className="flex items-center gap-1">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "fit-content" }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  ease: "easeInOut",
                }}
                className="sm:flex items-center justify-center overflow-hidden rounded-[5px] hidden"
              >
                <img
                  src={
                    projectItemDetails.largeScreenViewURL
                      ? projectItemDetails.largeScreenViewURL
                      : ""
                  }
                  alt={projectItemDetails.name ? projectItemDetails.name : ""}
                  className="w-[80px] h-[70px] object-cover"
                />
              </motion.div>
              <motion.div
                initial="initial"
                whileInView="view"
                className="pr-2 overflow-hidden text-[35px] font-extrabold tracking-tighter uppercase sm:text-[60px] font-poppins text-zinc-800"
                style={{ transform: "scaleY(1.5)" }}
              >
                {`${projectItemDetails.slug ? projectItemDetails.slug : ""}`
                  .split("")
                  .map((l, i) => (
                    <motion.span
                      variants={{
                        initial: { y: "100%" },
                        view: { y: 0 },
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 0.025 * i,
                        ease: [0.68, -0.6, 0.32, 1.6],
                      }}
                      key={`${l}_${i}`}
                      className={`inline-block ${l === "-" ? "w-[8px]" : ""}`} // Add width to space to render properly
                    >
                      {l === "-" ? " " : l}
                    </motion.span>
                  ))}
              </motion.div>
            </div>
          </div>
        </div>
        {/* //INFO: Drift Image Section */}
        <div className="relative w-full px-2 py-5 overflow-hidden h-fit sm:py-10 place-content-center bg-neutral-950 sm:px-5 rounded-tr-2xl rounded-tl-2xl">
          <div className="relative w-full max-w-[1400px] h-[70vh] sm:h-[50vh] mx-auto flex items-center justify-center">
            <h2 className="relative z-0 text-[20vw] font-black text-neutral-800 md:text-[200px]">
              DRIFT<span className="text-indigo-500">.</span>
            </h2>

            <Cards
              thumbnailImage={
                projectItemDetails.thumbnailURL &&
                projectItemDetails.thumbnailURL
              }
              largeScreenViewImage={
                projectItemDetails.largeScreenViewURL &&
                projectItemDetails.largeScreenViewURL
              }
              mediumScreenViewImage={
                projectItemDetails.mediumScreenViewURL &&
                projectItemDetails.mediumScreenViewURL
              }
              smallScreenViewImage={
                projectItemDetails.smallScreenViewURL &&
                projectItemDetails.smallScreenViewURL
              }
            />
          </div>
          <div className="flex flex-col justify-center w-full gap-5 py-5 sm:gap-10 sm:flex-row">
            <Link
              to={
                projectItemDetails.projectLink && projectItemDetails.projectLink
              }
              target="_blank"
            >
              <button
                type="button"
                className="flex justify-center sm:justify-start items-center gap-4 px-5 py-2 text-sm font-semibold tracking-tighter text-white transition-all duration-100 ease-in-out bg-transparent border hover:border-[2px] rounded-full font-poppins border-zinc-100 hover:border-[#cdea68] hover:bg-zinc-950 group w-full sm:w-fit"
              >
                PROJECT LINK
                <div className="flex items-center justify-center w-1 h-1 overflow-hidden transition-all duration-300 bg-white rounded-full group-hover:w-5 group-hover:h-5">
                  <MdArrowOutward
                    size="20"
                    color="#000"
                    className="relative top-[2vw] group-hover:top-0 transition-all duration-700"
                  />
                </div>
              </button>
            </Link>
            <Link
              to={
                projectItemDetails.gitHubLink && projectItemDetails.gitHubLink
              }
              target="_blank"
            >
              <button
                type="button"
                className="flex justify-center sm:justify-start items-center gap-4 px-5 py-2 text-sm font-semibold tracking-tighter text-white transition-all duration-100 ease-in-out bg-transparent border hover:border-[2px] rounded-full font-poppins border-zinc-100 hover:border-[#cdea68] hover:bg-zinc-950 group w-full sm:w-fit"
              >
                GITHUB LINK
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
        {/* //INFO: Project Description */}
        <div className="w-full px-2 bg-transparent sm:px-5">
          <div className="w-full max-w-[1400px] mx-auto py-10">
            {/* Description Heading  */}
            <motion.div
              initial="initial"
              whileInView="view"
              className="flex items-center mb-5 overflow-hidden"
            >
              <span className="text-2xl font-bold tracking-tighter font-poppins">
                Description :
              </span>
              {/* EyePlay */}
              <motion.div
                variants={{
                  initial: { y: "100%" },
                  view: { y: 0 },
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="relative flex-1 h-[8vh]"
              >
                <EyesPlayComponent
                  queryClass="project-item-details-section"
                  scale={0.22}
                  position={{
                    top: "50%",
                    left: "100%",
                    translateX: "-62%",
                    translateY: "-50%",
                  }}
                />
              </motion.div>
            </motion.div>
            {/* Description content */}
            <div
              dangerouslySetInnerHTML={{
                __html:
                  projectItemDetails && projectItemDetails.projectDescription,
              }}
              className="project-item-details-style"
            ></div>
            <div className="flex flex-wrap items-center w-full gap-2 mt-5">
              {projectItemDetails &&
                projectItemDetails.technologies &&
                projectItemDetails.technologies.map((tech, i) => (
                  <span
                    key={`${tech}_${i}`}
                    className="px-4 py-[3px] border border-black rounded-full font-poppins"
                  >
                    {tech}
                  </span>
                ))}
            </div>
          </div>
        </div>
        {/* //INFO: Ready To Start The Journey Section */}
        <JourneySection queryClass="project-item-details-section" />
      </div>
    );
  }
}

export default ProjectItemDetails;
