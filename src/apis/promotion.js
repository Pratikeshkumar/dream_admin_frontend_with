import { SERVER_API_URL, SERVER_DOMAIN } from "../constants/constants";
import axios from "axios";

const getAllPromotion = async () => {
  const getToken = localStorage.getItem("token");
  // console.log(page,perPage,getToken)
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/promotion/getPromotion`;
  const result = await axios.get(url, config);
  return result;
};
export { getAllPromotion};