import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActionButton } from 'src/app/component-custom/my-table/model/ActionButton';
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
  copyData: UserModel[] = [];

  dataForm?: UserModel;
  formVisible: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
    this.data = this.setDate(this.data);
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((user) => (this.data = user));
  }

  setDate(data: UserModel[]) {
    data.forEach((user) => {
      let dateString = this.datepipe.transform(user.birth_date, 'dd-MM-YYYY');
      if (dateString) {
        user.birth_date = dateString;
      }
    });
    return data;
  }

  detectAction(actionTable: ActionButton) {
    switch (actionTable.action) {
      case MyTableActionEnum.DELETE: {
        this.deleteUser(actionTable.item);
        break;
      }
      case (MyTableActionEnum.NEW_ROW, MyTableActionEnum.EDIT): {
        this.dataForm = actionTable.item;
        this.formVisible = true;
        break;
      }
    }
  }

  deleteUser(user: UserModel) {
    this.data = this.data.filter((item) => item.id != user.id);
    this.userService.deleteUser(user.id);
  }

  formData(newUser: UserModel) {
    if (newUser.id == null) {
      this.addUser(newUser);
      this.formVisible = false;
    } else {
      this.updateData(newUser);
      this.formVisible = false;
    }
  }

  addUser(newUser: UserModel) {
    this.copyData = this.data;
    newUser.id = Math.max(...this.data.map((o) => o.id)) + 1;
    this.userService.addUser(newUser).subscribe((user) => {
      this.copyData.push(user);
      this.data = this.copyData;
    });
  }

  updateData(newUser: UserModel) {
    this.copyData = this.data;
    this.userService.updateUser(newUser).subscribe((user) => {
      this.copyData.forEach((item) => {
        if (item.id == user.id) {
          item = user;
        }
      });
      this.data = this.copyData;
    });
  }
}
