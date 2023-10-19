import { SERVER_API_URL, SERVER_DOMAIN } from "../constants/constants";
import axios from "axios";

const getAllCountries = async (page, perPage) => {
  const getToken = localStorage.getItem("token");
  // console.log(page,perPage,getToken)
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/countries/getCountries/${page}/${perPage}`;
  const result = await axios.get(url, config);
  return result.data;
};




const addAllCountries = async (newCountry) => {
  console.log(newCountry, "countryData");
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/countries/addCountries`;
    const response = await axios.post(url, newCountry, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};



const deleteAllCOuntries = async (id) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/countries/deleteCountries/${id}`;

  try {
    const result = await axios.delete(url, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};




const updateAllCountries = async (id, updatedCountries) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/countries/updateCountries/${id}`;

  try {
    const result = await axios.put(url, updatedCountries, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};


export { getAllCountries,deleteAllCOuntries,updateAllCountries,addAllCountries};
