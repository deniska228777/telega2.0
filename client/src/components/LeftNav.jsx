import { useRef, useState } from "react";
import { Outlet } from "react-router";
import "./css/LeftNav.css";

export default function LeftNav({child}) {
  const [vis, setVis] = useState(false);
  const contentRef = useRef('');

  return (
    <>
      <button className="menu-btn" onClick={() => {
        setTimeout(() => {setVis(true)}, 140);
        contentRef.current.style.animation = "content-in .15s linear";
      }}>
        <span className="material-symbols-outlined menu-span">menu</span>
      </button>
      <div className={vis ? "LeftNav active" : "LeftNav"} onClick={() => {
        contentRef.current.style.animation = "content-out .12s linear";
        setTimeout(() => {setVis(false)}, 100);
      }}>
        <div className="LeftNavContent" ref={contentRef} onClick={(e) => e.stopPropagation()}>
          {child}
        </div>
      </div>
      <Outlet />
    </>
  );
}
