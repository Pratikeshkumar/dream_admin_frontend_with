import { SERVER_API_URL, SERVER_DOMAIN } from "../constants/constants";
import axios from "axios";

const getAllhobbies = async (page, perPage) => {
  const getToken = localStorage.getItem("token");
  // console.log(page,perPage,getToken)
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/hobbies/getHobbies/${page}/${perPage}`;
  const result = await axios.get(url, config);
  return result.data;
};
const addHobby = async (hobbyData) => {
  console.log(hobbyData, "hobbyData");
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/hobbies/addHobbies`;
    const response = await axios.post(url, hobbyData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const deleteHobby = async (id) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/hobbies/deleteHobbies/${id}`;

  try {
    const result = await axios.delete(url, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};

const updateHobby = async (id, updatedHobbyData) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/hobbies/updateHobbies/${id}`;

  try {
    const result = await axios.put(url, updatedHobbyData, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};

export { getAllhobbies, addHobby, deleteHobby, updateHobby };
