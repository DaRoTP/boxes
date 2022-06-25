export type UserType = {
  _id: string;
  username: string;
};

export interface ActivityType {
  _id: string;
  code: string;
  name: string;
}

export interface SizeType {
  _id: string;
  code: string;
  name: string;
  mesurments: { x: Number, y: Number, z: Number },
  weight: Number
}

export interface LocationType {
  _id: string;
  identifier: string;
  country: string;
  city: string;
  street: string;
  number?: number;
  postcode: string;
}

export interface BoxType {
  _id: string;
  activity: ActivityType;
  origin: LocationType;
  destination: LocationType;
  currentLocation?: LocationType;
  description: string;
  size?: SizeType
}

export interface BoxHistoryEntryType {
  currentLocation: LocationType;
  activity: ActivityType;
  timeStamp: string;
}

export interface HistoryEntryWithContactInfo extends BoxHistoryEntryType {
  contactInfo: {
    email: string;
    phone1: string;
    phone2: string;
  }
}

export interface BoxHistoryEntryShortType {
  currentLocation: string;
  activity: string;
  timeStamp: string;
}