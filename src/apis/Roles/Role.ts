const baseURL = "http://127.0.0.1:3000"


export function useGetRoles (channelId: number, token: string, callBack: Function) {
    return async function() {
        if (!sessionStorage.token) return

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

export function useEditRole() {



}