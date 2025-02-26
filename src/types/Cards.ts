import { Component } from "../components/base/Component";
import { IProduct } from "./Product";

/** Класс Элементов карточки */
export interface ICardsElements extends Component<ICardsElements> {
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
  readonly massCotegory: ImassCotegory

  /** Установить изображение */
  set imgValue(product: IProduct)

  /** Установить цену продукта */
  set priceValue(product: IProduct)

  /** Установить категорию продукта */
  set cotegoryValue(product: IProduct)

  /** Установить заголовок продукта */
  set titleValue(product: IProduct)

  /** Установить описание продукта */
  set textValue(product: IProduct)
}

export interface ImassCotegory {
  'софт-скил': string;
  'другое': string;
  'дополнительное': string;
  'кнопка': string;
  'хард-скил': string;
}