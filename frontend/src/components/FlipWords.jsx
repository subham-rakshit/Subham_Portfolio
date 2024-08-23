import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const DURATION = 0.25;
const STAGGER = 0.025;

function FlipWords({ children, href }) {
  return (
    <Link to={href} target="_blank">
      <motion.div
        initial="initial"
        whileHover="hover"
        className="relative overflow-hidden whitespace-nowrap font-poppins text-4xl sm:text-7xl font-extrabold tracking-tighter uppercase"
        style={{ transform: "scaleY(1.3) scaleX(1.2)", lineHeight: 0.78 }}
      >
        {/* Main Word */}
        <p>
          {children.split("").map((letters, index) => {
            return (
              <motion.span
                variants={{
                  initial: { y: 0 },
                  hover: { y: "-100%" },
                }}
                transition={{
                  duration: DURATION,
                  ease: "easeInOut",
                  delay: STAGGER * index,
                }}
                key={index}
                className="inline-block"
              >
                {letters}
              </motion.span>
            );
          })}
        </p>

        {/* Bottom of the Main Word */}
        <p className="absolute inset-0">
          {children.split("").map((l, i) => {
            return (
              <motion.span
                variants={{
                  initial: { y: "100%" },
                  hover: { y: 0 },
                }}
                transition={{
                  duration: DURATION,
                  ease: "easeInOut",
                  delay: STAGGER * i,
                }}
                key={`${l}_${i}`}
                className="inline-block"
              >
                {l}
              </motion.span>
            );
          })}
        </p>
      </motion.div>
    </Link>
  );
}

export default FlipWords;
