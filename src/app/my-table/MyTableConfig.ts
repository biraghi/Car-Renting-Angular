import { MyHeaders } from "./MyHeaders";
import { MyOrder } from "./MyOrder";
import { MyPagination } from "./MyPagination";
import { MySearch } from "./MySearch";
import { MyTableActionEnum } from "./MyTableActionEnum";

export interface MyTableConfig{
  headers:MyHeaders[];
  order: MyOrder;
  search?:MySearch;
  paginationTable:MyPagination;
  actions:MyTableActionEnum[];
}
