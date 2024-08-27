import styles from "../css/Message.module.css";

const { userId } = localStorage;

export const Message = ({ message, sender, endRef }) => {
  return (
    <>
      <div className={sender === userId ? styles.mineMessage : styles.notMineMessage}>
        <span className={sender === userId ? styles.mineText : styles.notMineText}>{message}</span>
      </div>
      <div ref={endRef}/>
    </>
  )
}