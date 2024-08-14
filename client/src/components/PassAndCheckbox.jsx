import { useEffect, useRef } from "react";
import Input from "./Input";

export default function PassAndCheckbox({value, className, onChange}) {
    const passRef = useRef('');
    const checkboxRef = useRef('');
    const divRef = useRef('');
    function checkboxChange() {
        if (checkboxRef.current.checked) {
            passRef.current.type = "text"
        } else {
            passRef.current.type = "password"
        }
    } 
    return (
        <div className="passAndCheck" ref={divRef} 
        onFocus={() => divRef.current.style.borderBottom = '1px solid var(--active-green)'}
        onBlur={() => divRef.current.style.borderBottom = '1px solid #fff'}>
            <Input 
            type="password"
            value={value}
            placeholder="Password"
            className={className}
            ref={passRef}
            onChange={onChange}
            name="password"
            />
            <Input
            type="checkbox"
            ref={checkboxRef}
            onChange={checkboxChange}
            className="checkbox"
            />
        </div>
    )
}