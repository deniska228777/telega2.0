import { useAuth } from "../auth/AuthProvider";
import LeftNav from "../components/LeftNav.jsx";
import { useEffect, useRef, useState } from 'react';
import Input from '../components/Input.jsx';
import styles from './css/Chats.module.css';
import { chatsExamples } from "../components/chat/chatsExamples.js";
import { Chat } from "../components/chat/Chat.jsx";
import logo from '../components/photo_2024-08-17_23-10-00.jpg'
import Modal from "../components/Modal.jsx";
import { hide } from "../components/visibility.js";
import { useNavigate, useParams } from "react-router";
import { Message } from "../components/chat/Message.jsx";
import Form from "../components/Form.jsx";
import { useForm } from "react-hook-form";
import axiosInstance from "../axios.js";

export default function Chats() {
  const user = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm()
  const [currentChat, setCurrentChat] = useState({
    name: '',
    id: '',
    lastActivity: '',
  });
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setActive(id)
      setCurrentChat({
          name: localStorage.getItem('currentChatName' || ''),
          id: id,
          lastActivity: 'last seen 2 minutes ago'
      })
    } 
  }, [id])
  const createChatRef = useRef(null);
  const contentRef = useRef(null);
  const bodyRef = useRef(null);
  const closeRef = useRef(null);
  const searchDivRef = useRef(null);
  const searchIconRef = useRef(null);
  const [createChatVis, setCreateChatVis] = useState(false);
  const [modalChild, setModalChild] = useState('');
  const [leftNavVis, setLeftNavVis] = useState(false);
  const [vis, setVis] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [active, setActive] = useState(null);
  const [chats, setChats] = useState([])
  const [search, setSearch] = useState('');
  const [filteredChats, setFilteredChats] = useState(chats);
  const [disabled, setDisabled] = useState(true);
  const [showStickers, setShowStickers] = useState(false);
  const [loading, setLoading] = useState(true);
  const endRef = useRef();

  const scrollToTheEnd = () => {
    endRef.current?.scrollIntoView();
  };

  
  useEffect(() => {
    if (!active) return
    const onEsc = (e) => {
      if (e.keyCode === 27) {
        console.log('esc')
        setActive(null)
        setCurrentChat({
          id: '',
          name: localStorage.setItem('currentChatName', ''),
          activity: ''
        });
        navigate('/');
      }
    }
  
    window.addEventListener('keydown', onEsc)
    return () => {
      window.removeEventListener('keydown', onEsc)
    }
  }, [active, navigate])
  
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axiosInstance.post('/getchats', {
          username: user.username
        });
        
        const { chatsList } = response.data;

        const updatedChats = chatsList.map(chat => {
          const updatedChat = {
            ...chat,
            messages: chat.messages || []
          };
          if (updatedChat.firstUser === user.username) {
            updatedChat.name = updatedChat.secondUser;
          } else {
            updatedChat.name = updatedChat.firstUser;
          }
          return updatedChat;
        });
        
        setChats(updatedChats)
        setFilteredChats(updatedChats)
      } catch(error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
      
      
    }
    fetchChats()
  }, [user.username]);
  
  useEffect(() => {
    scrollToTheEnd()
  }, [currentChat.id, chats])

  const show = () => {
    showStickers ? setShowStickers(false) : setShowStickers(true)
  }
  
  const onChangeInput = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm !== '') {
      closeRef.current.style.display = "flex";
    } else {
      closeRef.current.style.display = "none";
    }
    setSearch(searchTerm);

    const filtered = chats.filter((chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length === 0) {
      bodyRef.current.style.alignItems = 'center';
      bodyRef.current.style.justifyContent = 'center';
      bodyRef.current.style.height = '90vh';
      setVisibility(true)
    } else {
      bodyRef.current.style.justifyContent = 'flex-start';
      bodyRef.current.style.alignItems = null;
      bodyRef.current.style.height = 'auto';
      setVisibility(false)
    }
    setFilteredChats(filtered);
  };  

  const onClick = (chatName, chatId) => {
    localStorage.setItem('currentChatName', chatName);
    navigate(`/${chatId}`)
    setCurrentChat((prev) => ({
      ...prev,
      name: chatName
    }))
    setActive(chatId);
  }
  const showSavedMessages = () => {
    hide(setLeftNavVis, contentRef)
    setModalChild(<h1>saved messages</h1>)
    setVis(true)
  }
  
  const showContacts = () => {
    hide(setLeftNavVis, contentRef)
    setModalChild(<h1>loefwell</h1>)
    setVis(true)
  }
  
  const showCalls = () => {
    hide(setLeftNavVis, contentRef)
    setModalChild(<h1>loalld</h1>)
    setVis(true)
  }
  
  const showSettings = () => {
    hide(setLeftNavVis, contentRef)
    setModalChild(
      <div className={styles.settings}>
        <div className={styles.settingsHighest}>
          <div className={styles.settingsTitle}>
            Settings
            <span className={styles.closeModal} onClick={() => setVis(false)}>close</span>
          </div>
          <div className={styles.settingsProfile}>
            <img src={logo} alt="profile" draggable={false} className={styles.settingsPicture}/>
            <p className={styles.settingsUsername}>
              <span>{user.username}</span>
              <span onClick={copyToClipboard}>{`@${user.username}`}</span>
            </p>
          </div>
        </div>
      </div>
    )
    setVis(true)
  }  

  const thisChat = () => {
    let arrayIndex;
    chats.forEach((chat, index) => {
      if (chat.chat_id === currentChat.id) {
        arrayIndex = index 
        return chat;
      }
    })
    return arrayIndex;
  }

  const currentChatIndex = thisChat()

  const clearSearch = () => {
    closeRef.current.style.display = "none";
    bodyRef.current.style.justifyContent = 'flex-start';
    bodyRef.current.style.alignItems = null;
    bodyRef.current.style.height = 'auto';
    setSearch('');
    setVisibility(false)
    setFilteredChats(chatsExamples)
  }
  
  const copyToClipboard = (e) => {
    const username = e.target.textContent;
    navigator.clipboard.writeText(username)
  }
  
  const onSendMessage = (data) => {
    if (disabled) return;
    setValue('message', '')
    setDisabled(true)
    console.log(data.message);
  }

  const LeftNavChild = () => (
    <>
      <div className={styles.profile}>
        <img src={logo} alt="profile" className={styles.profilePicture}/>
        <p className={styles.profileUsername}>
          {user.username}
        </p>
      </div>
      <div className={styles.menu}>
        <ul>
          <li className={styles.menuButtons} onClick={showSavedMessages}>
            <span className={styles.icons}>Bookmark</span>
            <span className={styles.menuText}>Saved Messages</span>
          </li>
          <li className={styles.menuButtons} onClick={showContacts}>
            <span className={styles.icons}>account_circle</span>
            <span className={styles.menuText}>Contacts</span>
          </li>
          <li className={styles.menuButtons} onClick={showCalls}>
            <span className={styles.icons}>call</span>
            <span className={styles.menuText}>Calls</span>
          </li>
          <li className={styles.menuButtons} onClick={showSettings}>
            <span className={styles.icons}>settings</span>
            <span className={styles.menuText}>Settings</span>
          </li>
        </ul>
      </div>
    </>
  )

  const showCreateChat = () => {
    setCreateChatVis(true)    
  }

  const onCreateChat = async (data) => {
    const response = await axiosInstance.post('/createchat', {
      firstUser: localStorage.getItem('username'),
      secondUser: data.newChatUsername
    })
    console.log(response);
    setCreateChatVis(false)
    setValue('newChatUsername', '')
    console.log(data.newChatUsername)
    navigate(`/${response.data.chat_id}`)
  }

  return (
    <div className={styles.bodyChats}>
      <div className={styles.chats}
        onMouseOver={() => {
          createChatRef.current.style.visibility = "visible";
          createChatRef.current.style.transition = "all .1s linear";
          createChatRef.current.style.transform = "translateY(-20px)";
        }}
        onMouseOut={() => {
          createChatRef.current.style.visibility = "hidden"
          createChatRef.current.style.transition = "all .1s linear";
          createChatRef.current.style.transform = "translateY(20px)"
        }}
      >
          <button onClick={showCreateChat} className={styles.createChat} ref={createChatRef}>
            <span style={{fontFamily: 'Material Symbols Outlined', color: 'white', fontSize: '23px'}}>edit</span>
          </button>
          <Modal
          vis={createChatVis}
          setVis={setCreateChatVis}
          child={
            <Form
            onSubmit={handleSubmit(onCreateChat)}
            className={styles.createChatForm}
            content={
              <div>
                <h1>
                  Create Chat
                </h1>
                <Input
                type="text"
                placeholder="Username"
                {...register('newChatUsername')}
                />
                <button type="submit">Create Chat</button>
              </div>
            }
            />
          }
          />
        <div className={styles.highestDiv}>
          <LeftNav
            vis={leftNavVis}
            setVis={setLeftNavVis}
            contentRef={contentRef}
            child={<LeftNavChild />}
          />
          <Modal vis={vis} setVis={setVis} child={modalChild}/>
          <div
            ref={searchDivRef}
            className={styles.search}
            onFocus={() => {
              searchDivRef.current.style.border = "2px solid var(--main-color)";
              searchIconRef.current.style.color = "var(--main-color)";
            }}
            onBlur={() => {
              searchDivRef.current.style.border = "2px solid transparent";
              searchIconRef.current.style.color = "#646464";
            }}
          >
            <span className={styles.searchIcon} ref={searchIconRef}>search</span>
            <Input
              type="text"
              name="search"
              id="search"
              className={styles.searchInput}
              value={search}
              onChange={onChangeInput}
              placeholder="Search"
            />
            <span className={styles.close} onClick={clearSearch} ref={closeRef}>close</span>
          </div>
        </div>
        <div className={styles.lowestDiv} ref={bodyRef}>
          {!loading &&
            filteredChats.map((chat) => (
              <Chat
                key={chat.chat_id}
                name={chat.name}
                lastMessage={chat.messages.at(-1)?.msgs?.messageText}
                isActive={active === chat.chat_id}
                onClick={() => onClick(chat.name, chat.chat_id)}
              />
            ))
          }
          {visibility &&
            <div className={styles.noResults}>
              No Matches
              <p className={styles.noResultsDescription}>
                There are no results.
                <br/>
                Try again.
              </p>
            </div>
          }
        </div>
      </div>
      <div className={styles.currentChat}>
        {currentChat.id !== '' && (
          <>        
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderInfo}>
                <span className={styles.chatName}>
                  {currentChat.name}
                </span>
                <span className={styles.lastSeen}>
                  {currentChat.lastActivity}
                </span>
              </div>
              <div className={styles.chatHeaderActivity}>
                <span className={styles.chatHeaderSearch}>search</span>
                <span className={styles.chatHeaderCall}>call</span>
                <span className={styles.chatHeaderAbout}>dock_to_left</span>
                <span className={[styles.chatHeaderActivities, styles.weight500].join(' ')}>more_vert</span>
              </div>
            </div>
            <div className={styles.messages}>
              {!loading && chats[currentChatIndex].messages && chats[currentChatIndex].messages !== '' &&
                  chats[currentChatIndex].messages.map((msg) => (
                    <Message key={msg.msgs.messageId} endRef={endRef} message={msg.msgs.messageText} sender={msg.msgs.sender}/> 
                  ))
              }
            </div>
            <div className={styles.newMessage}>
              <Form
                action='/newmessage'
                method='post'
                className={styles.sendMessageForm}
                onSubmit={handleSubmit(onSendMessage)}
                content={
                  <>
                    <Input type="file" style={{display: 'none'}} id="file"></Input>
                    <label htmlFor="file"
                      className={styles.messageFile}>
                      attach_file
                    </label>
                    <Input
                      type="text"
                      name="message"
                      placeholder="Message"
                      className={styles.messageInput}
                      {...register('message', {
                        onChange: (e) => {
                          if (e.target.value && e.target.value.trim() !== '') {
                            console.log(e.target.value)
                            setDisabled(false)
                          } else {
                            setDisabled(true)
                          }
                        } 
                      })}
                    />
                    <button style={{display: 'none'}} id="showStickers"></button>
                    <label htmlFor="showStickers"
                      className={styles.showStickers}
                      style={showStickers ? {color: 'var(--main-color)'} : {color: '#7c7c7c'}}
                      onClick={show}>
                      add_reaction
                    </label>
                    <button id="sendMessage" className={styles.sendButton} type="submit"></button>
                    <label htmlFor="sendMessage" style={!disabled ? {color: 'var(--main-color)'} : {color: '#7c7c7c'}} className={styles.sendButtonLabel}>send</label>
                  </>
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
