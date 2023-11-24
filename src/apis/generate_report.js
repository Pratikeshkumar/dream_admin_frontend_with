import { SERVER_API_URL, SERVER_DOMAIN } from "../constants/constants";
import axios from "axios";

const generateReport = async () => {
    const getToken = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${getToken}` },
    };
    const url = `${SERVER_API_URL}/admin/admin_video_report/getVideoReport`;
    const result = await axios.get(url, config);
    return result.data;
};
 

export {
    generateReport
};