import { SERVER_API_URL, SERVER_DOMAIN } from "../constants/constants";
import axios from "axios";

// const getAllLanguages = async (page, perPage) => {
//   const getToken = localStorage.getItem("token");
//   // console.log(page,perPage,getToken)
//   const config = {
//     headers: { Authorization: `Bearer ${getToken}` },
//   };
//   const url = `${SERVER_API_URL}/admin/language/getLanguage/${page}/${perPage}`;
//   const result = await axios.get(url, config);
//   return result.data;
// };

const getAllLanguages = async (page, perPage) => {
  const getToken = localStorage.getItem("token");
  
  const config = {
    headers: { Authorization: `Bearer ${getToken} `},
  };
  try {
      const url = `${SERVER_API_URL}/admin/language/getLanguage`;
      const params = { page, perPage };
      const result = await axios.get(url, { params }, config);
      return result.data;
    //  console.log(result)
  } catch (error) {
      console.log(error);
     }
};



const addAllLanguages = async (newCountry) => {
 
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/language/addLanguage`;
    const response = await axios.post(url,newCountry,config);
    return response.data;
  } catch (error) {
    throw error;
  }
};



const deleteAllLanguages= async (id) => {

  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/language/deleteLanguage/${id}`;

  try {
    const result = await axios.delete(url, config);
    console.log(result,"result")
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};




const updateAllLanguages = async (id, updatedLanguages) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/language/updateLanguage/${id}`;

  try {
    const result = await axios.put(url, updatedLanguages, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};


export { getAllLanguages,addAllLanguages,updateAllLanguages,deleteAllLanguages};
