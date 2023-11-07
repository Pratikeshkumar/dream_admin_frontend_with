import axios from 'axios'
import {
    SERVER_API_URL,
    SERVER_DOMAIN,
} from '../constants/constants'

const adminLogin = async (data) => {
    console.log(data)
    const url = `${SERVER_API_URL}/admin/auth/signin`
    const result = await axios.post(url, data)
    return result.data
}

const forgotPassword = async (data) => {
    console.log(data,"data")
    const url = `${SERVER_API_URL}/admin/auth/forgotPassword`
    const result = await axios.post(url, data)
    return result
}

const completePasswordReset = async (data) => {
    const url = `${SERVER_API_URL}/admin/auth/completePasswordReset`
    const result = await axios.patch(url, data)
    return result
}

export {
    adminLogin,
    forgotPassword,
    completePasswordReset
}