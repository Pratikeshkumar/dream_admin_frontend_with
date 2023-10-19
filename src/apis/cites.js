import { SERVER_API_URL, SERVER_DOMAIN } from "../constants/constants";
import axios from "axios";

const getAllCities = async (page, perPage) => {
  const getToken = localStorage.getItem("token");
  // console.log(page,perPage,getToken)
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/cities/getCities/${page}/${perPage}`;
  const result = await axios.get(url, config);
  return result.data;
};




const addAllCities = async (newCities) => {
  console.log(newCities, "countryData");
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/cities/addCities`;
    const response = await axios.post(url,newCities, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};



const deleteAllcities = async (id) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/cities/deleteCities/${id}`;

  try {
    const result = await axios.delete(url, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};




const updateAllCities = async (id, updatedCities) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/cities/updateCities/${id}`;

  try {
    const result = await axios.put(url, updatedCities, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};


export { getAllCities,deleteAllcities,updateAllCities,addAllCities};
