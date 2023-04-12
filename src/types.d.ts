export type VideoType = {
  Id: number;
  Name: string;
  Description: string;
  Icon: string;
  VideoURL: string;
  ChannelId: number;
  Channel: Channel;
  Views: number;
  CreatedAt: string;
};


export type Role = {
  Id: number;
  ChannelId: number
  Channel: ChannelType;
  Users: User
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
  Channel: Channel;
  Incredentials: string;
  ValideAccount: boolean;
  Disable: boolean;
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