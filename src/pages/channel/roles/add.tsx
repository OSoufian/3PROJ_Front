import Permissions from "@/components/ComputePerms"
import { ChannelType, PartialRole, Role } from "@/types"
import { useCreateRole, useGetMeChannel } from "@/apis"

export default function AddRoles() {
    const [permisions, setPermissions] = useState<number>(0)
    const [channel, setChannel] = useState<ChannelType>()
    const [role,] = useState<PartialRole>({
        ChannelId: -1,
        Description: "",
        Name: "",
        Permission: 0,
        Weight: 0
    })

    const token = sessionStorage.token



    useEffect(() => {
        useGetMeChannel(sessionStorage.token, (c: ChannelType) => {
            role.ChannelId = c.Id
            setChannel(c)
        })
    }, [role, setChannel])

    return (
        <div>
            <h1>Name: </h1>
            <input type="text" onChange={(e) => role.Name = e.target.value} />
            <h1>Description: </h1>
            <input type="text" onChange={(e) => role.Description = e.target.value} />

            <Permissions action={(result: number) => {
                setPermissions(permisions&result ? ~result|permisions:result|permisions)
            }} />
            <h1>Permissions: {permisions}</h1>

            <button type="submit" onClick={() => {
                if (!!channel) {
                    const r: Role = {
                        Channel: channel,
                        ChannelId: channel.Id,
                        Users: [],
                        Weight: 0,
                        Permission: permisions,
                        Name: role.Name,
                        Description: role.Description,
                        Id: undefined
                    }

                    console.log(token)

                    useCreateRole(r, channel.Id, (c: any)=>{console.log(c)})
                }


            }}>Create</button>
        </div>
    )
}