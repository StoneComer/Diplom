import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/store/auth.state';

@Injectable({
  providedIn: 'root'
})

export class TablesService {
    constructor(private http: HttpClient, private auth: AuthService, private store: Store) {}
    url = 'https://diplom-3cd2b-default-rtdb.europe-west1.firebasedatabase.app/';
    uid = this.store.selectSnapshot(AuthState.getUserInfo).uid;
    getAllProfileTables() {
        return this.http.get(this.url + 'ProfileTables/' + this.uid + '.json');
    }
    getOneTable(idTable:string, idGroup?: string) {
      if (idGroup) {
      return this.http.get(this.url + 'ProfileTables/' + this.uid + '/group/' + idGroup + '/tables/' + idTable + '.json');
      } else {
        return this.http.get(this.url + 'ProfileTables/' + this.uid + '/tables/' + idTable + '.json');
      }
    }
    postEmptyUserSlot() {
        let id = '1';
        if (this.uid) {
          id = this.uid;
        }
        return this.http.patch(this.url + 'ProfileTables.json', { [id] : {group: {id :{name: 'empty', tables: null}}, tables: {id:{name: 'empty'}}}});
    }
    postNewEmptyTable(name: string) {
      return this.http.post(this.url + 'ProfileTables/'+ this.uid +'/tables.json', {name: name});
    }
    postNewTable(table: any, idGroup?: string) {
      return this.http.post(this.url + 'ProfileTables/'+ this.uid +'/tables.json', table);
    }
    postNewGroup(name: string) {
      return this.http.post(this.url + 'ProfileTables/'+ this.uid +'/group.json', {name: name});
    }
    postNewEmptyTableInGroup(idGroup: string, name: string) {
      return this.http.post(this.url + 'ProfileTables/'+ this.uid +'/group/' + idGroup + '/tables.json', {name: name});
    }
    patchFields(idTable:string, fields: any, idGroup?: string) {
      if (idGroup) {
      return this.http.patch(this.url + 'ProfileTables/' + this.uid + '/group/' + idGroup + '/tables/' + idTable + '.json', fields);
      } else {
        return this.http.patch(this.url + 'ProfileTables/' + this.uid + '/tables/' + idTable + '.json', fields);
      }
    }
    deleteTable(idTable:string, idGroup?: string) {
      if (idGroup) {
        return this.http.delete(this.url + 'ProfileTables/' + this.uid + '/group/' + idGroup + '/tables/' + idTable + '.json');
        } else {
          return this.http.delete(this.url + 'ProfileTables/' + this.uid + '/tables/' + idTable + '.json');
        }
    }
    deleteGroup(idGroup: string) {
      return this.http.delete(this.url + 'ProfileTables/' + this.uid + '/group/' + idGroup + '.json');
    }
    postSupportMessage(message: any) {
      return this.http.post(this.url + 'SupportMessages.json', message);
    }
    getSupportMessages() {
      return this.http.get(this.url + 'SupportMessages.json');
    }
    deletesupportMessage(id: string) {
      return this.http.delete(this.url + 'SupportMessages/' + id +'.json');
    }
    // getNewsLenta() {
    //   return this.http.get(this.url1);
    // }
}
