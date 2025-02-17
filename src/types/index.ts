import { ICard } from "./Cards";
import { IProductData } from "./Product";

export interface IAPIresponse {
  items: ICard[];
}

export interface IApiProductData {
  items: Promise<IProductData>;
  readonly baseUrl: string;
}
