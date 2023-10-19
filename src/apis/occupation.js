import { SERVER_API_URL } from "../constants/constants";
import axios from "axios";

const addAllOccupation = async (data) => {
  // console.log(data,"occupation")
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/occupation/addOccupations`;
    
    // Assuming 'occupationData' is an array of occupation objects
    const response = await axios.post(url, data, config);
    // console.log(response,"response")
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllOccupation =  async (page,perPage)=> {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/occupation/getOccupations/${page}/${perPage}`;
  const result = await axios.get(url, config);
  return result.data;

}

const updateOccupation = async (id, newUpdatedData) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/occupation/updateOccupation/${id}`;

  try {
    const result = await axios.put(url, newUpdatedData, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};

const deleteOccupation = async (id) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/occupation/deleteOccupation/${id}`;

  try {
    const result = await axios.delete(url, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};


 export {
    addAllOccupation,
    getAllOccupation,
    updateOccupation,
    deleteOccupation
 }