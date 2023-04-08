import { useLogoutUser } from "@/apis/LoginRegister";


export default function Logout() {
    const navigate = useNavigate()
    useLayoutEffect(() => {
        if (sessionStorage.token) {
            useLogoutUser(sessionStorage.token, () => {
                navigate("/")
            })
            sessionStorage.clear()
        }
        
    })

    return (
        <></>
    )
}