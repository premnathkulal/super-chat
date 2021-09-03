export const SocketMutations = {
  WELCOME_MESSAGE: "WELCOME_MESSAGE_MUTATIONS",
  MESSAGE_NOTIFICATIONS: "MESSAGE_NOTIFICATIONS_MUTATIONS",
  GENERAL_NOTIFICATIONS: "GENERAL_NOTIFICATIONS_MUTATIONS",
  USER_TYPING: "USER_TYPING_MUTATIONS",
  JOIN_ROOM: "JOIN_ROOM_MUTATIONS",
  LEAVE_ROOM: "LEAVE_ROOM_MUTATIONS",
};

export const SocketActions = {
  CONNECTION: "CONNECTION_ACTIONS",
  WELCOME_MESSAGE: "WELCOME_MESSAGE_ACTIONS",
  MESSAGE_NOTIFICATIONS: "MESSAGE_NOTIFICATIONS_ACTIONS",
  GENERAL_NOTIFICATIONS: "GENERAL_NOTIFICATIONS_ACTIONS",
  USER_TYPING: "USER_TYPING_ACTIONS",
  JOIN_ROOM: "JOIN_ROOM_ACTIONS",
  LEAVE_ROOM: "LEAVE_ROOM_ACTIONS",
  STARTED_TYPING: "STARTED_TYPING_ACTION",
};

export const ContactMutations = {
  SET_LOADING: "LOADING_MUTATIONS_MUTATIONS",
  ADD_CONTACT: "ADD_CONTACT_MUTATIONS",
  DELETE_CONTACT: "DELETE_CONTACT_MUTATIONS",
  UPDATE_CONTACT: "UPDATE_CONTACT_MUTATIONS",
  LOAD_CONTACTS: "LOAD_CONTACTS_MUTATIONS",
  SET_USER_ID: "SET_USER_ID_MUTATIONS",
  CREATE_GROUP: "CREATE_GROUP_MUTATIONS",
  GROUP_CREATED: "GROUP_CREATED_MUTATIONS",
  LOAD_GROUP: "LOAD_GROUP_MUTATIONS",
};

export const ContactActions = {
  SET_LOADING: "LOADING_ACTIONS_ACTIONS",
  ADD_CONTACT: "ADD_CONTACT_ACTIONS",
  DELETE_CONTACT: "DELETE_CONTACT_ACTIONS",
  UPDATE_CONTACT: "UPDATE_CONTACT_ACTIONS",
  LOAD_CONTACTS: "LOAD_CONTACTS_ACTIONS",
  SET_USER_ID: "SET_USER_ID_ACTIONS",
  GROUP_CREATED: "GROUP_CREATED_ACTIONS",
  CREATE_GROUP: "CREATE_GROUP_ACTION",
  LOAD_GROUP: "LOAD_GROUP_ACTION",
};

export const UserMutations = {
  SET_LOADING: "SET_LOADING_MUTATIONS",
  SET_USER_INFO: "SET_USER_INFO_MUTAtIONS",
  GET_USER_INFO: "GET_USER_INFO_MUTAtIONS",
  SET_USER_ID_EMAIL: "SET_USER_ID_EMAIL_MUTATIONS",
  SET_USER_PIC: "SET_USER_PIC_MUTATIONS",
  GET_USER_PIC: "GET_USER_PIC_MUTATIONS",
  REGISTER: "REGISTER_MUTATIONS",
  REGISTER_ERROR: "REGISTER_ERROR_MUTATIONS",
  LOGIN: "LOGIN_MUTATIONS",
  LOGIN_ERROR: "LOGIN_ERROR_MUTATIONS",
};

export const UserActions = {
  SET_LOADING: "SET_LOADING_ACTIONS",
  SET_USER_INFO: "SET_USER_INFO_ACTIONS",
  GET_USER_INFO: "GET_USER_INFO_ACTIONS",
  SET_USER_ID_EMAIL: "SET_USER_ID_EMAIL_ACTIONS",
  SET_USER_PIC: "SET_USER_PIC_ACTIONS",
  GET_USER_PIC: "GET_USER_PIC_ACTIONS",
  LOGIN: "LOGIN_ACTIONS",
  REGISTER: "REGISTER_ACTIONS",
};

export const ChatMutations = {
  SET_LOADING: "SET_LOADING_MUTATIONS",
  LOAD_CHAT: "LOAD_CHAT_MUTAtIONS",
  TYPING: "MSG_TYPING_MUTATIONS",
  SEND_MESSAGE: "SEND_MESSAGE_MUTATIONS",
  RECEIVE_MESSAGE: "RECEIVE_MESSAGE_MUTATIONS",
};

export const ChatActions = {
  SET_LOADING: "SET_LOADING_ACTIONS",
  LOAD_CHAT: "LOAD_CHAT_ACTIONS",
  TYPING: "MSG_TYPING_ACTIONS",
  SEND_MESSAGE: "SEND_MESSAGE_ACTIONS",
  RECEIVE_MESSAGE: "RECEIVE_MESSAGE_ACTIONs",
};
