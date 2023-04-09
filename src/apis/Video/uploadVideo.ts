const baseURL = "http://127.0.0.1:3000"

export const useVideoUpload = (fileInput: File | null | undefined, callback: Function) => (async (fileInput: File | null | undefined) => {
    if (fileInput) {
        const formdata = new FormData();

        if (!!fileInput) {
            formdata.append("video", fileInput, `${Date.now()}-${fileInput.name}`);
            formdata.append("info",  JSON.stringify({
                channelId: 1
            }))

            const response = await fetch(`${baseURL}/files`, {
                method: "POST",
                body: formdata,
                redirect: "follow",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.token}`
                }
            })
            
            return response.status
        }
    }
})(fileInput).then(c => callback(c))



export const useGetVideos = (callback: Function) => (async () => {
    if (!sessionStorage.token) return

    const response = await fetch(`${baseURL}/videos`, {
        method: 'GET',
        redirect: 'follow',
        headers: {
            "Authorization": `Bearer ${sessionStorage.token}`
        }
    })

    return response.ok ? await response.json() : await response.text()
})().then(c => callback(c))


export const useDeleteVideo = (name: string, callback: Function) => (async () => {
    if (!sessionStorage.token) return

    const response = await fetch(`${baseURL}/files/?filename=${name}`, {
        method: 'DELETE',
        redirect: 'follow',
        headers: {
            "Authorization": `Bearer ${sessionStorage.token}`
        }
    })

    return response.status
})().then(c => callback(c))

export const useGetVideo = (video: string, callback: Function) => (async () => {
    const response = await fetch(`${baseURL}/files?filename=${video}`, {
        headers: {
            "Authorization": `Bearer ${sessionStorage.token}`
        }
    })
    return response.blob()
})().then(c => callback(c))

export const useGetVideoById = (id: number, callback: Function) => (async () => {
    if (!sessionStorage.token) return

    const response = await fetch(`${baseURL}/videos/${id}`, {
        method: 'GET',
        redirect: 'follow'
    })

    return response.ok ? await response.json() : await response.text()
})().then(c => callback(c))
