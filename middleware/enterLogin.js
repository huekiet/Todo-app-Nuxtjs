export default function({ redirect, $cookies }) {
    const currentToken = $cookies.get("token");
    if (currentToken) {
        redirect("/todos");
    }
}