import { ChannelType, type User } from "@/types";
import { useGetMeChannel } from "./channels";
import envVars from "../../../public/env-vars.json"
const baseURL = envVars["user-url"]


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
   return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))

export const useDeleteMe = async (token: string, user: User, callBack: Function) => {
    console.log("user got");
    if (user.Channel) {
      console.log("has channel");
      await useGetMeChannel(token, async (c: ChannelType) => {
        console.log("channel got");
        await useDeleteMeMessages(user.Id, async () => {
          console.log("messages deleted");
          await useDeleteMeVideos(c.Id, async () => {
            console.log("videos deleted");
            await useDeleteMeChannel(user.Id, async () => {
              console.log("channel deleted");
              await useDeleteMeUser(token, user, () => {
                console.log("user deleted");
              });
            });
          });
        });
      });
    } else {
      console.log("no channel");
      await useDeleteMeMessages(user.Id, async () => {
        console.log("messages deleted");
        await useDeleteMeUser(token, user, () => {
          console.log("user deleted");
        });
      });
    }
    
    callBack();
  };

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
    
    const response = await fetch(`${baseURL}/comments/messages/user/${userId}`, {
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
    
    const response = await fetch(`${baseURL}/user/subscribe/${channelId}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
   }) 
   return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))

export const useGetAllUsers = (token: string, callBack: Function) => (async () =>{
    if (!token) return

    const response = await fetch(`${baseURL}/user/admin/all`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
        }
   }) 
   return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))

export const useGetAllConditionUsers = (token: string, condition: string, callBack: Function) => (async () =>{
  if (!token) return

  const response = await fetch(`${baseURL}/user/admin/all?q=${condition}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
 }) 
 return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))

export const useAdminEditUser = (token: string, user : User, callBack: Function) => (async () =>{
    
  const response = await fetch(`${baseURL}/user/admin/edit`, {
      method: 'PATCH',
      headers: {
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(user)
 }) 
 return response.ok ? await response.json() : await response.text()
})().then((c) => callBack(c))