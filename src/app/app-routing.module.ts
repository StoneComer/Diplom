import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsComponent } from './news/news.component';
import { NewsResolver } from './news.resolver';
import { NewsIOResolver } from './newsIO.resolver';
import { TablesComponent } from './tables/tables.component';
import { TablesEditComponent } from './tables-edit/tables-edit.component';
import { AllTablesResolver } from './all-tables.reslover';
import { AccessGuardGuard } from './access-guard.guard';
import { MainResolver } from './main.resolver';
import { MainValutesResolver } from './main-valutes.resolver';
const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    resolve: {
      news: MainResolver,
      valutes: MainValutesResolver,
    }
  },
  {
    canActivate: [AccessGuardGuard],
    path: 'news',
    component: NewsComponent,
    resolve:
    {
      news: NewsResolver,
      newsIO: NewsIOResolver,
    }
  },
  {
    canActivate: [AccessGuardGuard],
    path: 'tables',
    component: TablesComponent,
    resolve: {
      tables: AllTablesResolver,
    }
  },
  {
    canActivate: [AccessGuardGuard],
    path: 'tables/edit/:id',
    component: TablesEditComponent
  },
  {
    canActivate: [AccessGuardGuard],
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
