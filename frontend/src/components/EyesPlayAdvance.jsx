import React, { useEffect, useState } from "react";

function EyesPlayComponent({
  queryClass,
  text,
  extraStyle,
  scale = 1,
  position,
}) {
  const [eyeAngles, setEyeAngles] = useState({ leftEye: 0, rightEye: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      const eyeContainer = document.querySelector(`.${queryClass}`);

      if (!eyeContainer) return; // Guard clause if the container isn't found

      // Get the relative position of the eye container
      const containerRect = eyeContainer.getBoundingClientRect();

      const leftEyeElement = eyeContainer.querySelector(".left-eye");
      const rightEyeElement = eyeContainer.querySelector(".right-eye");

      // Get the center points of both eyes relative to the container
      const leftEyeRect = leftEyeElement.getBoundingClientRect();
      const leftEyeCenterX =
        leftEyeRect.left + leftEyeRect.width / 2 - containerRect.left;
      const leftEyeCenterY =
        leftEyeRect.top + leftEyeRect.height / 2 - containerRect.top;

      const rightEyeRect = rightEyeElement.getBoundingClientRect();
      const rightEyeCenterX =
        rightEyeRect.left + rightEyeRect.width / 2 - containerRect.left;
      const rightEyeCenterY =
        rightEyeRect.top + rightEyeRect.height / 2 - containerRect.top;

      // Calculate the angles for both eyes
      let leftEyeDeltaX = mouseX - (containerRect.left + leftEyeCenterX);
      let leftEyeDeltaY = mouseY - (containerRect.top + leftEyeCenterY);
      let leftEyeAngle =
        Math.atan2(leftEyeDeltaY, leftEyeDeltaX) * (180 / Math.PI);

      let rightEyeDeltaX = mouseX - (containerRect.left + rightEyeCenterX);
      let rightEyeDeltaY = mouseY - (containerRect.top + rightEyeCenterY);
      let rightEyeAngle =
        Math.atan2(rightEyeDeltaY, rightEyeDeltaX) * (180 / Math.PI);

      setEyeAngles({
        leftEye: leftEyeAngle - 180,
        rightEye: rightEyeAngle - 180,
      });
    };

    const eyeContainer = document.querySelector(`.${queryClass}`);

    if (eyeContainer) {
      eyeContainer.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (eyeContainer) {
        eyeContainer.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [queryClass]); // Add queryClass as a dependency to rerun effect when it changes

  return (
    <div
      className={`absolute flex items-center gap-2 sm:gap-8 ${
        extraStyle ? `${extraStyle}` : ""
      }`}
      style={{
        top: position ? position.top : "50%",
        left: position ? position.left : "50%",
        transform: `translate(${position ? position.translateX : "-50%"}, ${
          position ? position.translateY : "-50%"
        }) scale(${scale})`,
      }}
    >
      {/* FIRST Eye */}
      <div className="relative w-32 sm:w-44 h-32 sm:h-44 rounded-full bg-zinc-200 left-eye">
        {/* Black Eye */}
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-3/5 h-3/5 bg-black rounded-full overflow-hidden">
          {text && (
            <span className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-poppins font-light text-white text-xs sm:text-lg">
              PLAY
            </span>
          )}
          {/* Small eye ball's box */}
          <div
            style={{
              transform: `translate(-50%, -50%) rotate(${eyeAngles.leftEye}deg)`,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full h-4"
          >
            {/* Small eye ball */}
            <div className="w-4 h-full bg-zinc-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* SECOND Eye */}
      <div className="relative w-32 sm:w-44 h-32 sm:h-44 rounded-full bg-zinc-200 right-eye">
        {/* Black Eye */}
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-3/5 h-3/5 bg-black rounded-full overflow-hidden">
          {text && (
            <span className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-poppins font-light text-white text-xs sm:text-lg">
              PLAY
            </span>
          )}
          {/* Small eye ball's box */}
          <div
            style={{
              transform: `translate(-50%, -50%) rotate(${eyeAngles.rightEye}deg)`,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full h-4"
          >
            {/* Small eye ball */}
            <div className="w-4 h-full bg-zinc-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EyesPlayComponent;
