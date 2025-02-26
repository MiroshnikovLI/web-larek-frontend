import { EventEmitter } from "../components/base/events";

export interface IProductApi {
  /** Емитер */
  events: EventEmitter;

  /** Массив для отправки на сервер */
  оrderAmount: IOrderAmount

  /** Массив продукта */
  massProduct: IProduct[];

  /** Записать массив продуктов */
  setMassProduct(product: IProduct[]): void

  /** Получить массив продуктов */
  getMassProduct(): IProduct[]
 
  /** Получить продукт по ID */
  getOneProduct(product: IProduct): string

  /** Получить массив заказа */
  getToSendProduct(product: IProduct[], userInfo: IMassInfo): IOrderAmount
}

export interface IProduct {
  /** ID продукта */
  id: string;

  /** Описание продукта */
  description: string;

  /** Изображение продукта */
  image: string;

  /** Название продукта */
  title: string;

  /** Котегория продукта */
  category: string;

  /** Цена продукта */
  price: number | null;
}

export interface IOrderAmount {
  product: IProduct[];
  userInfo: IMassInfo;
}

export interface IMassInfo {
  formOfPayment: string;
  address: string;
  email: string;
  phone: string;
}