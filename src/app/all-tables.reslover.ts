import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { TablesService } from "./tables.service";

@Injectable({
  providedIn: 'root'
})
export class AllTablesResolver {
  constructor(private tables: TablesService) {}
  resolve() {
    return this.tables.getAllProfileTables();
  }
}
