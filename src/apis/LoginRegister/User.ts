import envVars from "../../../public/env-vars.json"
const baseURL = envVars["user-url"]

export default function useGetUser(token: string, callback: Function) {
    return (async () => {
        if(!token) return
        const response = await fetch(`${baseURL}/user`,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return await response.json()
    })().then(c => callback(c))
}

