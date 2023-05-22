export interface login {
  login: string,
  password: string,
}

export interface profile {
  id: string,
  username: string,
  email: string,
  picture: string | undefined,
  role: 'user' | 'admin',
}

export interface Field {
  name: string,
  birza: string,
  buyDate: string,
  buyPrice: string,
  saleDate: string,
  salePrice: string,
  dohod: string,
}

export interface Table {
  name: string,
  fields?: Field[],
}

export interface profile_tables {
  tables: Table[],
  groupsTables: {
    name: string,
    tables: Table[],
  }[],
}

