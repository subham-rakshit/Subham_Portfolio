import React from "react";
import { motion } from "framer-motion";
import { GoDotFill } from "react-icons/go";

function FeaturedProjectsComponent({ project, i }) {
  return (
    //NOTE: Project Card
    <>
      {/* //INFO: Project name */}
      <div className="flex items-center gap-1">
        <GoDotFill size={15} />
        <span className="tracking-tighter uppercase font-poppins">
          {project.name}
        </span>
      </div>
      {/* //INFO: Project Thumbnail */}
      <div className="relative w-full mt-5 group">
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex justify-center items-center z-[99] overflow-hidden px-2">
          {`${project.slug}`.split("").map((item, index) => {
            return (
              <span
                key={`${item}${index}`}
                className="relative translate-y-full group-hover:translate-y-0 text-[8vw] sm:text-[3vw] text-[#cdea68] font-extrabold tracking-tighter text-center transition-transform duration-500 uppercase"
                style={{ transitionDelay: `${index * 0.03}s` }}
              >
                {item}
              </span>
            );
          })}
        </div>
        <motion.img
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.05 * i,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          src={project.thumbnailURL}
          alt={project.name}
          className="w-full h-[56vw] sm:h-[30vw]"
        />
      </div>
      {/* //INFO: Project's Tech Stacks */}
      <div className="flex flex-wrap items-center w-full gap-2 mt-5">
        {project.technologies.map((stack, i) => {
          if (i < 4) {
            return (
              <span
                key={`${stack.name}_${i}`}
                className="flex items-center gap-1 lg:gap-2"
              >
                <span className="px-2 py-1 text-xs font-normal tracking-tighter border rounded-full lg:px-4 border-zinc-600 font-poppins">
                  {stack}
                </span>
                {i === 3 && (
                  <span className="text-xs font-normal tracking-tighter font-poppins">
                    And more ...
                  </span>
                )}
              </span>
            );
          }
        })}
      </div>
    </>
  );
}

export default FeaturedProjectsComponent;
