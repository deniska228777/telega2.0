import styles from '../css/Chat.module.css';
import logo from '../user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.avif'

export const Chat = ({ name, lastMessage, time, isActive, onClick, img }) => {
  const classes = [styles.Chat];

  if (isActive) {
    classes.push(styles.active);
  }

  return (
    <div
      className={classes.join(' ')}
      onClick={onClick}
    >
      <img src={img || logo} width="50px" height="50px" alt='user-icon' className={styles.chatPicture}/>
      <div className={styles.nameAndMessage}>
        <span className={styles.name}>{name}</span>
        <p className={styles.lastMessage}>
          {lastMessage && lastMessage.length > 36
          ?`${lastMessage.slice(0, 36)}...`
          :!lastMessage
            ?<span style={{fontSize: '14px'}}>No Messages Yet.</span>
            :lastMessage
          }
        </p>
      </div>
      <span className={styles.time}>{time}</span>
    </div>
  );
};
