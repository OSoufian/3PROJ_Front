import Permissions from "@/components/ComputePerms";
import { type ChannelType, type PartialRole, type Role } from "@/types";
import { useGetMeChannel, useCreateRole } from "@/apis";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AddRoles() {
  const [permissions, setPermissions] = useState<number>(0);
  const [channel, setChannel] = useState<ChannelType>();
  const [role,] = useState<PartialRole>({
    ChannelId: -1,
    Description: "",
    Name: "",
    Permission: 0,
    Weight: 0,
  });

  useEffect(() => {
    useGetMeChannel(sessionStorage.token, (c: ChannelType) => {
      role.ChannelId = c.Id;
      setChannel(c);
    });
  }, [role, setChannel]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Name:</h1>
      <input
        className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded w-full py-2 px-3 mb-4"
        type="text"
        onChange={(e) => (role.Name = e.target.value)}
      />
      <h1 className="text-2xl font-bold mb-4">Description:</h1>
      <input
        className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded w-full py-2 px-3 mb-4"
        type="text"
        onChange={(e) => (role.Description = e.target.value)}
      />

      <Permissions
        action={(result: number) => {
          setPermissions(
            permissions & result ? ~result | permissions : result | permissions
          );
        }}
      />
      <h1 className="text-2xl font-bold mb-4">Permissions: {permissions}</h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        type="submit"
        onClick={() => {
          if (!!channel) {
            const r: Role = {
              Channel: channel,
              ChannelId: channel.Id,
              Users: [],
              Weight: 0,
              Permission: permissions,
              Name: role.Name,
              Description: role.Description,
              Id: undefined,
            };

            useCreateRole(r, (c: any) => {
              console.log(c);
            });
          }
        }}
      >
        Create
      </button>
      <br />
      <Link to="/channel" className="text-blue-500 hover:underline">
        Back
      </Link>
    </div>
  );
}
