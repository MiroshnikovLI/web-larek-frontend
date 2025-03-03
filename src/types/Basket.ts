import { Component } from "../components/base/Component";

export interface IBasket extends Component<IBasket> {

  /** Установить стоимость корзины */
  set basketPrice(value: number)

  /** Получить список корзины */
  get getList(): HTMLElement

  /** Показать список корзины */
  set items(items: HTMLElement[])

  /** Очистить лист товаров корзины */
  clearBasketList(): void
}