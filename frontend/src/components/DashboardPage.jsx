import React from "react";
import { FaClipboardCheck, FaLongArrowAltUp } from "react-icons/fa";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { IoRibbon } from "react-icons/io5";

function DashboardPage() {
  return (
    <div className="flex-1 min-h-screen px-5">
      <div className="w-full max-w-[1200px] mx-auto py-10">
        {/* Cards */}
        <div className="flex flex-wrap items-center w-full gap-5">
          {/* Total Projects */}
          <div className="w-full max-w-[350px] h-[200px] whitespace-nowrap rounded-lg shadow-customInset hover:shadow-custom p-5 flex justify-between">
            <div className="flex flex-col gap-5 font-poppins">
              <h1>Total Projects</h1>
              {/* TODO - Number of projects  */}
              <span className="text-xl font-semibold text-zinc-700">4</span>
              <div className="flex items-center">
                <FaLongArrowAltUp size="18" color="#4D7C0F" />
                {/* TODO - Number of projects in last month  */}
                <span className="text-[#4D7C0F] text-sm">2</span>
                <span className="ml-2 text-sm">Last month</span>
              </div>
            </div>
            <FaClipboardCheck size="40" className="text-lime-700" />
          </div>

          {/* Total Skills */}
          <div className="w-full max-w-[350px] h-[200px] whitespace-nowrap rounded-lg shadow-customInset hover:shadow-custom p-5 flex justify-between">
            <div className="flex flex-col gap-5 font-poppins">
              <h1>Total Skills</h1>
              {/* TODO - Number of projects  */}
              <span className="text-xl font-semibold text-zinc-700">2</span>
              <div className="flex items-center">
                <FaLongArrowAltUp size="18" color="#4D7C0F" />
                {/* TODO - Number of projects in last month  */}
                <span className="text-[#4D7C0F] text-sm">4</span>
                <span className="ml-2 text-sm">Last month</span>
              </div>
            </div>
            <VscLightbulbSparkle size="40" className="text-amber-600" />
          </div>

          {/* Total Certificates */}
          <div className="w-full max-w-[350px] h-[200px] whitespace-nowrap rounded-lg shadow-customInset hover:shadow-custom p-5 flex justify-between">
            <div className="flex flex-col gap-5 font-poppins">
              <h1>Total Certificates</h1>
              {/* TODO - Number of projects  */}
              <span className="text-xl font-semibold text-zinc-700">5</span>
              <div className="flex items-center">
                <FaLongArrowAltUp size="18" color="#4D7C0F" />
                {/* TODO - Number of projects in last month  */}
                <span className="text-[#4D7C0F] text-sm">6</span>
                <span className="ml-2 text-sm">Last month</span>
              </div>
            </div>
            <IoRibbon size="40" className="text-fuchsia-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
