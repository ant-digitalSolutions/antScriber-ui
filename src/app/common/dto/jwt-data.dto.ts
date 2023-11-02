export interface IJwtData {
  sub: string;
  email: string;
  displayName: string;
  lastLoginProvider: string;
  user_uuid: string;

  // indicate this is the first session ever
  // of the user in the platform.
  firstSessionEver: boolean;
}
