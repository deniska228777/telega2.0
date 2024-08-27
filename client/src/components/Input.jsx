import { forwardRef } from "react"

const Input = forwardRef(({type, name, onChange, placeholder, value, style, disabled, onClick, className, id}, ref) => {
    return (
        <input autoComplete='off' style={style} className={className} onClick={onClick} type={type} onChange={onChange} name={name} placeholder={placeholder} ref={ref} value={value} disabled={disabled} id={id}/>
    )
})

export default Input;