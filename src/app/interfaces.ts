export interface login {
  login: string,
  password: string,
}

export interface profile {
  username: string,
  email: string,
  picture: string | undefined,
  role: 'user' | 'admin',
}
