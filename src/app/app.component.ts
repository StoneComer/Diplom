import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth.state';
import { userUpdate } from 'src/store/model/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(public auth: AuthService, public store: Store, private router: Router) {}
  firebaseConfig = {
    apiKey: "AIzaSyASWpVHdWuvG5fhnUEHo6DOpTB-MFcGLuA",
    authDomain: "diplom-3cd2b.firebaseapp.com",
    projectId: "diplom-3cd2b",
    storageBucket: "diplom-3cd2b.appspot.com",
    messagingSenderId: "681060392450",
    appId: "1:681060392450:web:8580e9a8b729f22bfa111b",
    measurementId: "G-147QQ0FX7N"
  };
  user = this.store.selectSnapshot(AuthState.getUserInfo);
  ngOnInit(): void {
    const app = initializeApp(this.firebaseConfig);
    this.store.select(AuthState.getUserInfo).subscribe({
      next: value => {
        this.user = value;
        console.log(value);
      }
    });
    if (localStorage.getItem('name')) {
      if (localStorage.getItem('uid') === 'ZPemAvzMkqeDQcRb4n8Oc9v0G3x1'){
        this.store.dispatch(new userUpdate({
          role: 'admin',
          name: localStorage.getItem('name'),
          email: localStorage.getItem('email'),
          uid: localStorage.getItem('uid'),
          image: localStorage.getItem('image'),
        }));
        } else {
          this.store.dispatch(new userUpdate({
            role: 'user',
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            uid: localStorage.getItem('uid'),
            image: localStorage.getItem('image'),
          }));
        }
    }
    console.log(this.user);
  }
  title = 'site_birz_stat';
  authGoogle() {
    const authG = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(authG, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      let role;
      if (user.displayName && user.photoURL && user.email) {
        localStorage.setItem('name', user.displayName);
        localStorage.setItem('image', user.photoURL);
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('email', user.email);
      }
        if (user.uid === 'ZPemAvzMkqeDQcRb4n8Oc9v0G3x1'){
        this.store.dispatch(new userUpdate({
          role: 'admin',
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          image: user.photoURL,
        }));
        } else {
          this.store.dispatch(new userUpdate({
            role: 'user',
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            image: user.photoURL,
          }));
        }
      }
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }
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
}

