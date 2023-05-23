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
        let id = '';
        if (this.uid) {
          id = this.uid;
        }
        return this.http.put(this.url + 'ProfileTables.json', { [id] : 'empty'});
    }
    postNewEmptyTable() {
      return this.http.post(this.url + 'ProfileTables/'+ this.uid +'/tables.json', {name: 'empty'});
    }
    postNewGroup() {
      return this.http.post(this.url + 'ProfileTables/'+ this.uid +'/group.json', {name: 'empty'});
    }
    postNewEmptyTableInGroup(idGroup: string) {
      return this.http.post(this.url + 'ProfileTables/'+ this.uid +'/group/' + idGroup + 'tables/', {name: 'empty'});
    }
    patchFields(idTable:string, fields: object, idGroup?: string) {
      if (idGroup) {
      return this.http.patch(this.url + 'ProfileTables/' + this.uid + '/group/' + idGroup + '/tables/' + idTable + '/fields' + '.json', fields);
      } else {
        return this.http.get(this.url + 'ProfileTables/' + this.uid + '/tables/' + idTable + '/fields' + '.json', fields);
      }
    }
    // getNewsLenta() {
    //   return this.http.get(this.url1);
    // }
}
