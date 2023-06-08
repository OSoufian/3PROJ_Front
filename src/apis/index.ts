import { useGetChats, useGetChat, useCreateChat, useEditChats, useDeleteChat } from "./chats/chat"
import { useAddLiveChat, useRemoveLiveChat } from "./chats/livechat"
import { useGetUser, useLogin, useRegister} from "./LoginRegister"
import { useVideoUpload, useGetVideos,useDeleteVideo, useGetVideo, useGetVideoById,useEditVideo, useImageUpload, useGetVideosByChannel } from "./Video"
import { useCreateChannel, useGetChannelById, useGetMeChannel, useEditChannel } from "./Users/channels"
import { useGetMe, useGetUserById, useEditMe, useDeleteMe, useSubscribe} from "./Users/user"
import { useGetRoles, useEditRole, useCreateRole, useDeleteRole} from "./Roles"

export {
    useSubscribe,
    useDeleteMe,
    useEditMe,
    useLogin,
    useDeleteRole,
    useRegister,
    useGetUser,
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
    useAddLiveChat,
    useRemoveLiveChat,
    useGetChats,
    useGetChat,
    useCreateChat,
    useEditChats,
    useDeleteChat,
    useImageUpload
}