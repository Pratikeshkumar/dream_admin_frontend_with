import { SERVER_API_URL, SERVER_DOMAIN } from "../constants/constants";
import axios from "axios";

const getAllUserVideo = async (page, perPage) => {
  const getToken = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/userallvideo/getAllUserVideos/${page}/${perPage}`;
  const result = await axios.get(url, config);
  // console.log(result)
  return result.data;
};

const deleteVideos = async (id) => {
  console.log(id, "IDFROMAPI")
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/userallvideo/deleteVideos/${id}`;

  try {
    const result = await axios.delete(url, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};


const updateLikeVideos = async (id, like) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/userallvideo/updateLikeVideos/${id}`;

  try {
    // Send the like value as part of the request body
    const data = { like };
    console.log(data, "data")

    const result = await axios.patch(url, data, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};



const updateDiamondVideos = async (id, diamond_value) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/userallvideo/updateVideoDiamond/${id}`;

  try {
    // Send the Diamond_value value as part of the request body
    const data = { diamond_value };
    console.log(data, "data")

    const result = await axios.patch(url, data, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};



const updateVideoShared = async (id, shared) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/userallvideo/updateVideoShare/${id}`;

  try {
    // Send the Diamond_value value as part of the request body
    const data = { shared };
    console.log(data, "data")

    const result = await axios.patch(url, data, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};
const updateVideoCount = async (id, viewCount) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/userallvideo/updateVideoCount/${id}`;

  try {
    // Send the Diamond_value value as part of the request body
    const data = { viewCount };
    console.log(data, "data")

    const result = await axios.patch(url, data, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};



const blockVideo = async (id) => {
  console.log(id)
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/userallvideo/BlockVideo/${id}`;

  try {
    const result = await axios.patch(url, null, config);

    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};
const UnblockVideo = async (id) => {
  console.log(id)
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/userallvideo/updateUnBlockVideo/${id}`;

  try {
    const result = await axios.patch(url, null, config);

    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};

const getBlockedUserVideo = async (page, perPage) => {
  const getToken = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/userallvideo/getBlockedVideo/${page}/${perPage}`;
  const result = await axios.get(url, config);
  // console.log(result)
  return result.data;
};






const updateBlockedVideoStatus = async (videoId) => {
  const getToken = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };

  const url = `${SERVER_API_URL}/admin/userallvideo/UnblockVideoStatus/${videoId}`;

  try {
    const result = await axios.patch(url, { blocked: false }, config);
    return result.data; // Return response data (if needed)
  } catch (error) {
    // Handle error or throw it for the caller to handle
    throw error;
  }
};

const deleteVideoViewCount = async (id, viewCount) => {
  const getToken = localStorage.getItem("token");
  console.log(getToken);
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/userallvideo/deleteVideoCount/${id}?viewCount=${viewCount}`;

  try {
    const result = await axios.delete(url, config);
    console.log(result);
    return result.data;
  } catch (error) {
    throw error;
  }
};







export {
  getAllUserVideo,
  deleteVideos,
  updateLikeVideos,
  blockVideo,
  UnblockVideo,
  getBlockedUserVideo,
  updateBlockedVideoStatus,
  updateDiamondVideos,
  updateVideoShared,
  updateVideoCount,
  deleteVideoViewCount
}