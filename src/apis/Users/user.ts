import { ChannelType, type User } from "@/types";
import { useGetMeChannel } from "./channels";

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

    const response = await fetch(`${baseURL}/user/chat/${id}`, {
        method: 'GET',
        redirect: 'follow',
        headers: {
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
   console.log(user)
   console.log(JSON.stringify(user))
   return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))

export const useDeleteMe = (token:string, user: User, callBack: Function) => (async () => {
    console.log("user got")
    if (user.Channel) {
        console.log("has channel")
        useGetMeChannel(token, (c: ChannelType) => {
            console.log("channel got")
            useDeleteMeMessages(user.Id, () => {
                console.log("messages deleted")
                useDeleteMeVideos(c.Id, () => {
                    console.log("videos deleted")
                    useDeleteMeChannel(user.Id, () => {
                        console.log("channel deleted")
                        useDeleteMeUser(token, user, () => {
                            console.log("user deleted")
                        })
                    })
                })
            })
        })
    }
    else {
        console.log("no channel")
        useDeleteMeMessages(user.Id, () => {
            console.log("messages deleted")
            useDeleteMeUser(token, user, () => {
                console.log("user deleted")
            })
        })
    }
})().then((c) => callBack(c))

export const useDeleteMeUser = (token: string, user : User, callBack: Function) => (async () =>{
    
    const response = await fetch(`${baseURL}/user`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
   }) 
   return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))

export const useDeleteMeMessages = (userId : number, callBack: Function) => (async () =>{
    
    const response = await fetch(`${baseURL}/chats/messages/user/${userId}`, {
        method: 'DELETE',
        headers: {
            // "Authorization": `Bearer ${token}`
        }
   }) 
   return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))

export const useDeleteMeVideos = (channelId : number, callBack: Function) => (async () =>{
    
    const response = await fetch(`${baseURL}/video/chann/${channelId}`, {
        method: 'DELETE',
        headers: {
            // "Authorization": `Bearer ${token}`
        }
   }) 
   return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))

export const useDeleteMeChannel = (channelId : number, callBack: Function) => (async () =>{
    
    const response = await fetch(`${baseURL}/channel/${channelId}`, {
        method: 'DELETE',
        headers: {
            // "Authorization": `Bearer ${token}`
        }
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