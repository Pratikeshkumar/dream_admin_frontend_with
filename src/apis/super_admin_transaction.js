import { SERVER_API_URL } from "../constants/constants";
import axios from "axios";

const addMoneyToSuperAdmin = async (data) => {
  console.log(data, "data_super_admin_transaction")
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/super_admin_transaction/super_admintransactions`;

    // Assuming 'occupationData' is an array of occupation objects
    const response = await axios.post(url, data, config);
    // console.log(response,"response")
    return response;
  } catch (error) {
    throw error;
  }
};


const SendMoneyToAdmin = async (data) => {
  console.log(data, "data_admin_transaction")
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/super_admin_transaction/sendMoneyToAdmin`;

    // Assuming 'occupationData' is an array of occupation objects
    const response = await axios.post(url, data, config);
    // console.log(response,"response")
    return response;
  } catch (error) {
    throw error;
  }
};
const getWalletDetails = async () => {
  const getToken = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/super_admin_transaction/getWalletDetails`;
  const result = await axios.get(url, config);
  return result;
};

const getSuper_admin_transaction = async (page) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/super_admin_transaction/getSuper_admin_transaction?page=${page}`;
  const result = await axios.get(url, config);
  return result; 
};


const getadmin_transaction = async (page) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/super_admin_transaction/getadmin_transaction?page=${page}`;
  const result = await axios.get(url, config);
  return result; 
};



const SendMoneyToUser = async (data) => {
  console.log(data, "data_sendMoney_transaction")
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/super_admin_transaction/sendMoneyToUser`;

    // Assuming 'occupationData' is an array of occupation objects
    const response = await axios.post(url, data, config);
    console.log(response,"response")
    return response;
  } catch (error) {
    throw error;
  }
};




export {
  addMoneyToSuperAdmin, SendMoneyToAdmin, getWalletDetails, getSuper_admin_transaction,getadmin_transaction,SendMoneyToUser
}