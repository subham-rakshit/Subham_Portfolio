import React, { useState } from "react";
import { motion, useMotionValue } from "framer-motion";

function CertificateSection({ certificatesStack }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  //* Handle Certificated Dragging Functionalities -->
  const dragX = useMotionValue(0); // To track how much drag is happend in X axis after draggingEnd, based on that we change the dragging state

  const onDragStart = () => {
    setDragging(true);
  };
  const onDragEnd = () => {
    setDragging(false);
    const x = dragX.get(); // Storing motion value (How much drag movement after dragging ends)

    // If motion value is greater than or equal to +50px (for left drag) and -50px (for right drag) then we simply increase or decrease the imageIndex according to it.
    if (x <= -50 && imageIndex < certificatesStack.length - 1) {
      setImageIndex((prev) => prev + 1);
    } else if (x >= 50 && imageIndex > 0) {
      setImageIndex((prev) => prev - 1);
    }
  };
  return (
    <div className="w-full max-w-[1400px] mx-auto">
      <div className="mb-5 overflow-hidden">
        <h1 className="text-xl tracking-tighter sm:text-3xl font-poppins">
          Featured Certificates
        </h1>
      </div>
      {/* Certificates Main Container */}
      <div className="flex items-center justify-between gap-5">
        <div className="hidden sm:inline-block w-[40%] max-w-[400px] overflow-hidden">
          <motion.img
            initial={{ rotate: 360 }}
            whileInView={{ rotate: 0 }}
            viewport={{ margin: "-200px" }}
            transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
            src="/jitu5.jpg"
            alt="subham"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="realtive overflow-hidden rounded-xl w-full sm:w-[55%] bg-transparent">
          {/* Certificate Images */}
          <motion.div
            drag="x"
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            animate={{
              translateX: `-${imageIndex * 100}%`, // Means [if i = 1, then 1 * 100 = -100% move]
            }}
            style={{ x: dragX }}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            className="flex items-center cursor-grab active:cursor-grabbing"
          >
            {certificatesStack &&
              certificatesStack.map((certificate, index) => (
                <div
                  key={certificate._id}
                  className="w-full overflow-hidden realtive shrink-0 rounded-xl group"
                >
                  <img
                    src={certificate.certificateImageURL}
                    alt={`${certificate.issueDate}-${index}`}
                    className="object-cover pointer-events-none"
                  />
                </div>
              ))}
          </motion.div>

          {/* Changing Buttons */}
          <div className="flex justify-center w-full gap-2 mt-4">
            {certificatesStack &&
              certificatesStack.map((_, index) => {
                return (
                  <button
                    type="button"
                    key={index}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      index === imageIndex ? "bg-[#8C5622]" : "bg-[#F4D075]"
                    } duration-300 ease-in-out`}
                    onClick={() => setImageIndex(index)}
                  ></button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateSection;
