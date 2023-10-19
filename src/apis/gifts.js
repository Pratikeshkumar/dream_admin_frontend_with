import { SERVER_API_URL, SERVER_DOMAIN } from "../constants/constants";
import axios from "axios";

const getAllGifts = async (page, perPage) => {
  const getToken = localStorage.getItem("token");
  // console.log(page,perPage,getToken)
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/gifts/getGifts/${page}/${perPage}`;
  const result = await axios.get(url, config);
  return result;
};
export { getAllGifts};
