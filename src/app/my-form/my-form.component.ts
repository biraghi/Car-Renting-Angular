import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionButton } from '../my-table/ActionButton';
import { MyTableConfig } from '../my-table/MyTableConfig';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {

  @Input() tableConfig!:MyTableConfig;
  @Input() data!: any;
  @Output() actionChange: EventEmitter<ActionButton> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.actionChange.emit(this.data);
  }

}
