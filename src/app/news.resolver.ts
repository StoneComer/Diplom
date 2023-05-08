import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { NewsService } from "./news.service";

@Injectable({
  providedIn: 'root'
})
export class NewsResolver {
  constructor(private news: NewsService) {}
  resolve() {
    return this.news.getNewsIo();
  }
}
