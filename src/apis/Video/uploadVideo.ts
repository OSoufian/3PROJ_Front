

const baseURL = "http://127.0.0.1:3000/upload"

export const useVideoUpload = (fileInput: File | null | undefined, callback: Function) => (async (fileInput: File | null | undefined) => {
    if (fileInput) {
        const formdata = new FormData();

        if (!!fileInput) {
            formdata.append("video", fileInput, `${Date.now()}-${fileInput.name}`);

            const response = await fetch(`${baseURL}`, {
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

    const response = await fetch(`${baseURL}/files`, {
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

    const response = await fetch(`${baseURL}/?filename=${name}`, {
        method: 'DELETE',
        redirect: 'follow',
        headers: {
            "Authorization": `Bearer ${sessionStorage.token}`
        }
    })

    return response.status
})().then(c => callback(c))

export const useGetVideo = (video: string, callback: Function) => (async () => {
    const response = await fetch(`${baseURL}?filename=${video}`, {
        headers: {
            "Authorization": `Bearer ${sessionStorage.token}`
        }
    })
    return response.blob()
})().then(c => callback(c))
