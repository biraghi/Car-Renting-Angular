import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationPipe } from './component-custom/my-table/pipe/pagination.pipe';
import { SearchFilterPipe } from './component-custom/my-table/pipe/search-filter.pipe';
import { MyTableComponent } from './component-custom/my-table/my-table.component';
import { NavbarComponent } from './component-custom/navbar/navbar.component';
import { UsersComponent } from './pages/users/users.component';
import { CarsComponent } from './pages/cars/cars.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { DataComponent } from './pages/data/data.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from './service/InMemoryDataService/in-memory-data.service';
import { SetDateFormatPipe } from './component-custom/my-table/pipe/set-date-format.pipe';
import { MyFormComponent } from './component-custom/my-form/my-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MyTableComponent,
    SearchFilterPipe,
    PaginationPipe,
    NavbarComponent,
    IndexComponent,
    UsersComponent,
    CarsComponent,
    BookingsComponent,
    DataComponent,
    SetDateFormatPipe,
    MyFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
