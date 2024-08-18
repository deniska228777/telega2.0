import React from "react"
import styles from '../pages/CP.module.css';

const Input = React.forwardRef(({type, name, onChange, placeholder, value, disabled, onClick, className}, ref) => {
    return (
        <input autoComplete='off' className={className} onClick={onClick} type={type} onChange={onChange} name={name} placeholder={placeholder} ref={ref} value={value} disabled={disabled}/>
    )
})

export default Input;