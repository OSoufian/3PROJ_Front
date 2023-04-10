const baseURL = "http://127.0.0.1:3000"

export function useCreateChannel(token: string, callback: Function) {
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

export const useGetChannelById = (id: number, callback: Function) => (async () => {
    if (!sessionStorage.token) return

    const response = await fetch(`http://127.0.0.1:3000/channel/${id}`, {
        method: 'GET',
        redirect: 'follow'
    })

    return response.ok ? await response.json() : await response.text()
})().then(c => callback(c))