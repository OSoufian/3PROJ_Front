import { type Role } from "@/types"

const baseURL = "http://127.0.0.1:3000"


export function useGetChats(channelId: number, token: string, callBack: Function) {
  return async function () {
    if (!token) return

    const response = await fetch(`${baseURL}/chats?channId${channelId}`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
          "Authorization": `Bearer ${token}`
      },
    })

    return response.ok ? await response.json() : await response.text()
  }().then(c => callBack(c))
}

export function useCreateChats(role: Role, callBack: Function) {
  return async function () {
    if (!sessionStorage.token) return

    const response = await fetch(`${baseURL}/chats?channId${role.ChannelId}`, {
      method: 'PUT',
      redirect: 'follow',
      headers: {
          "Authorization": `Bearer ${sessionStorage.token}`
      },
      body: JSON.stringify(role)
    })

    return response.ok ? await response.json() : await response.text()
  }().then(c => callBack(c)).catch((err) => console.log(err))
}

export function useCreateChat(videoId: number, userId: number, content: string, creationDate: Date, callBack: Function) {
  return async function () {
    if (!sessionStorage.token) return;

    const response = await fetch(`${baseURL}/chats/messages`, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        "Authorization": `Bearer ${sessionStorage.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        videoId,
        userId,
        content,
        creationDate
      })
    });

    return response.ok ? await response.json() : await response.text();
  }().then(c => callBack(c)).catch((err) => console.log(err));
}

export function useEditChats(role: Role, callBack: Function) {

  return async function () {
    if (!sessionStorage.token) return

    const response = await fetch(`${baseURL}/chats?channId${role.ChannelId}`, {
      method: 'PATCH',
      redirect: 'follow',
      headers: {
          "Authorization": `Bearer ${sessionStorage.token}`
      },
      body: JSON.stringify(role)
    })

    return response.ok ? await response.json() : await response.text()
  }().then(c => callBack(c))
}

export function useDeleteChats(role: Role, callBack: Function) {

  return async function () {
    if (!sessionStorage.token) return

    const response = await fetch(`${baseURL}/chats?channId${role.ChannelId}`, {
      method: 'DELETE',
      redirect: 'follow',
      headers: {
          "Authorization": `Bearer ${sessionStorage.token}`
      },
      body: JSON.stringify(role)
    })

    return response.ok ? await response.text() : await response.text()
  }().then(c => callBack(c))
}