import React, { useEffect, useState } from "react";

function EyesPlayComponent({
  queryClass,
  text,
  extraStyle,
  scale = 1,
  position,
}) {
  const [eyeAngle, setEyeAngle] = useState(0);

  useEffect(() => {
    // When mouse enters the eye section, find the mouse location
    document
      .querySelector(`.${queryClass}`)
      .addEventListener("mousemove", (e) => {
        let mouseX = e.clientX;
        let mouseY = e.clientY;

        // Find the center point of the screen in X and Y axis
        const screenCenterPointX = window.innerWidth / 2;
        const screenCenterPointY = window.innerHeight / 2;

        // Find the distance between Mouse point and Screen center point
        let deltaX = mouseX - screenCenterPointX;
        let deltaY = mouseY - screenCenterPointY;

        let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        // For inverting result you have to do (angle - 180 deg)
        setEyeAngle(angle - 180);
      });
  }, [eyeAngle]);

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
      <div className="relative w-32 sm:w-44 h-32 sm:h-44 rounded-full bg-zinc-200">
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
              transform: `translate(-50%, -50%) rotate(${eyeAngle}deg)`,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full h-4"
          >
            {/* Small eye ball */}
            <div className="w-4 h-full bg-zinc-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* SECOND Eye */}
      <div className="relative w-32 sm:w-44 h-32 sm:h-44 rounded-full bg-zinc-200">
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
              transform: `translate(-50%, -50%) rotate(${eyeAngle}deg)`,
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
