export default function dto(user) {
    const { _id, username, email } = user;

    return {
        id: _id,
        username,
        email
    }
}