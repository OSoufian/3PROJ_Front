import { VideoType } from "~/types";

const baseURL = "http://127.0.0.1:3000"

export const useVideoUpload = (fileInput: File | null | undefined, channelId: number, callback: Function) => (async (fileInput: File | null | undefined, channelId: number) => {
    if (fileInput) {
        const formdata = new FormData();

        if (!!fileInput) {
            formdata.append("video", fileInput, `${Date.now()}-${fileInput.name}`);
            formdata.append("info",  JSON.stringify({
                channelId
            }))

            const response = await fetch(`${baseURL}/files/video?channelId=${channelId}`, {
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
})(fileInput, channelId).then(c => callback(c))


export const useImageUpload = (fileInput: File | null | undefined, channelId: number, callback: Function) => (async (fileInput: File | null | undefined, channelId: number) => {
    if (fileInput) {
        const formdata = new FormData();

        if (!!fileInput) {
            formdata.append("image", fileInput, `${Date.now()}-${fileInput.name}`);
            
            const response = await fetch(`${baseURL}/files/image?channelId=${channelId}`, {
                method: "POST",
                body: formdata,
                redirect: "follow",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.token}`
                }
            })
            
            return await response.text()
        }
    }
})(fileInput, channelId).then(c => callback(c))


export const useGetVideos = (callback: Function) => (async () => {
    if (!sessionStorage.token) return

    const response = await fetch(`${baseURL}/videos`, {
        method: 'GET',
        redirect: 'follow'
    })

    return response.ok ? await response.json() : await response.text()
})().then(c => callback(c))


export const useDeleteVideo = (name: string, channelId: number, callback: Function) => (async () => {
    if (!sessionStorage.token) return

    const response = await fetch(`${baseURL}/files/?channelId=${channelId}&filename=${name}`, {
        method: 'DELETE',
        redirect: 'follow',
        headers: {
            "Authorization": `Bearer ${sessionStorage.token}`
        }
    })

    return response.status
})().then(c => callback(c))

export const useGetVideo = (video: string, callback: Function) => (async () => {
    const response = await fetch(`${baseURL}/files?filename=${video}`)
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


export const useEditVideo = (video: VideoType, channId: number, callback: Function) => (async () => {
    if (!sessionStorage.token) return

    const response = await fetch(`${baseURL}/files?path=${video.VideoURL}&channelId=${channId}`, {
        method: 'PATCH',
        redirect: 'follow',
        headers: {
            "Authorization": `Bearer ${sessionStorage.token}`
        },
        body: JSON.stringify(video)
    })

    return response.ok ? await response.json() : await response.text()
})().then(c => callback(c))