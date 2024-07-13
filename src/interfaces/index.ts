export interface IUser {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
  profileDataForResume: any;
  isAdmin: boolean;
  currentSubscription?: any;
}

export interface ITemplate {
  _id: string;
  name: string;
  html : string;
  isOnlyForSubscribers: boolean;
  thumbnail : string;
}


export interface ISubscription {
  _id: string;
  user: IUser;
  paymentId: string;
  amount: number;
  createdAt: string;
}