import { profile_tables } from "./interfaces";

export class AuthService {
  role: 'guest' | 'user' | 'admin' = 'guest';
  profile: any;
}

export class Tables {
  tables: profile_tables = {
    tables: [{
      name: 'test_1',
      fields: [{
        name: 'Газпром',
        birza: 'Сбербанк Инвестиции',
        buyDate: '2023-04-08',
        buyPrice: '',
        saleDate: '2023-05-08',
        salePrice: '',
        dohod: '',
      }],
    }],
    groupsTables: [
      {
      name: 'test_group_1',
      tables: [{
        name: 'test_2',
        fields: [{
          name: 'Башнефть',
          birza: 'Тинькофф Инвестиции',
          buyDate: '2023-04-08',
          buyPrice: '',
          saleDate: '2023-04-08',
          salePrice: '',
          dohod: '',
        }],
      }],
      }
    ],
  };
}
