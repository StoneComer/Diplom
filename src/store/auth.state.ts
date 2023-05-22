import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UserInfo, userUpdate } from "./model/auth.model";
import { Injectable } from "@angular/core";
import { User } from "firebase/auth";

@State<UserInfo>({
  name: 'AuthSstate',
  defaults: {
    role: 'guest',
    name: null,
    email: null,
    uid: null,
    image: null,
  }
})

@Injectable()

export class AuthState {
  @Selector()
  static getUserInfo(state: UserInfo) {
    return state;
  }
  @Action(userUpdate)
  updateUserInfo(ctx: StateContext<UserInfo>, action: userUpdate) {
    ctx.patchState({
      role: action.payload.role,
      name: action.payload.name,
      email: action.payload.email,
      uid: action.payload.uid,
      image: action.payload.image,
    })
  }
}
