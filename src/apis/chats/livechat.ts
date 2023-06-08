
const baseURL = "http://127.0.0.1:3000"

export function useAddLiveChat(videoId: number, userId: number, content: string, creationDate: Date, callBack: Function) {
    return async function () {
      if (!sessionStorage.token) return;
      const response = await fetch(`${baseURL}/chats/messages`, {
        method: 'POST',
        redirect: 'follow',
        headers: {
          // "Authorization": `Bearer ${sessionStorage.token}`,
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

export const useRemoveLiveChat = (txt: string, callback: Function) => (async () => {
    
})().then(c => callback(c))