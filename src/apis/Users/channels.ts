

export default function useCreateChannel(token: string, callback: Function) {
    return (async () => {
        if(!token) return
        const response = await fetch("http://127.0.0.1:3000/channel",{
            headers: {
                "Authorization": `Bearer ${token}`
            },
            method: "PUT"
        })

        return await response.json()
    })().then(c => callback(c))
}