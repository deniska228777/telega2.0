import { useAuth } from "../components/AuthProvider";

export default function Chats() {
    const user = useAuth();

    return (
        <>
            <button onClick={() => user.LogOut()}>logout</button>
        </>
    )
}