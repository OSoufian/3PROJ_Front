import envVars from "../../../public/env-vars.json"
const baseURL = envVars["user-url"]

export default function useLogoutUser(callback: Function) {
    return (async () => {
        if(!sessionStorage.token) return
        const response = await fetch(`${baseURL}/user/Logout`,{
            headers: {
                "Authorization": `Bearer ${sessionStorage.token}`
            }
        })

        return await response.json()
    })().then(c => callback(c))
}