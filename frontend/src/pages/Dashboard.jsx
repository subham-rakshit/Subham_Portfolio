import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashSideBar } from "../components";
import { MdToc } from "react-icons/md";

function Dashboard() {
  const [tab, setTab] = useState("");
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabURL = urlParams.get("tab");

    if (tabURL) {
      setTab(tabURL);
    } else {
      setTab("");
    }
  }, [location.search]);
  return (
    <div className="relative w-full min-h-screen flex bg-[#FBF9ED]">
      <DashSideBar />
      <div className="flex-1 bg-red-200 content-container"></div>
    </div>
  );
}

export default Dashboard;
