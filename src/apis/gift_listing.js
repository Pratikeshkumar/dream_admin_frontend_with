import { SERVER_API_URL, SERVER_DOMAIN } from "../constants/constants";
import axios from "axios";

const getGiftListing = async (page, perPage) => {
  const getToken = localStorage.getItem("token");
  // console.log(page,perPage,getToken)
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/giftlisting/getGiftListing/${page}/${perPage}`;
  const result = await axios.get(url, config);
  return result.data;
};



const addGiftListing = async (giftlisting) => {
  console.log(giftlisting, "giftlisting");
  try {
    const getToken = localStorage.getItem("token");
    const config = {
        headers: {
          Authorization: `Bearer ${getToken}`,
          "content-Type": "multipart/form-data",
        },
      };
    const url = `${SERVER_API_URL}/admin/giftlisting/addGiftListing`;
    const response = await axios.post(url,giftlisting,config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const deleteGiftListing = async (id) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/giftlisting/deleteGiftListing/${id}`;

  try {
    const result = await axios.delete(url, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};



export { getGiftListing, addGiftListing, deleteGiftListing};
