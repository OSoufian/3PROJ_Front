import { type Role } from "@/types"

const baseURL = "http://127.0.0.1:3000"


export function useGetRoles(channelId: number, token: string, callBack: Function) {
  return async function () {
    if (!token) return

    const response = await fetch(`${baseURL}/roles/channel/${channelId}`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
          "Authorization": `Bearer ${token}`
      },
    })

    return response.ok ? await response.json() : await response.text()
  }().then(c => callBack(c))
}

export function useCreateRole(role: Role, callBack: Function) {
  return async function () {
    if (!sessionStorage.token) return

    const response = await fetch(`${baseURL}/roles/${role.ChannelId}?channId=${role.ChannelId}`, {
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

export function useEditRole(role: Role, callBack: Function) {

  return async function () {
    if (!sessionStorage.token) return

    const response = await fetch(`${baseURL}/roles/${role.Id}?channId=${role.ChannelId}`, {
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

export function useDeleteRole(role: Role, callBack: Function) {

  return async function () {
    if (!sessionStorage.token) return

    const response = await fetch(`${baseURL}/roles/${role.Id}?channId=${role.ChannelId}`, {
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