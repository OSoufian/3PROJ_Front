


export default function useGetUser(token: string, callback: Function) {
    return (async () => {
        if(!token) return
        const response = await fetch("http://127.0.0.1:3000/user",{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return await response.json()
    })().then(c => callback(c))
}