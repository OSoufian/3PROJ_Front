import { ChannelType } from "@/types"

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
        redirect: 'follow',
        headers: {
            "Authorization": `Bearer ${sessionStorage.token}`
        },
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


export const useEditChannel = (token: string, chann : ChannelType, callBack: Function) => (async () =>{
    
    const response = await fetch(`${baseURL}/channel/${chann.Id}`, {
        method: 'PATCH',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(chann)
   }) 
   return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))