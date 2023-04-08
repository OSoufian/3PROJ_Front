export default function useLogoutUser(token: string, callback: Function) {
    return (async () => {
        if(!token) return
        const response = await fetch("http://127.0.0.1:3000/user/Logout",{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return await response.json()
    })().then(c => callback(c))
}