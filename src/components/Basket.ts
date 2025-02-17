// import { IBasket } from "../types/Basket";
// import { IProduct } from "../types/Product";
// import { Pattern } from "./Pattern";
// import { Product } from "./Product";

// /**
//  * Класс корзины
//  */
// export class Basket extends Pattern implements IBasket {
//   /**
//    * Массив продуктов
//    */
//   protected _product: IProduct[] = [];
//   /**
//    * Корзина
//    */
//   protected _basket: HTMLElement;
//   /**
//    * Элемент списка корзины
//    */
//   protected _basketList: HTMLElement;
//   /**
//    * Кнопка в корзине
//    */
//   protected _basketButton: HTMLButtonElement;
//   /**
//    * Элемент цены корзины
//    */
//   protected _basketPrice: HTMLElement;

//   constructor(
//     _basket: HTMLElement
//   ) {
//     super();
//     this._basket = _basket;

//     this._basketList = this._basket.querySelector('.basket__list');
//     this._basketButton = this._basket.querySelector('.basket__button');
//     this._basketPrice = this._basket.querySelector('.basket__price');
//   }

//   /**
//    * Добавления продукта в корзину
//    */
//   setProductBasket(product: Product) { 
//     if(!this._product.includes(product)) {
//         this._product.push(product);
//     }
//   }

//   /**
//    * Удаление продукта из корзины
//    */
//   deleteProduct(product: Product) {
//     this._product = this._product.filter(x => { return x.id != product.id});
//   }

//   /**
//    * Удалить все продукты с корзины
//    */
//   deleteAllProduct() {
//     this._product.length = 0;
//   }

//   /**
//    * Получить количество товара в корзине
//    */
//   getLengthProduct(): number {
//     return this._product.length;
//   }

//   /**
//    * Получить полный список покупок
//    */
//   getAllProduct(): IProduct[] {
//     return this._product;
//   }

//   /**
//    * Получить полную сумму корзины
//    */
//   getPriceAll() {
//     let sum = 0;
//     const red = this._product.map(g => g.price += sum);
//     const numbers = red;
//     const sumOfNumbers = numbers.reduce((acc, number) => acc + number, 0);
//     return this.getPatterPraci(`${sumOfNumbers}`); 
//   }

//   /**
//    * Получить лист корзины
//    */
//   getBasketList(){
//     return this._basketList;
//   }

//   /**
//    * Получить кнопку корзины
//    */
//   getBasketButton() {
//     return this._basketButton;
//   }

//   /**
//    * Получить Элемент цены корзины 
//    */
//   getPriceBasket() {
//     return this._basketPrice;
//   }

//   /**
//    * Получить корзину
//    */
//   getBasket() {
//     return this._basket;
//   }

//   /**
//    * Очиста листа покупок
//    */
//   clearBasketList() {
//     this._basketList.innerHTML = '';
//   }
// }
