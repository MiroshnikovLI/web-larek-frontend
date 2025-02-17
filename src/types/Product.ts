import { ICard } from "./Cards";
import { IMassInfo } from "./Data";

/**
 * Класс получающий карточки продукта
 */
export interface IProductApi {

  /**
   * Массив продукта
   */
  massProduct: IProduct[];

  /**
   * Записать массив продуктов
   */
  setMassProduct(product: ICard[]): void

  /**
   * Получить массив продуктов
   */
  getMassProduct(): IProduct[]
 
  /**
   * Получить продукт по ID
   */
  getOneProduct(product: IProduct): string

  /**
   * Получить массив заказа
   */
  getToSendProduct(product: IProduct[], userInfo: IMassInfo): IOrderAmount
}


export interface IProduct {
  /**
   * ID продукта
   */
  id: string;
  /**
   * Описание продукта
   */
  description: string;
  /**
   * Изображение продукта
   */
  image: string;
  /**
   * Название продукта
   */
  title: string;
  /**
   * Котегория продукта
   */
  category: string;
  /**
   * Цена продукта
   */
  price: number | null;
}

export interface IOrderAmount {
  product: IProduct[];
  userInfo: IMassInfo;
}

export interface IProductData  {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
