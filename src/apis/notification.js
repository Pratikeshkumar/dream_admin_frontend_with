import { SERVER_API_URL, SERVER_DOMAIN } from "../constants/constants";
import axios from "axios";

const getNotificationUser = async () => {
  const getToken = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/Notification/getNotification`;
  const result = await axios.get(url, config);
  return result.data;
};
export { getNotificationUser };
