import { axiosInstance } from "../../../config";

export const SendMessage = async ({
    name,
    email,
    message,
    setSend,
}) => {
    try {
        const data = { name, email, message };
        let res = await axiosInstance.post(`send-email`, data);
        if (res) {
            setSend(res.data);
        }
    } catch (error) {
        alert(error.response.data.msg);
    }
};