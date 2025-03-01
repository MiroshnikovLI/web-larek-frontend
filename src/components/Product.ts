import { IMassInfo, IOrderAmount, IProduct, IProductCardManager } from "../types/Product";
import { EventEmitter } from "./base/events";

/** Класс получающий карточки продукта */
export class ProductCardManager implements IProductCardManager {
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
    return this.massProduct;
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