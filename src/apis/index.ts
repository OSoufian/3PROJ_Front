import { useAddChat, useUpdateChat, useRemoveChat } from "./chats/chat"
import { useAddLiveChat, useUpdateLiveChat, useRemoveLiveChat } from "./chats/livechat"
import {useGetUser, useLogin, useRegister} from "./LoginRegister"
import { useVideoUpload, useGetVideos,useDeleteVideo, useGetVideo, useGetVideoById } from "./Video/uploadVideo"
import { useCreateChannel, useGetChannelById, useGetMeChannel } from "./Users/channels"

export {
    useLogin,
    useRegister,
    useGetUser,
    useVideoUpload,
    useGetVideos,
    useDeleteVideo,
    useGetVideo,
    useGetMeChannel,
    useCreateChannel,
    useGetChannelById,
    useGetVideoById,
    useAddLiveChat,
    useUpdateLiveChat,
    useRemoveLiveChat,
    useAddChat,
    useUpdateChat,
    useRemoveChat
}