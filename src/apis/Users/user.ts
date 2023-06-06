import { type User } from "@/types";

const baseURL = "http://127.0.0.1:3000"


export const useGetMe = (token: string, callBack: Function) => (async () =>{
    
    const response = await fetch(`${baseURL}/user`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
   }) 
   return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))

export const useGetUserById = (id: number, callback: Function) => (async () => {
    if (!sessionStorage.token) return

    const response = await fetch(`${baseURL}/user/chat/${id}`, {
        method: 'GET',
        redirect: 'follow',
        headers: {
            "Authorization": `Bearer ${sessionStorage.token}`
        }
    })

    return response.ok ? await response.json() : await response.text()
})().then(c => callback(c))

export const useEditMe = (token: string, user : User, callBack: Function) => (async () =>{
    
    const response = await fetch(`${baseURL}/user`, {
        method: 'PATCH',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
   }) 
   console.log(response)
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

export const useGetAllUsers = (callBack: Function) => (async () =>{
    
    const response = await fetch(`${baseURL}/user/admin/all`, {
        method: 'GET'
   }) 
   return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))