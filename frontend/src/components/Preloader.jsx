import React from "react";

const Preloader = () => {
  return (
    <div className=" fixed z-10 flex items-center justify-center w-full h-screen bg-[#fbece0]">
      <video
        autoPlay
        muted
        className="w-full h-full object-fit"
      >
        <source src="/preloader.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Preloader;
