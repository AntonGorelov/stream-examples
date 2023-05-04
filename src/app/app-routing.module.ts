import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockedComponent } from './blocked/blocked.component';
import { SolvedComponent } from './rxjs-solved/solved.component';

const routes: Routes = [
  {
    path: 'blocked',
    component: BlockedComponent,
  },
  {
    path: 'rxjs',
    component: SolvedComponent,
  },
  {
    path: '',
    redirectTo: 'blocked',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
