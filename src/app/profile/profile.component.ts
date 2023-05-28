import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../../store/auth.state';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { userUpdate } from 'src/store/model/auth.model';
import { TablesService } from '../tables.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private tableservice: TablesService, public store: Store, private router: Router) {}
  ngOnInit(): void {
    this.role = this.store.selectSnapshot(AuthState.getUserInfo).role;
    if (this.role === 'admin') {
      this.tableservice.getSupportMessages().subscribe({
        next: resp => {
          if (resp) {
            this.supportMessages = {
              ides: [],
              messages: [],
            };
            this.supportMessages.ides = Object.keys(resp);
            this.supportMessages.messages = Object.values(resp);
            console.log(resp);
          }
        }
      });
    }
  }
  supportMessages: {
    ides: any[],
    messages: {
      email: any,
      theme: any,
      message: any,
    }[]
  } = {
    ides: [],
    messages: [],
  }
  role = this.store.selectSnapshot(AuthState.getUserInfo).role;
  user = {
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    image: localStorage.getItem('image'),
  }
  message: {
    theme: string,
    message: string
  } = {
    theme: '',
    message: '',
  };
  logOut() {
    const auth = getAuth();
    signOut(auth)
    .then(() => {
      this.store.dispatch(new userUpdate({
        role: 'guest',
        name: null,
        email: null,
        uid: null,
        image: null,
      }));
      localStorage.clear();
      this.router.navigate(['']);
    })
    .catch((error) => {
    });
  }
  sendSupportMessage() {
    let form = {
      email: this.user.email,
      theme: this.message.theme,
      message: this.message.message,
    }
    this.tableservice.postSupportMessage(form).subscribe();
  }
  deleteSupportMessage(index: number) {
    this.tableservice.deletesupportMessage(this.supportMessages.ides[index]).subscribe({
      next: resp => {
        this.supportMessages.ides.splice(index, 1);
        this.supportMessages.messages.splice(index, 1);
      }
    });
  }
}
