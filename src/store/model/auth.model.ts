export interface UserInfo {
  role: 'user' | 'admin' | 'guest';
  uid: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
}

export class userUpdate {
  static readonly type = '[User]: UserUpdate';
  constructor (public payload: UserInfo) {}
}
