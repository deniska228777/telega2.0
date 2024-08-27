import Chat from './chatcontroller/Chat.js';
import Message from './chatcontroller/Message.js';
import User from './usercontroller/User.js';
import { UserOperations } from './usercontroller/UserOperations.js';
import { v4 as uuid } from 'uuid';

function getOrderedUserIds(userId1, userId2) {
  if (userId1.toString() < userId2.toString()) {
    return { firstUser: userId1, secondUser: userId2 };
  } else {
    return { firstUser: userId2, secondUser: userId1 };
  }
}

export const getChats = async (req, res) => {
  const { username } = req.body;

  const userFromDB = await UserOperations.findOneByUsername({username: username});

  if (!userFromDB) {
    return res.status(400).send('user is not found')
  }

  const { chats } = userFromDB;
  
  const chatsList = await Chat.find({chat_id: chats})

  
  const updatedChatsList = await Promise.all(chatsList.map(async (chat) => {
    const firstUser = await UserOperations.findOneById({ id: chat.firstUser });
    const secondUser = await UserOperations.findOneById({ id: chat.secondUser });
    const msgs = await Promise.all(chat.messages.map(async (msg) => {
      const msgsFromDB = await Message.findById(msg)
      return {
        msgs: msgsFromDB
      }
    }))

    return {
      ...chat.toObject(),
      firstUser: firstUser.username,
      secondUser: secondUser.username,
      messages: msgs
    };
  }));

  console.log(chatsList[0].messages)

  return res.status(200).send({
    chatsList: updatedChatsList
  });
}

export const createChat = async (req, res) => {
  try {
    const { firstUser, secondUser } = req.body;
  
    if (!firstUser || !secondUser) {
      return res.status(400).send('chat members are required!');    
    }

    const firstUserUsername = await UserOperations.findOneByUsername({username: firstUser})
    const secondUserUsername = await UserOperations.findOneByUsername({username: secondUser})

    if (!firstUserUsername || !secondUserUsername) {
      res.status(400).send('грр');
    }

    const { firstUser: orderedFirstUser, secondUser: orderedSecondUser } = getOrderedUserIds(firstUserUsername._id, secondUserUsername._id)

    const createChat = await Chat.create({
      chat_id: uuid(),
      firstUser: orderedFirstUser,
      secondUser: orderedSecondUser,
      name_1: firstUserUsername.username,
      name_2: secondUserUsername.username
    })

    await User.findByIdAndUpdate(orderedFirstUser, {$push: { chats: createChat.chat_id }});
    await User.findByIdAndUpdate(orderedSecondUser, {$push: { chats: createChat.chat_id }});

    return res.status(200).send(createChat);
  } catch (error) {
    console.log(error)
    if (error.errorResponse?.code === 11000) {
      console.log(error)
      return res.status(400).send('Users should be unique!')
    } else {
      console.log(error)
      return res.status(400).send(error._message)
    }
  }
}