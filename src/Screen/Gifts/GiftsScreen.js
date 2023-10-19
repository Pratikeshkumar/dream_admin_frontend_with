import React, { useEffect } from "react";
import IncludeSideBar from "../../Components/Sidebar/IncludeSideBar";

const Giftsapi = require("../../apis/gifts");

function GiftsScreen() {
  const getGifts = async () => {
    try {
      const response = await Giftsapi.getAllGifts();
      console.log(response, "response");
    } catch (error) {
      console.error("Error fetching hobbies:", error);
    } finally {
    }
  };

  useEffect(() => {
    getGifts();
  },[]); // Include currentPage and perPage as dependencies

  return (
    <IncludeSideBar>
      <div>
        <p>Here we are displaying the section of Gifts Details.</p>
      </div>
    </IncludeSideBar>
  );
}

export default GiftsScreen;
