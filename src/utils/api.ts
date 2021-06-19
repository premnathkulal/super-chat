import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://super-chat-e211c-default-rtdb.firebaseio.com/";

const getUserInfo = (userId: string | null): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}${userId}/userInfo.json`);
};

const updateUserInfo = (
  userInfo: any,
  userId: string | null
): Promise<AxiosResponse> => {
  return axios.put(`${BASE_URL}${userId}/userInfo.json`, userInfo);
};

const getProfilePic = async (userName: string) => {
  return await axios.get(`${BASE_URL}${userName}.json`);
};

const updateProfilePic = (
  downloadUrl: any,
  userEmail: string | null
): Promise<AxiosResponse> => {
  return axios.put(`${BASE_URL}${userEmail}.json`, downloadUrl);
};

const getContactList = (userId: string | null): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}${userId}/contacts.json`);
};

const updateContactList = (
  conactsList: any,
  userId: string | null
): Promise<AxiosResponse> => {
  return axios.put(`${BASE_URL}${userId}/contacts.json`, conactsList);
};

export {
  getUserInfo,
  updateUserInfo,
  getContactList,
  updateContactList,
  updateProfilePic,
  getProfilePic,
};
