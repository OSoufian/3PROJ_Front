import { useEditRole, useGetMeChannel, useGetRoles, useDeleteRole } from "@/apis";
import { type ChannelType, type Role } from "@/types";
import "@/styles/Roles.css"
import envVars from "../../../public/env-vars.json"
const baseURL = envVars["user-url"]

function Roles() {
  const [channel, setChannel] = useState<ChannelType>();
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role>();

  useEffect(() => {
    useGetMeChannel(sessionStorage.token, (c: ChannelType) => {
      setChannel(c);
    });
  }, []);

  useEffect(() => {
    if (!!channel) {
      useGetRoles(channel.Id, sessionStorage.token, (c: Role[]) => {
        c.sort((a, b)=> {return a.Weight < b.Weight? 1: a.Weight === b.Weight ? 0: -1})
        setRoles(c);
      });
    }
  }, [channel]);

  const handleRoleClick = (role: Role) => {
    setSelectedRole(role);
  };

  const handleDrag = (role: Role, weight: number) => {
    console.log(role, weight)
    setRoles([...roles]); // create a new copy of roles array to trigger a re-render
    if (role.Weight !== weight) {

      role.Weight = weight
      useEditRole(role, ()=>{})

    }
  };

  return (
    <div className="p-4">
      {!!channel && (
        <div className="flex items-center space-x-4 mb-4">
          <img
            className="h-16 w-16 object-cover rounded-full"
            src={ channel.Icon ? `${baseURL}/image?imagename=${channel.Icon}` : `${baseURL}/image?imagename=default.png`}
            alt=""
          />
          <div>
            <h1 className="text-2xl font-bold">{channel.Name}</h1>
          </div>
        </div>
      )}
      <div>
      {!!roles &&
        roles.map((role, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 mb-4 shadow-md cursor-pointer"
            onClick={() => handleRoleClick(role)}
            draggable={true}
            onDrag={(e) => handleDrag(role, index)}
          >
            <h1 className="text-lg font-bold mb-2">{role.Name}</h1>
            <p className="text-gray-500 mb-1">{role.Description}</p>
            <p className="text-gray-500 mb-1">{role.Permission}</p>
            <p className="text-gray-500 mb-1">{role.Weight}</p>
          </div>
        ))}
        <Link to="/channel/roles/add" className="add-btn">Add A Role</Link>
        </div>
      {!!selectedRole && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <input
              className="text-lg font-bold mb-2"
              placeholder={selectedRole.Name}
              onChange={(e) => {
                selectedRole.Name = e.target.value;
              }}
            />
            <input
              className="text-gray-500 mb-1"
              placeholder={selectedRole.Description}
              onChange={(e) => {
                selectedRole.Description = e.target.value;
              }}
            />
            <input
              className="text-gray-500 mb-1"
              placeholder={selectedRole.Permission.toString()}
              type="number"
              onChange={(e) => {
                selectedRole.Permission = parseInt(e.target.value);
              }}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => {
                useEditRole(selectedRole, () => { })
                setSelectedRole(undefined)
              }}
            >
              Close
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={()=> {
                useDeleteRole(selectedRole,() =>{})
                setSelectedRole(undefined)
              }}
            >
              delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Roles;