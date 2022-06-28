import axios from "axios";

const userhandler = axios.create({
    baseURL: "https://chat-tts-service.herokuapp.com/"
});

export default userhandler;