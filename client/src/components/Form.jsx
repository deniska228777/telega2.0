export default function Form({action, method, content, onSubmit, className}) {
    return (
        <>
            <form action = {action} method = {method} onSubmit = {onSubmit} className = {className}>
                <>
                    {content}
                </>
            </form>    
        </>
    )
}