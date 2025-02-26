import { ICardsElements, ImassCotegory } from "../types/Cards";
import { IProduct } from "../types/Product";
import { CDN_URL } from "../utils/constants";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/events";
import { BasketData } from "./Basket";

/** Класс Элементов карточки */
export abstract class CardsElements extends Component<ICardsElements> implements ICardsElements {
  /** Карточка */
  _card: HTMLElement;

  /** Элемент карточки: Котегория */
  _cotegory: HTMLElement;

  /** Элемент карточки: Изображение */
  _image: HTMLImageElement;

  /** Элемент карточки: Заголовок */
  _title: HTMLElement;

  /** Элемент карточки: Ценна */
  _price: HTMLElement;

  /** Элемент карточки: Описание */
  _text: HTMLElement;

  /** Элемент карточки: Кнопка */
  _button: HTMLButtonElement;

  /** Массив котегорий карточек */
  readonly massCotegory: ImassCotegory = {
    'софт-скил': 'card__category_soft',
    'другое': 'card__category_other',
    'дополнительное': 'card__category_additional',
    'кнопка': 'card__category_button',
    'хард-скил': 'card__category_hard'
  }

  constructor(
    _card: HTMLElement,
  ) {
    super(_card)
    this._card = _card;

    this._cotegory = this._card.querySelector('.card__category');
    this._image = this._card.querySelector<HTMLImageElement>('.card__image');
    this._title = ensureElement('.card__title', this._card);
    this._price = ensureElement('.card__price', this._card);
    this._text = this._card.querySelector('.card__text');
    this._button = this._card.querySelector<HTMLButtonElement>('.card__button');
  }

  /** Установить изображение */
  set imgValue(product: IProduct) {
    this._image.src = `${CDN_URL + product.image}`
  }

  /** Установить цену продукта */
  set priceValue(product: IProduct) {
    if (product.price === null) {
      this._price.textContent = `Бесценно`;
    } else {
      this._price.textContent = `${product.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")}` + ' синапсов';
    }
  }

  /** Установить категорию продукта */
  set cotegoryValue(product: IProduct) {
    this._cotegory.classList.add(this.massCotegory[product.category as keyof typeof this.massCotegory]);
    this._cotegory.textContent = product.category
  }

  /** Установить заголовок продукта */
  set titleValue(product: IProduct) {
    this._title.textContent = product.title
  }

  /** Установить описание продукта */
  set textValue(product: IProduct) {
    this._text.textContent = product.description
  }
}

/** Класс каталога продуктов */
export class CatologProduct extends CardsElements {
  constructor(
    _card: HTMLElement,
    product: IProduct,
    event: EventEmitter,
  ) {
    super(_card);

    this.imgValue = product;
    this.priceValue = product;
    this.cotegoryValue = product;
    this.titleValue = product;

    this._card.addEventListener('click', () => event.emit('click:card:page', product))
  }
}

/** Класс карточки продукта */
export class Card extends CardsElements {
  constructor(
    card: HTMLElement,
    product: IProduct,
    basket: BasketData,
    event: EventEmitter
  ) {
    super(card)

    this.imgValue = product,
    this.cotegoryValue = product,
    this.titleValue = product,
    this.textValue = product,
    this.priceValue = product

    if (product.price === null) {
      super.setDisabled(this._button, true);
    } else {
      super.setDisabled(this._button, false);
    }
    
    if (basket.AllProducts.includes(Object(product))) {
      super.setDisabled(this._button, true);
    } else {
      this._button.addEventListener('click', () => event.emit('click:add:basket', product))
    }
  }
}

/** Класс карточки продукта в корзине */
export class CardBasket extends CardsElements {

  protected _basketIndex: HTMLElement;

  constructor(
    card: HTMLElement,
    product?: IProduct,
    basket?: BasketData,
    count?: number
  ) {
    super(card)

    this.priceValue = product,
    this.titleValue = product

    this._basketIndex = this._card.querySelector('.basket__item-index');

    this._basketIndex.textContent = `${count}`;
    
    this._button.addEventListener('click', () => basket.deleteProduct(product));
  }
  
}
