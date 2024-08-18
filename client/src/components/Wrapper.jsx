import styles from '../pages/CP.module.css'

export default function Wrapper({ children, style }) {
  const { bR, margin } = style;
  return (
    <div className={styles.wrapper} style={{ borderRadius: bR, marginTop: margin }}>
      {children}
    </div>
  );
}
