import { v4 as uuidv4 } from 'uuid';
import TeleTwoLogo from "../favicon.ico"
import axiosInstance from '../../axios';

const { username } = localStorage;

export const chatsExamples = [
  {
    id: uuidv4(),
    name: 'TeleTwo',
    time: '1:20',
    img: TeleTwoLogo , 
    msgs: [
      {message: 'Hello! Welcome to TeleTwo! How can i help you?', messageId: uuidv4(), type: 'notmine'},
  ]}
]

export const getChats = async () => {
  try {
    const response = await axiosInstance.post('/getchats', {
      username: username
    });
    console.log(response)
    const { chatsList } = response.data;
    
    return chatsList;
  } catch (error) {
    console.error(error);
  }
};
