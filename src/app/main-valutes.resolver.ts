import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { NewsService } from "./news.service";
import { TablesService } from "./tables.service";

@Injectable({
  providedIn: 'root'
})
export class MainValutesResolver {
  constructor(private table: TablesService) {}
  resolve() {
    return this.table.getValutes();
  }
}
