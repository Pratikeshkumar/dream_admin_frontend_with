import { SERVER_API_URL, SERVER_DOMAIN } from "../constants/constants";
import axios from "axios";

const getRoseTransaction = async () => {
  const getToken = localStorage.getItem("token");
  // console.log(page,perPage,getToken)
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/DiamondTransaction/getRoseTransaction`;
  const result = await axios.get(url, config);
  return result;
};
const getMessageSubscriptionTransaction = async () => {
  const getToken = localStorage.getItem("token");
  // console.log(page,perPage,getToken)
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/DiamondTransaction/getMessageSubscriptionTransaction`;
  const result = await axios.get(url, config);
  return result;
};

const getVideoGiftTransaction = async () => {
  const getToken = localStorage.getItem("token");
  // console.log(page,perPage,getToken)
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/DiamondTransaction/getVideoGiftTransaction`;
  const result = await axios.get(url, config);
  return result;
};






export { getRoseTransaction,getMessageSubscriptionTransaction,getVideoGiftTransaction};
