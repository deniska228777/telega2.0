import React from "react"

const Input = React.forwardRef(({type, name, onChange, placeholder, value, disabled, onClick, className}, ref) => {
    return (
        <input autoComplete="on" className={className} onClick={onClick} type={type} onChange={onChange} name={name} placeholder={placeholder} ref={ref} value={value} disabled={disabled}/>
    )
})

export default Input;