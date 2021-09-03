import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:3001/";

const fetchGroupChat = (id: string): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}chat/load-chat/${id}`);
};

const sendGroupChat = (id: string, msg: string): Promise<AxiosResponse> => {
  return axios.post(`${BASE_URL}chat/chat-group/${id}`, { data: msg });
};

const loadGroup = (): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}group/get-all-group`);
};

const register = (userData: any): Promise<AxiosResponse> => {
  return axios.post(`${BASE_URL}auth/register`, userData);
};

const login = (credentials: any): Promise<AxiosResponse> => {
  return axios.post(`${BASE_URL}auth/login`, credentials);
};

export { fetchGroupChat, sendGroupChat, loadGroup, register, login };
