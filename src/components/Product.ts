import { ICard } from "../types";
import { EventEmitter } from "./base/events";
import { IMassInfo } from "./Data";

export class ProductApi {
  protected _events: EventEmitter;
  protected _оrderAmount: IOrderAmount
  massProduct?: IProduct[];

  constructor(
    events: EventEmitter
  ) {
    this._events = events
  }

  // Записать массив продуктов
  setMassProduct(product: ICard[]) {
    this.massProduct = product;
    this._events.emit("product:view");
  }

  // Получить массив продуктов
  getMassProduct(){
    const massProduct = this.massProduct;
    return massProduct;
  }
 
  // Получить продукт по ID
  getOneProduct(product: Product) {
    const element = this.massProduct.includes(product);
    return element;
  }

  // Получить массив заказа
  getToSendProduct(product: Product[], userInfo: IMassInfo) {
    this._оrderAmount = {
      product: product,
      userInfo: userInfo,
    }
    return this._оrderAmount;
  }
}

export class Product {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;

  constructor(   
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: number | null) {
      this.id = id;
      this.description = description;
      this.image = image;
      this.title = title;
      this.category = category;
      this.price = price;   
    }
}

interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

interface IOrderAmount {
  product: IProduct[];
  userInfo: IMassInfo;
}