import { useLogoutUser } from "@/apis/LoginRegister";


export default function Logout() {
    const navigate = useNavigate()
    useLayoutEffect(() => {
        if (sessionStorage.token) {
            useLogoutUser(() => {
                navigate("/")
            })
            sessionStorage.clear()
        }
        
    })

    return (
        <></>
    )
}