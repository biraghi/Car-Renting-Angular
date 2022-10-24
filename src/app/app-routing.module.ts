import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { CarsComponent } from './pages/cars/cars.component';
import { IndexComponent } from './pages/index/index.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'users', component: UsersComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'bookings', component: BookingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
