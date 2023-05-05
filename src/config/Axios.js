import axios from "axios";
const instance = axios.create({
  baseURL: "https://skillassesment-backend.glitch.me"
});
export default instance;