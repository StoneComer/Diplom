import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { NewsService } from "./news.service";

@Injectable({
  providedIn: 'root'
})
export class NewsIOResolver {
  constructor(private news: NewsService) {}
  resolve() {
    let data = new Date();
    return this.news.getNewsApi(data.getFullYear(), data.getMonth(), data.getDate());
  }
}
