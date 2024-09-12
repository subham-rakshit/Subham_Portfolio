import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  EyesPlayComponent,
  FeaturedProjectsComponent,
  JourneySection,
} from "../components";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";

function Projects() {
  const [projectsList, setProjectsList] = useState([]);
  const [totalProjects, setTotalProjects] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  //INFO: Fetch all project details
  useEffect(() => {
    const getAllProjects = async () => {
      try {
        setFetchLoading(true);
        const api = `${import.meta.env.VITE_BASE_URL}/api/admin/projects/get`;
        const options = {
          method: "GET",
        };
        const res = await fetch(api, options);
        const data = await res.json();

        if (res.ok) {
          setProjectsList(data.projectsList);
          setTotalProjects(data.totalProjectsCount);
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
      <div className="w-full min-h-screen projects-section">
        {/* //INFO: Projects Landing Section */}
        <motion.div
          initial="initial"
          whileInView="view"
          className="w-full max-w-[1400px] mx-auto py-10 sm:py-20 overflow-hidden flex flex-col sm:flex-row sm:items-center"
        >
          {/* //INFO: Projects Masker */}
          <div className="py-2 mx-2 overflow-hidden sm:mx-5 w-fit h-fit">
            <motion.div
              initial="initial"
              whileInView="view"
              className="flex tracking-tighter"
              style={{ transform: "scaleY(1.2)" }}
            >
              {"Projects".split("").map((l, i) => (
                <motion.span
                  variants={{
                    initial: { y: "100%" },
                    view: { y: 0 },
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.035 * i,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  key={`${l}_${i}`}
                  className="inline-block text-4xl font-extrabold uppercase sm:text-5xl font-poppins"
                >
                  {l}
                </motion.span>
              ))}
              <span className="text-xs font-bold font-poppins">
                {totalProjects ? `(${totalProjects})` : ""}
              </span>
            </motion.div>
          </div>
          {/* //INFO: Eye Playe Section */}
          <div className="overflow-x-hidden h-fit">
            <motion.div
              variants={{
                initial: { x: "100%" },
                view: { x: 0 },
              }}
              transition={{
                duration: 2,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="relative w-[180px] sm:w-[250px] h-[100px] sm:h-[120px]"
            >
              <EyesPlayComponent queryClass="projects-section" scale={0.5} />
            </motion.div>
          </div>
        </motion.div>
        {/* //INFO: All Projects */}
        <div className="w-full min-h-screen px-2 py-5 bg-transparent sm:px-5 sm:py-10 rounded-t-2xl">
          {/* //INFO: All Projects Heading */}
          <motion.div
            initial="initial"
            whileInView="view"
            className="w-full max-w-[1400px] mx-auto overflow-hidden"
          >
            <motion.h1
              variants={{
                initial: { y: "100%" },
                view: { y: 0 },
              }}
              transition={{
                duration: 1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="text-xl tracking-tighter sm:text-3xl font-poppins"
            >
              Purpose driven, projects designed to deliver impactful user
              experiences and showcase my skills
            </motion.h1>
          </motion.div>

          {/* //INFO: Projects Lists */}
          <div className="w-full max-w-[1400px] mx-auto mt-10 flex flex-wrap gap-5">
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
          </div>
        </div>
        {/* //INFO: Contact Section */}
        <JourneySection queryClass="projects-section" />
      </div>
    );
  }
}

export default Projects;
