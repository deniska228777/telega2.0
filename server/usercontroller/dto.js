export default function dto(user) {
    const { id, username, email } = user;

    return {
        id: id,
        username,
        email
    }
}