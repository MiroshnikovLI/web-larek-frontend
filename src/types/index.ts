import { IProduct } from "./Product";

export interface IAPIresponse {
  items: IProduct[];
}

export interface IApiProductData {
  items: Promise<IProduct>;
  readonly baseUrl: string;
}
