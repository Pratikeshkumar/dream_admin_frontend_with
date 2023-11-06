import { SERVER_API_URL } from "../constants/constants";
import axios from "axios";

// const getAllUsers = async (page, perPage) => {
//   const getToken = localStorage.getItem("token");
//   const config = {
//     headers: { Authorization: `Bearer ${getToken}` },
//   };
//   const url = `${SERVER_API_URL}/admin/users/getUsers/${page}/${perPage}`;
//   const result = await axios.get(url, config);
//   return result.data;
// };

const getAllUsers = async (page,searchTerm = '') => {
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/users/getUsers?page=${page}&search=${searchTerm}`;
    const response = await axios.get(url, config);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};



const deleteUser = async (id) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/users/deleteUsers/${id}`;

  try {
    const result = await axios.delete(url, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};

const updateResourceActiveStatus = async (id, isActive) => {
 
  const getToken = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/users/updateUserActiveStatus/${id}`;

  try {
    const result = await axios.patch(url, {isActive}, config);
    console.log(result,"resultfromfrontend")
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};






const getBlockUsers = async (page, perPage) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/users/getBlockedusers/${page}/${perPage}`;
  const result = await axios.get(url, config);
  return result.data;
};


const updateUserStatus = async (userId, status) => {
  console.log(userId, status,"frontend")
  const authToken = localStorage.getItem('token'); // Assuming you store the user's token in localStorage
  const apiUrl = `${SERVER_API_URL}/admin/users/updateUserStatus/${userId}`;
  
  try {
    const response = await axios.patch(apiUrl, { status }, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    
    return response;
  } catch (error) {
    throw error; // You can handle the error in your component
  }
};
const getUserVideos = async (id) => {
  console.log(id)
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/users/getUsersVideo/${id}`;
    const response = await axios.get(url,config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user videos:", error);
    throw error;
  }
};

export { getAllUsers,deleteUser,updateResourceActiveStatus,getBlockUsers ,updateUserStatus,getUserVideos};
