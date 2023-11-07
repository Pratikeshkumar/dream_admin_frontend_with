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

const sendNotification = async (notificationData) => {
  console.log(notificationData,"apifrontend")
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/Notification/sendNotification`; 

      const response = await axios.post(url, notificationData, config);
      console.log(response)
    return response;
  } catch (error) {
    throw error;
  }
};

export { getNotificationUser ,sendNotification};
