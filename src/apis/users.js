import { SERVER_API_URL } from "../constants/constants";
import axios from "axios";

const getAllUsers = async (page, perPage) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/users/getUsers/${page}/${perPage}`;
  const result = await axios.get(url, config);
  return result.data;
};
const deleteUser = async (id) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/users/deleteUsers/${id}`;

  try {
    const result = await axios.delete(url, config);
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};

export { getAllUsers,deleteUser };
