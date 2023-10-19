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
    console.log(id,"IDFROMAPI")
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





  export{
    getAllUserVideo,deleteVideos
  }