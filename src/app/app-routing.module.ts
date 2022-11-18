import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableCarComponent } from './pages/available-car/available-car.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { CarsComponent } from './pages/cars/cars.component';
import { DataComponent } from './pages/data/data.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthJwtService } from './service/Auth/authJwt.service';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'index', component: IndexComponent, canActivate: [AuthGuard] },
  { path: 'data/users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'data/cars', component: CarsComponent, canActivate: [AuthGuard] },
  {
    path: 'data/bookings',
    component: BookingsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'data', component: DataComponent, canActivate: [AuthGuard] },
  {
    path: 'car/available',
    component: AvailableCarComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthJwtService],
})
export class AppRoutingModule {}
