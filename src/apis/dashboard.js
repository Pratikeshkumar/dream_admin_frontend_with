import { SERVER_API_URL, SERVER_DOMAIN } from "../constants/constants";
import axios from "axios";

const userDasboard = async () => {
  const getToken = localStorage.getItem("token");
  // console.log(page,perPage,getToken)
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/admin_dashboard/getUsers`;
  const result = await axios.get(url, config);
  return result.data;
};
const getVideos = async () => {
  const getToken = localStorage.getItem("token");
  // console.log(page,perPage,getToken)
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/admin_dashboard/getVideos`;
  const result = await axios.get(url, config);
  return result.data;
};




export { userDasboard,getVideos};