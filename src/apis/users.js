import { SERVER_API_URL } from "../constants/constants";
import axios from "axios";

const getAllBasicUsers = async (page, searchTerm = '') => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  // const url = `${SERVER_API_URL}/admin/users/getBasicUsers`;
  const url = `${SERVER_API_URL}/admin/users/getBasicUsers?page=${page}&search=${searchTerm}`;

  const result = await axios.get(url, config);
  return result.data;
};
const getAllPremiumUsers = async (page,searchTerm = '') => {
  console.log(page,'page....')
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/users/getPremiumUsers?page=${page}&search=${searchTerm}`;
  const result = await axios.get(url, config);
  return result.data;
};

const getAllUsers = async (page, searchTerm = '') => {
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/users/getUsers?page=${page}&search=${searchTerm}`;
    const response = await axios.get(url, config);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
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



const updateResourceActiveStatus = async (id, isActive, role) => {
  const getToken = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/users/updateUserActiveStatus/${id}`;

  try {
    const result = await axios.patch(url, { isActive, role }, config);
    console.log(result, "resultfromfrontend");
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};






const getBlockUsers = async (page, perPage) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/users/getBlockedusers/${page}/${perPage}`;
  const result = await axios.get(url, config);
  return result.data;
};


const updateUserStatus = async (userId, status) => {
  console.log(userId, status, "frontend")
  const authToken = localStorage.getItem('token'); // Assuming you store the user's token in localStorage
  const apiUrl = `${SERVER_API_URL}/admin/users/updateUserStatus/${userId}`;

  try {
    const response = await axios.patch(apiUrl, { status }, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response;
  } catch (error) {
    throw error; // You can handle the error in your component
  }
};
const getUserVideos = async (id) => {
  console.log(id)
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/users/getUsersVideo/${id}`;
    const response = await axios.get(url, config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user videos:", error);
    throw error;
  }
};

const SendGift = async (data) => {
  console.log(data, "datainuserfrontend")
  try {
    const getToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/users/sendGift`;


    const response = await axios.post(url, data, config);
    // console.log(response,"response")
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllUsersPost = async (id) => {
  console.log(id, "fromfrontend")
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/users/getuser_photo_post/${id}`;
  const result = await axios.get(url, config);
  return result.data;
};

const changeUserAccountType = async (id, account_type) => {
  console.log(id, account_type, "changeAccount_typeFrontend")
  const getToken = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  const url = `${SERVER_API_URL}/admin/users/changeUserAccount_type/${id}`;

  try {
    const result = await axios.patch(url, { account_type }, config);
    console.log(result, "resultfromfrontend");
    return result.data;
  } catch (error) {
    throw error; // Propagate the error for handling in your component
  }
};



const getlikeintraction = async (id) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  // const url = `${SERVER_API_URL}/admin/users/getBasicUsers`;
  const url = `${SERVER_API_URL}/admin/users/getLikeinteraction/${id}`;

  const result = await axios.get(url, config);
  return result.data;
};

const getsendlikeintraction=async(id)=>{
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
const url=`${SERVER_API_URL}/admin/users/getsenderlikedata/${id}`
const result=await axios.get(url,config);
return result.data;
}

const getcommentintraction = async (id) => {
  const getToken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${getToken}` },
  };
  // const url = `${SERVER_API_URL}/admin/users/getBasicUsers`;
  const url = `${SERVER_API_URL}/admin/users/getPostCommentInteraction/${id}`;

  const result = await axios.get(url, config);
  return result.data;
};

const getrecivedcommetintraction=async(id)=>{
  const getToken=localStorage.getItem("token");
  const config={
    headers:{Authorization: `Bearer ${getToken}`},
  }
  const url = `${SERVER_API_URL}/admin/users/getrecivedcomment/${id}`;
  const result=await axios.get(url,config)
  return result.data
}


const getdiamondintraction=async(id)=>{
  const getToken=localStorage.getItem("token");
  const config={
    headers: { Authorization: `Bearer ${getToken}`},
  }
  const url= `${SERVER_API_URL}/admin/users/getdiamondinteraction/${id}`
  const result=await axios.get(url,config);
  return result.data
}

const getshareintraction=async(id)=>{
const getToken=localStorage.getItem("token");
const config={
  headers:{Authorization:`Bearer ${getToken}`},
}
const url=`${SERVER_API_URL}/admin/users/getshareintraction/${id}`
const result=await axios.get(url,config);
return result.data

}


const getsenddiamond=async(id)=>{
  const getToken=localStorage.getItem("token");
  const config={
    headers: { Authorization: `Bearer ${getToken}`},
  }
  const url= `${SERVER_API_URL}/admin/users/getsenderdiamond/${id}`
  const result=await axios.get(url,config);
  return result.data

}

const getrecivedshare=async(id)=>{
  const getToken=localStorage.getItem("token");
  const config={
    headers:{Authorization:`Bearer ${getToken}`}
  }
  const url= `${SERVER_API_URL}/admin/users/getrecivedshare/${id}`
  const result=await axios.get(url,config);
  return result.data

}
export { getAllUsers, deleteUser, updateResourceActiveStatus, getBlockUsers, updateUserStatus, getUserVideos, SendGift, getAllBasicUsers, getAllPremiumUsers, getAllUsersPost, changeUserAccountType, getlikeintraction,getcommentintraction,getdiamondintraction,getshareintraction ,getsenddiamond,getsendlikeintraction,getrecivedcommetintraction,getrecivedshare};
