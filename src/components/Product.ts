import { IMassInfo, IOrderAmount, IProduct, IProductApi } from "../types/Product";
import { EventEmitter } from "./base/events";

/** Класс получающий карточки продукта */
export class ProductApi implements IProductApi {
  /** Емитер */
  events: EventEmitter;

  /** Массив для отправки на сервер */
  оrderAmount: IOrderAmount

  /** Массив продукта */
  massProduct: IProduct[];

  constructor(
    events: EventEmitter
  ) {
    this.events = events
  }

  /** Записать массив продуктов */
  setMassProduct(product: IProduct[]) {
    this.massProduct = product;
    this.events.emit("product:view");
  }

  /** Получить массив продуктов */
  getMassProduct(): IProduct[] {
    const massProduct: IProduct[] = this.massProduct;
    return massProduct;
  }
 
  /** Получить продукт по ID */
  getOneProduct(product: IProduct): string {
    const element = `${this.massProduct.includes(product)}`;
    return element;
  }

  /** Получить массив заказа */
  getToSendProduct(product: IProduct[], userInfo: IMassInfo) {
    this.оrderAmount = {
      product: product,
      userInfo: userInfo,
    }
    return this.оrderAmount;
  }
}