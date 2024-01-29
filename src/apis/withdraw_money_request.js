import {SERVER_API_URL, SERVER_DOMAIN} from '../constants/constants'
import axios from 'axios'

const getwithdrawmoneyrequest=async()=>{
const getToken=localStorage.getItem("token")
const config={
    headers: { Authorization: `Bearer ${getToken}` },

}
const url = `${SERVER_API_URL}/admin/withdraw_request/getwithdrawrequest`;

const result = await axios.get(url, config);
return result.data;

}

export{
    getwithdrawmoneyrequest
}