import { SERVER_API_URL, SERVER_DOMAIN } from "../constants/constants";
import axios from "axios";

const getAllEmployee = async () => {
    const getToken = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/admin_employee/getEmployee`;
    const result = await axios.get(url, config);
    return result.data;
};


const addEmployee = async (Data) => {
    console.log(Data, "Datafrontendapi");
    try {
        const getToken = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${getToken}` },
        };
        const url = `${SERVER_API_URL}/admin/admin_employee/addEmployee`;
        const response = await axios.post(url, Data, config);
        console.log(response,"fromfrontend")
        return response.data;
    } catch (error) {
        throw error;
    }
};
const deleteEmployee = async (id) => {
    const getToken = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/admin_employee/deleteEmployee/${id}`;

    try {
        const result = await axios.delete(url, config);
        return result.data;
    } catch (error) {
        throw error; // Propagate the error for handling in your component
    }
};

const activateEmployee = async (id, updatedData) => {
    const getToken = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/admin_employee/activateEmployee/${id}`;

    try {
        const result = await axios.put(url, updatedData, config);
        return result.data;
    } catch (error) {
        throw error; // Propagate the error for handling in your component
    }
};

const deactivateEmployee = async (id, updatedData) => {
    const getToken = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/admin_employee/deactivateEmployee/${id}`;

    try {
        const result = await axios.put(url, updatedData, config);
        return result.data;
    } catch (error) {
        throw error; // Propagate the error for handling in your component
    }
};








export { getAllEmployee, addEmployee, deleteEmployee, activateEmployee, deactivateEmployee };
