import { SERVER_API_URL, SERVER_DOMAIN } from "../constants/constants";
import axios from "axios";

const getAllAvatars = async (page, perPage) => {
  const getToken = localStorage.getItem("token");
  // console.log(page,perPage,getToken)
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/avatar/getAvatars/${page}/${perPage}`;
  const result = await axios.get(url, config);
  return result.data;
};

const addAllAvatars = async (newAvatars) => {
  console.log(newAvatars, "newAvatars");
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${getToken}`,
        "content-Type": "multipart/form-data",
      },
    };
    const url = `${SERVER_API_URL}/admin/avatar/addAvatar`;
    const response = await axios.post(url, newAvatars, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteAllAvatars = async (id) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/avatar/deleteAvatar/${id}`;

  try {
    const result = await axios.delete(url, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};

const updateAllAvatars = async (id, updatedAvatars) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/avatar/updateAvatar/${id}`;

  try {
    const result = await axios.put(url, updatedAvatars, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};

export { updateAllAvatars, deleteAllAvatars, addAllAvatars, getAllAvatars };
