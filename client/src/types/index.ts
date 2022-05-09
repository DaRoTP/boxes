export type UserType = {
  _id: string;
  username: string;
};

export interface ActivityType {
  _id: string;
  code: string;
  name: string;
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
}
