export type VideoType = {
  Id: number;
  Name: string;
  Description: string;
  Icon: string;
  VideoURL: string;
  ChannelId: number;
  Channel: {
    Id: number;
    OwnerId: number;
    Owner: {
      Id: number;
      Icon: string;
      Username: string;
      Email: string;
      Password: string;
      Permission: number;
      Incredentials: string;
      ValideAccount: boolean;
      Disable: boolean;
      Subscribtion: any;
      Role: any;
    };
    Description: string;
    SocialLink: string;
    Banner: string;
    Icon: string;
    Subscribers: any;
  };
  Views: number;
  CreationDate: string;
};

export type User = {
  Id: number;
  Icon: string;
  Username: string;
  Email: string;
  Password: string;
  Incredentials: string;
  ValideAccount: boolean;
  Disable: boolean;
  Subscribtion?: any;
  Role?: any;
  Credentials?: any;
};

export type ChannelType = {
    Id: number;
    OwnerId: number;
    Description: string;
    SocialLink: string;
    Banner: string;
    Icon: string;
    Subscribers: null | number; // Subscribers can be null or a number
}