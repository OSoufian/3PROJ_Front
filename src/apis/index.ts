import { useAddChat, useUpdateChat, useRemoveChat } from "./chats/chat"
import { useAddLiveChat, useUpdateLiveChat, useRemoveLiveChat } from "./chats/livechat"
import {useGetUser, useLogin, useRegister} from "./LoginRegister"
import { useVideoUpload, useGetVideos,useDeleteVideo, useGetVideo, useGetVideoById,useEditVideo } from "./Video"
import { useCreateChannel, useGetChannelById, useGetMeChannel } from "./Users/channels"

export {
    useLogin,
    useRegister,
    useGetUser,
    useVideoUpload,
    useGetVideos,
    useDeleteVideo,
    useEditVideo,
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