import { bufferDecode, bufferEncode } from './tool';
import envVars from "../../../public/env-vars.json"
const baseURL = envVars["user-url"]

let lock: Boolean = false

export default function useRegister(username: string, callback: Function) {
    return (async (username: string) => {

        const response = await fetch(`${baseURL}/register/start/${username}`, {
            method: 'POST'
        });

        if (response.status === 401) {
            return false
        }

        lock = true
        let data
        try {

            data = await response.json();
        } catch (error) {

            return await response.text()
        }
        const options: any = data.Options;
        options.publicKey.challenge = bufferDecode(options.publicKey.challenge);
        console.log(options);
        options.publicKey.user.id = bufferDecode(options.publicKey.user.id);
        if (options.publicKey.excludeCredentials) {
            for (let i = 0; i < options.publicKey.excludeCredentials.length; i++) {
                options.publicKey.excludeCredentials[i].id = bufferDecode(options.publicKey.excludeCredentials[i].id);
            }
        }
        options.publicKey.authenticatorSelection = {
            userVerification: "preferred"
        };

        const credential = await navigator.credentials.create({
            publicKey: options.publicKey,
        }) as any;

        if (!credential?.response) throw new Error("no  PublicKeyCredential")

        let attestationObject = credential.response.attestationObject;
        let clientDataJSON = credential.response.clientDataJSON;
        let rawId = credential.rawId;

        setInterval(() => { }, 32000)

        console.log("Second request")


        const response2 = await fetch(`${baseURL}/register/end/${username}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: credential.id,
                rawId: bufferEncode(rawId),
                type: credential.type,
                response: {
                    attestationObject: bufferEncode(attestationObject),
                    clientDataJSON: bufferEncode(clientDataJSON)
                }
            })
        });
        const cred = await response2.json();
        console.log(cred);

        if (!cred.token) throw new Error("invalid token")
        console.log(response2)
        sessionStorage.setItem("token", cred.token);

        const response3 = await fetch(`${baseURL}/user`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        });
        const user = await response3.json();
        console.log(useResolvedPath)
        lock = false
        return user;
    })(username).then(user => callback(user))

}