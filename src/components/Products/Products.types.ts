import { IProduct, IGroup } from "../App/App.types";

export interface IProducts {
  [key: string]: IProduct;
}

export interface IGroups {
  [key: string]: IGroup;
}
