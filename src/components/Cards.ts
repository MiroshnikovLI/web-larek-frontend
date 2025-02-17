// import { ICardsBasket, ICardsElements, ICotegoreCards } from "../types/Cards";
// import { CDN_URL } from "../utils/constants";
// import { Pattern } from "./Pattern";
// import { Product } from "./Product";
// /**
//  * Класс котегории товара
//  */
// export class CotegoreCards extends Pattern implements ICotegoreCards  {
//   /**
//    * Массив котегорий карточек
//    */
//   protected massCotegory = {
//     'софт-скил': 'card__category_soft',
//     'другое': 'card__category_other',
//     'дополнительное': 'card__category_additional',
//     'кнопка': 'card__category_button',
//     'хард-скил': 'card__category_hard'
//   }

//   /**
//    * Установить класс товара в соответствии с категорией
//    */
//   setClassCards(product: Product) {
//     return this.massCotegory[product.category as keyof typeof this.massCotegory]
//   }
// }

// /**
//  * Класс Элементов карточки
//  */
// export class CardsElements extends CotegoreCards implements ICardsElements  {
//   /**
//    * Карточка
//    */
//   protected _card: HTMLElement;

//   /**
//    * Элемент карточки: Котегория
//    */
//   protected _cotegory: HTMLElement;

//   /**
//    * Элемент карточки: Изображение
//    */
//   protected _image: HTMLImageElement;

//   /**
//    * Элемент карточки: Заголовок
//    */
//   protected _title: HTMLElement;
//   /**
//    * Элемент карточки: Ценна
//    */
//   protected _price: HTMLElement;
//   /**
//    * Элемент карточки:Описание
//    */
//   protected _text: HTMLElement;
//   /**
//    * Элемент карточки: Кнопка
//    */
//   protected _button: HTMLButtonElement;

//   constructor(
//     _card: HTMLElement
//   ) {
//     super()
//     this._card = _card;
    
//     this._cotegory = this._card.querySelector('.card__category');
//     this._image = this._card.querySelector('.card__image');
//     this._title = this._card.querySelector('.card__title');
//     this._price = this._card.querySelector('.card__price');
//     this._text = this._card.querySelector('.card__text');
//     this._button = this._card.querySelector('.card__button')
//   }

//   /**
//    * Отображение на главное странице
//    * Устонавливает данные товара в карточку на главной странице
//    */
//   renderCatologCards(product: Product) {
//     this._cotegory.classList.add(this.setClassCards(product));
//     this._cotegory.textContent = product.category;
//     this._image.src = CDN_URL + product.image;
//     this._title.textContent = product.title;

//     if(product.price === null) {
//       this._price.textContent = `Закончился`;
//     } else {
//       this._price.textContent = this.getPatterPraci(`${product.price}`) + ' синапсов';
//     }

//     return this._card;
//   }

//   /**
//    * Отображение отдельной карточки
//    * Устонавливает данные товара в карточку в одиночном товара
//    */
//   renderCards(product: Product) {
//     this._cotegory.classList.add(this.setClassCards(product));
//     this._text.textContent = product.description;
//     this._cotegory.textContent = product.category;
//     this._title.textContent = product.title;

//     if(product.price === null) {
//       this._price.textContent = `Закончился`;
//     } else {
//       this._price.textContent = this.getPatterPraci(`${product.price}`) + ' синапсов';
//     }

//     this._image.src = `${CDN_URL}${product.image}`;

//     return this._card;
//   }

//   /**
//    * Возвращает HTMLElement карточки товара
//    */
//   getCard(): HTMLElement {
//     return this._card;
//   }

//   /**
//    *  Возвращает кнопку карточки
//    */
//   getButtonCard(): HTMLButtonElement {
//     return this._button;
//   }
// }

// /**
//  * Класс Элементов корзины
//  */
// export class CardsBasket extends CardsElements implements ICardsBasket {
//   /**
//    * Элемент индекса товара в корзины
//    */
//   protected _basketIndex: HTMLElement;

//   constructor(element: HTMLElement) {
//     super(element);
//     this._basketIndex = this._card.querySelector('.basket__item-index'); 
//   }
//   /**
//    * Возвращает карточку товара корзины
//    */
//   getCardsBasketView(product: Product) {
//     this._title.textContent = product.title;
//     this._price.textContent = this.getPatterPraci(`${product.price}`);

//     return this._card;
//   }

//   /**
//    * Возвращает Элемент индекса корзины
//    */
//   getIndexBasket() {
//     return this._basketIndex;
//   }
// }