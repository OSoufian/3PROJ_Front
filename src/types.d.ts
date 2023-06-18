export type VideoType = {
  Id: number;
  Name: string;
  Description: string;
  Icon: string;
  VideoURL: string;
  ChannelId: number;
  Channel: ChannelType;
  Views: number;
  CreatedAt: string;
  CreationDate: string;
  IsHide: boolean;
  IsBlock: boolean;
  Size: number;
};

export type Message = {
  Id: number;
  Content: string;
  UserId: number;
  User: User;
  VideoId: number;
  // Video: VideoType;
  Created: string;
};

export type Role = {
  Id: number|undefined;
  ChannelId: number
  Channel: ChannelType;
  Users: User[]
  Weight: number
  Permission: number
  Name: string;
  Description: string;

}

export type PartialRole = {
  ChannelId: number;
  Weight: number
  Permission: number
  Name: string;
  Description: string;
}

export type User = {
  Id: number;
  Icon: string;
  Username: string;
  Email: string;
  Password: string;
  Channel: ChannelType;
  Incredentials: string;
  ValideAccount: boolean;
  Disable: boolean;
  Permission: number;
  Subscribtion?: any;
  Role?: any;
  Credentials?: any;
};

export type ChannelType = {
  Id: number;
  Name: string
  OwnerId: number;
  Owner: User;
  Description: string;
  SocialLink: string;
  Banner: string;
  Icon: string;
  Subscribers: User[];
};