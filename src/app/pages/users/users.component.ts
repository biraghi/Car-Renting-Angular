import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MyTableActionEnum } from 'src/app/component-custom/my-table/model/MyTableActionEnum';
import { MyTableConfig } from 'src/app/component-custom/my-table/model/MyTableConfig';
import { UserModel } from 'src/app/models/UserModel';
import { UserService } from 'src/app/service/UserService/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  datepipe: DatePipe = new DatePipe('it" , "IT');
  header: MyTableConfig = {
    headers: [
      { key: 'id', label: 'ID' },
      { key: 'username', label: 'Username' },
      { key: 'lastname', label: 'Cognome' },
      { key: 'firstname', label: 'Nome' },
      { key: 'birth_date', label: 'Data di nascita' },
      { key: 'admin', label: 'Admin' },
    ],
    order: { orderType: '', defaultColumn: '' },
    paginationTable: { itemPerPage: 3, itemPerPageOption: [5, 10, 15] },
    actions: [
      MyTableActionEnum.NEW_ROW,
      MyTableActionEnum.EDIT,
      MyTableActionEnum.DELETE,
    ],
  };

  data: UserModel[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((user) => (this.data = user));
    this.data.forEach((user) => {
      let dateString = this.datepipe.transform(user.birth_date, 'dd-MM-YYYY');
      if (dateString) {
        user.birth_date = dateString;
      }
    });
  }
}
