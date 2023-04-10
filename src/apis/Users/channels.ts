const baseURL = "http://127.0.0.1:3000"

export function useCreateChannel(token: string, callback: Function) {
    return (async () => {
        if(!token) return
        const response = await fetch(`${baseURL}/channel`,{
            headers: {
                "Authorization": `Bearer ${token}`
            },
            method: "PUT"
        })

        return await response.json()
    })().then(c => callback(c))
}

export const useGetChannelById = (id: number, callback: Function) => (async (id: number) => {
    if (!sessionStorage.token) return

    const response = await fetch(`${baseURL}/channel/${id}`, {
        method: 'GET',
        redirect: 'follow'
    })

    return response.ok ? await response.json() : await response.text()
})(id).then(c => callback(c))

export const useGetMeChannel = (token : string, callback: Function) => (async (token: string) => {
   const response = await fetch(`${baseURL}/user/channel`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
   }) 

   return response.ok ? await response.json() : await response.text()
})(token).then(c => callback(c))