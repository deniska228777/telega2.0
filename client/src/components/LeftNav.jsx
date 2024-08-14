import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import './css/LeftNav.css'

export default function LeftNav() {
    const [vis, setVis] = useState(false);

    return (
        <>
            <button onClick={() => setVis(true)}>vis</button>
            <div className={vis ?'LeftNav active' :'LeftNav'} onClick={() => setVis(false)}>
                <div className="LeftNavContent" onClick={e => e.stopPropagation()}>
                    <span>lol</span>
                </div>
            </div>
            <Outlet/>
        </>
    );
}