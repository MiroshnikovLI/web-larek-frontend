/** Класс Элементов карточки */
export interface IBaseCard {
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
  set imgValue(value: string)

  /** Установить цену продукта */
  set priceValue(value: number | null)

  /** Установить класс категории продукта */
  set cotegoryClass(className: string)

  /** Установить текс котегории продукта */
  set cotegoryValie(value: string)

  /** Установить заголовок продукта */
  set titleValue(value: string)

  /** Установить описание продукта */
  set textValue(value: string)
}

export interface ICardBasket {
  /** Установить порядковыый номер товара в корзине */
  set basketIntex(value: number)
}


export interface ImassCotegory {
  'софт-скил': string;
  'другое': string;
  'дополнительное': string;
  'кнопка': string;
  'хард-скил': string;
}