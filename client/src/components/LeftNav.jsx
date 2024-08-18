import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import "./css/LeftNav.css";

export default function LeftNav({child}) {
  const [vis, setVis] = useState(false);

  return (
    <>
      <button className="menu-btn" onClick={() => setVis(true)}>
        <span className="material-symbols-outlined menu-span">menu</span>
      </button>
      <div className={vis ? "LeftNav active" : "LeftNav"} onClick={() => setVis(false)}>
        <div className="LeftNavContent" onClick={(e) => e.stopPropagation()}>
          {child}
        </div>
      </div>
      <Outlet />
    </>
  );
}
