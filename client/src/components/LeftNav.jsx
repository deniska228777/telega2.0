import { Outlet } from "react-router";
import "./css/LeftNav.css";
import { hide, show } from "./visibility";

export default function LeftNav({child, vis, setVis, contentRef}) {

  return (
    <>
      <button className="menu-btn" onClick={() => show(setVis, contentRef)}>
        <span className="material-symbols-outlined menu-span">menu</span>
      </button>
      <div className={vis ? "LeftNav active" : "LeftNav"} onClick={() => hide(setVis, contentRef)}>
        <div className="LeftNavContent" ref={contentRef} onClick={(e) => e.stopPropagation()}>
          {child}
        </div>
      </div>
      <Outlet />
    </>
  );
}
