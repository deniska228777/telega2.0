import { useEffect, useState } from "react"

export default function ErrorDiv({errMsg}) {
    const [errDiv, setErrDiv] = useState({
        display: 'none'
    })

    useEffect(() => {
        if (errMsg) {
            setErrDiv({display: "flex"})
        } else {
            setErrDiv({display: "none"})
        }
    }, [errMsg]);

    return (
        <div style={errDiv} className="errorDiv">{errMsg}</div>
    )
}