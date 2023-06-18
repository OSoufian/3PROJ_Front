import { useGetChats, useCreateChat, useEditChats, useDeleteChat } from "./chats/chat"
// import { useGetChats, useGetChat, useCreateChat, useEditChats, useDeleteChat } from "./chats/chat"
import { useGetUser, useLogin, useRegister} from "./LoginRegister"
import { useVideoUpload, useGetVideos,useDeleteVideo, useGetVideo, useGetVideoById, useEditVideo, useImageUpload, useGetVideosByChannel } from "./Video"
import { useCreateChannel, useGetChannelById, useGetMeChannel, useEditChannel } from "./Users/channels"
import { useGetMe, useGetUserById, useEditMe, useDeleteMe, useDeleteMeMessages, useDeleteMeVideos, useDeleteMeChannel, useDeleteMeUser, useSubscribe, useGetAllUsers, useGetAllConditionUsers, useAdminEditUser} from "./Users/user"
import { useGetRoles, useEditRole, useCreateRole, useDeleteRole} from "./Roles"

export {
    useSubscribe,
    useDeleteMe,
    useDeleteMeMessages,
    useDeleteMeVideos,
    useDeleteMeChannel,
    useDeleteMeUser,
    useEditMe,
    useLogin,
    useDeleteRole,
    useRegister,
    useGetUser,
    useGetAllUsers,
    useGetAllConditionUsers,
    useAdminEditUser,
    useGetUserById,
    useVideoUpload,
    useGetVideos,
    useDeleteVideo,
    useEditVideo,
    useCreateRole,
    useGetVideo,
    useGetVideosByChannel,
    useGetMe,
    useGetRoles, 
    useEditRole,
    useGetMeChannel,
    useEditChannel,
    useCreateChannel,
    useGetChannelById,
    useGetVideoById,
    useGetChats,
    // useGetChat,
    useCreateChat,
    useEditChats,
    useDeleteChat,
    useImageUpload
}