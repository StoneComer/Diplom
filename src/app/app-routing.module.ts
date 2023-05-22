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
const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'authorization',
    component: AuthorizationComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
    resolve:
    {
      news: NewsResolver,
      newsIO: NewsIOResolver,
    }
  },
  {
    path: 'tables',
    component: TablesComponent,
    resolve: {
      tables: AllTablesResolver,
    }
  },
  {
    path: 'tables/edit/:id',
    component: TablesEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
