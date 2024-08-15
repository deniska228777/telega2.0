export default function Wrapper({ children, style }) {
  const { bR, margin } = style;
  return (
    <div className="wrapper" style={{ borderRadius: bR, marginTop: margin }}>
      {children}
    </div>
  );
}
