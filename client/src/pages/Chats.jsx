import { useAuth } from "../auth/AuthProvider";
import LeftNav from "../components/LeftNav.jsx";
import { useEffect, useRef, useState } from 'react';
import Input from '../components/Input.jsx';
import styles from './css/Chats.module.css';
import { chatsExamples } from "../components/chatsExamples.js";
import { Chat } from "../components/Chat.jsx";

export default function Chats() {
  const user = useAuth();
  const closeRef = useRef(null);
  const searchDivRef = useRef(null);
  const searchIconRef = useRef(null);
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredChats, setFilteredChats] = useState(chatsExamples);
  const onChangeInput = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm != '') {
      closeRef.current.style.display = "flex";
    } else {
      closeRef.current.style.display = "none";
    }
    setSearch(searchTerm);

    const filtered = chatsExamples.filter((chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChats(filtered);
  };

  const onClick = (id) => {
    setActive(id);
  }

  const clearSearch = () => {
    setSearch('');
    setFilteredChats(chatsExamples)
  }
  return (
    <div className={styles.bodyChats}>
      <div className={styles.chats}>
        <div className={styles.highestDiv}>
          <LeftNav
            child={
              <button className={styles.logOut} onClick={() => user.LogOut()}>logout</button>
            }
          />
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
        <div className={styles.lowestDiv}>
          {filteredChats.map((chat) => (
            <Chat
              key={chat.id}
              name={chat.name}
              lastMessage={chat.lastMessage}
              time={chat.time}
              isActive={active === chat.id}
              img={chat.img}
              onClick={() => onClick(chat.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
