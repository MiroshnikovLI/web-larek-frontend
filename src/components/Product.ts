// import { ICard } from "../types/Cards";
// import { IMassInfo } from "../types/Data";
// import { IOrderAmount, IProduct, IProductApi } from "../types/Product";
// import { EventEmitter } from "./base/events";



// /**
//  * Класс получающий карточки продукта
//  */
// export class ProductApi implements IProductApi {
//   /**
//    * Брокер событий
//    */
//   protected _events: EventEmitter;
//   /**
//    * Массив для отправки на сервер
//    */
//   protected _оrderAmount: IOrderAmount

//   /**
//    * Массив продукта
//    */
//   massProduct: IProduct[];

//   constructor(
//     events: EventEmitter
//   ) {
//     this._events = events
//   }

//   /**
//    * Записать массив продуктов
//    */
//   setMassProduct(product: ICard[]) {
//     this.massProduct = product;
//     this._events.emit("product:view");
//   }

//   /**
//    * Получить массив продуктов
//    */
//   getMassProduct(): IProduct[] {
//     const massProduct: IProduct[] = this.massProduct;
//     return massProduct;
//   }
 
//   /**
//    * Получить продукт по ID
//    */
//   getOneProduct(product: Product): string {
//     const element = `${this.massProduct.includes(product)}`;
//     return element;
//   }

//   /**
//    * Получить массив заказа
//    */
//   getToSendProduct(product: Product[], userInfo: IMassInfo) {
//     this._оrderAmount = {
//       product: product,
//       userInfo: userInfo,
//     }
//     return this._оrderAmount;
//   }
// }

// /**
//  * Класс продукта
//  */
// export class Product implements IProduct {
//   /**
//    * ID продукта
//    */
//   id: string;
//   /**
//    * Описание продукта
//    */
//   description: string;
//   /**
//    * Изображение продукта
//    */
//   image: string;
//   /**
//    * Название продукта
//    */
//   title: string;
//   /**
//    * Котегория продукта
//    */
//   category: string;
//   /**
//    * Цена продукта
//    */
//   price: number | null;

//   constructor(   
//     id: string,
//     description: string,
//     image: string,
//     title: string,
//     category: string,
//     price: number | null) {
//       this.id = id;
//       this.description = description;
//       this.image = image;
//       this.title = title;
//       this.category = category;
//       this.price = price;   
//     }
// }