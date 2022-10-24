import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { CarsComponent } from './pages/cars/cars.component';
import { DataComponent } from './pages/data/data.component';
import { IndexComponent } from './pages/index/index.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'data/users', component: UsersComponent },
  { path: 'data/cars', component: CarsComponent },
  { path: 'data/bookings', component: BookingsComponent },
  { path: 'data', component: DataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
