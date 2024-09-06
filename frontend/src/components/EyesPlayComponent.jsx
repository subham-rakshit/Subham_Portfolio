import React, { useEffect, useState, useRef } from "react";

function EyesPlayComponent({
  queryClass,
  text,
  extraStyle,
  scale = 1,
  position,
}) {
  const [eyeAngles, setEyeAngles] = useState({ leftEye: 0, rightEye: 0 });
  const componentRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      const eyeContainer = componentRef.current;
      if (!eyeContainer) return;

      const containerRect = eyeContainer.getBoundingClientRect();

      const leftEyeElement = eyeContainer.querySelector(".left-eye");
      const rightEyeElement = eyeContainer.querySelector(".right-eye");

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

    const sectionElement = document.querySelector(`.${queryClass}`);

    if (sectionElement) {
      sectionElement.addEventListener("mouseenter", () => {
        sectionElement.addEventListener("mousemove", handleMouseMove);
      });

      sectionElement.addEventListener("mouseleave", () => {
        sectionElement.removeEventListener("mousemove", handleMouseMove);
      });
    }

    return () => {
      if (sectionElement) {
        sectionElement.removeEventListener("mouseenter", () => {
          sectionElement.removeEventListener("mousemove", handleMouseMove);
        });
      }
    };
  }, [queryClass]);

  return (
    <div
      ref={componentRef}
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
      {/* LEFT Eye */}
      <div className="relative w-32 h-32 rounded-full sm:w-44 sm:h-44 bg-zinc-200">
        {/* Black Eye */}
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-3/5 h-3/5 bg-black rounded-full overflow-hidden">
          {text && (
            <span className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-poppins font-light text-white text-xs sm:text-lg">
              PLAY
            </span>
          )}
          {/* Small White Eye Ball */}
          <div
            style={{
              transform: `translate(-50%, -50%) rotate(${eyeAngles.leftEye}deg)`,
            }}
            className="left-eye absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full h-4"
          >
            <div className="w-4 h-full rounded-full bg-zinc-200"></div>
          </div>
        </div>
      </div>

      {/* RIGHT Eye */}
      <div className="relative w-32 h-32 rounded-full sm:w-44 sm:h-44 bg-zinc-200">
        {/* Black Eye Ball */}
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-3/5 h-3/5 bg-black rounded-full overflow-hidden">
          {text && (
            <span className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-poppins font-light text-white text-xs sm:text-lg">
              PLAY
            </span>
          )}
          {/* Small White Eye Ball */}
          <div
            style={{
              transform: `translate(-50%, -50%) rotate(${eyeAngles.rightEye}deg)`,
            }}
            className="right-eye absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full h-4"
          >
            <div className="w-4 h-full rounded-full bg-zinc-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EyesPlayComponent;
