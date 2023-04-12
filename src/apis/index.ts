import { useAddChat, useUpdateChat, useRemoveChat } from "./chats/chat"
import { useAddLiveChat, useUpdateLiveChat, useRemoveLiveChat } from "./chats/livechat"
import {useGetUser, useLogin, useRegister} from "./LoginRegister"
import { useVideoUpload, useGetVideos,useDeleteVideo, useGetVideo, useGetVideoById,useEditVideo, useImageUpload } from "./Video"
import { useCreateChannel, useGetChannelById, useGetMeChannel, useEditChannel } from "./Users/channels"
import {useGetRoles, useEditRole, useCreateRole} from "./Roles"

export {
    useLogin,
    useRegister,
    useGetUser,
    useVideoUpload,
    useGetVideos,
    useDeleteVideo,
    useEditVideo,
    useCreateRole,
    useGetVideo,
    useGetRoles, 
    useEditRole,
    useGetMeChannel,
    useEditChannel,
    useCreateChannel,
    useGetChannelById,
    useGetVideoById,
    useAddLiveChat,
    useUpdateLiveChat,
    useRemoveLiveChat,
    useAddChat,
    useUpdateChat,
    useRemoveChat,
    useImageUpload
}