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
    postTableInGroup() {

    }
    // getNewsLenta() {
    //   return this.http.get(this.url1);
    // }
}
