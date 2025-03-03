import { IMouseClick } from "../types";
import { IBaseCard, ICardBasket, ImassCotegory, } from "../types/Cards";
import { CDN_URL } from "../utils/constants";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

/** Класс Элементов карточки */
export abstract class BaseCard extends Component<IBaseCard> {
  /** Карточка */
  protected _card: HTMLElement;

  /** Элемент карточки: Котегория */
  protected _cotegory: HTMLElement;

  /** Элемент карточки: Изображение */
  protected _image: HTMLImageElement;

  /** Элемент карточки: Заголовок */
  protected _title: HTMLElement;

  /** Элемент карточки: Ценна */
  protected _price: HTMLElement;

  /** Элемент карточки: Описание */
  protected _text: HTMLElement;

  /** Элемент карточки: Кнопка */
  protected _button: HTMLButtonElement;

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
  set imgValue(value: string) {
    // this._image.src = `${CDN_URL + value}`
    super.setImage(this._image, `${CDN_URL + value}`)
  }

  /** Установить цену продукта */
  set priceValue(value: number | null) {
    const val = value === null ? 'Бесценно' : `${value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")}` + ' синапсов';
    super.setText(this._price, val)
  }

  /** Установить класс категории продукта */
  set cotegoryClass(className: string) {
    super.toggleClass(this._cotegory, this.massCotegory[className as keyof typeof this.massCotegory]);
  }

  /** Установить текс котегории продукта */
  set cotegoryValie(value: string) {
    super.setText(this._cotegory, value)
  } 

  /** Установить заголовок продукта */
  set titleValue(value: string) {
    super.setText(this._title, value)
  }

  /** Установить описание продукта */
  set textValue(value: string) {
    super.setText(this._text, value)
  }
}

/** Класс каталога продуктов */
export class CatologProduct extends BaseCard {
  constructor(
    _card: HTMLElement,
    click?: IMouseClick,
  ) {
    super(_card);
    this._card.addEventListener('click', click.onClick)
  }
}

/** Класс карточки продукта */
export class Card extends BaseCard {
  constructor(
    card: HTMLElement,
    disabled: boolean,
    click?: IMouseClick,
  ) {
    super(card)
    
    if (disabled) super.setDisabled(this._button, true);
    
    this._button.addEventListener('click', click.onClick)
  }
}

/** Класс карточки продукта в корзине */
export class CardBasket extends BaseCard implements ICardBasket {

  protected _basketIndex: HTMLElement;

  constructor(
    card: HTMLElement,
    click?: IMouseClick,
  ) {
    super(card)

    this._basketIndex = this._card.querySelector('.basket__item-index');

    this._button.addEventListener('click', click.onClick);

  }
  
  /** Установить порядковыый номер товара в корзине */
  set basketIntex(value: number) {
    super.setText(this._basketIndex, value)
  }
}
