import { bufferDecode, bufferEncode } from './tool';


export default function useLogin(username: string, callback: Function) {
    return (async (username: string) => {


        const response = await fetch(`http://localhost:3000/login/start/${username}`, {
            method: 'POST',
        });
        if (response.status === 401) {
            return false
            
        }
        const data = await response.json();

        data.publicKey.challenge = bufferDecode(data.publicKey.challenge);
        data.publicKey.allowCredentials.forEach(function (listItem: any) {
            listItem.id = bufferDecode(listItem.id);
        });
        data.authenticatorSelection = {
            userVerification: "preferred"
        };
        const assertion = await navigator.credentials.get({
            publicKey: data.publicKey,
        }) as any;

        let authData = assertion.response.authenticatorData;
        let clientDataJSON = assertion.response.clientDataJSON;
        let rawId = assertion.rawId;
        let sig = assertion.response.signature;
        let userHandle = assertion.response.userHandle;

        const response2 = await fetch(`http://localhost:3000/login/end/${username}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: assertion.id,
                rawId: bufferEncode(rawId),
                type: assertion.type,
                response: {
                    authenticatorData: bufferEncode(authData),
                    clientDataJSON: bufferEncode(clientDataJSON),
                    signature: bufferEncode(sig),
                    userHandle: bufferEncode(userHandle),
                },
            })
        });

        const cred = await response2.json();

        sessionStorage.setItem("token", cred.token);

        await fetch(`http://localhost:3000/user/cred`, {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            },
        });
        const userResponse = await fetch(`http://localhost:3000/user`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        });
        const user = await userResponse.json();
        return user;
    })(username).then(u => callback(u))
}