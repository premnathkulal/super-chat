import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:3000/";

const fetchGroupChat = (id: string): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}chat/chat-group/${id}`);
};

const sendGroupChat = (id: string, msg: string): Promise<AxiosResponse> => {
  return axios.post(`${BASE_URL}chat/chat-group/${id}`, { data: msg });
};

export { fetchGroupChat, sendGroupChat };
