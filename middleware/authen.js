export default function({ redirect, $cookies }) {
    const currentToken = $cookies.get("token");
    if (!currentToken) {
        return redirect("/authen/login");
    }
}