import axios from "axios";
import { url } from "../../Redux/Api";

export const SendMessage = async ({ name, email, message, setSend }) => {
  try {
    const data = { name, email, message };
    let res = await axios.post(`${url}/send-email`, data);
    if (res) {
      setSend(res.data);
    }
  } catch (error) {
    alert(error.response.data.msg);
  }
};
