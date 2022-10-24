export class ActionButton{
  item?:any;
  action:string;
  constructor(action:string, item?:any){
    this.action = action;
    this.item = item;
  }
}
