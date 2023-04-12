import { User } from "@/types";

const baseURL = "http://127.0.0.1:3000/"


export const useGetMe = (token: string, user : User, callBack: Function) => (async () =>{
    
    const response = await fetch(`${baseURL}/user`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
   }) 
   return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))

export const useEditMe = (token: string, user : User, callBack: Function) => (async () =>{
    
    const response = await fetch(`${baseURL}/user`, {
        method: 'PATCH',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
   }) 
   return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))

export const useDeleteMe = (token: string, user : User, callBack: Function) => (async () =>{
    
    const response = await fetch(`${baseURL}/user`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
   }) 
   return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))

export const useSubscribe = (token: string, user : User, channelId: number, callBack: Function) => (async () =>{
    
    const response = await fetch(`${baseURL}/user/subscibe/${channelId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
   }) 
   return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))

