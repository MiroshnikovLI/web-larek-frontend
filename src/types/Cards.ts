import { Component } from "../components/base/Component";

export interface IBaseCard extends Component<IBaseCard> {

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

/** Класс карточки продукта в корзине */
export interface ICardBasket extends IBaseCard {
  
  /** Установить порядковыый номер товара в корзине */
  set basketIntex(value: number)
}

export interface ImassCotegory {
  'софт-скил': 'card__category_soft',
  'другое': 'card__category_other',
  'дополнительное': 'card__category_additional',
  'кнопка': 'card__category_button',
  'хард-скил': 'card__category_hard'
}
