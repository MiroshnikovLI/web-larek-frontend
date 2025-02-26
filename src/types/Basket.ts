import { EventEmitter } from "../components/base/events";
import { Model } from "../components/base/model";
import { IProduct } from "./Product";

export interface IBasketElement {
  /** Корзина */
  basket: HTMLElement;

  /** Элемент списка корзины */
  basketList: HTMLElement;

  /** Кнопка в корзине */
  basketButton: HTMLButtonElement;

  /** Элемент цены корзины */
  basketPrice: HTMLElement;

  /** Емитер */
  events: EventEmitter;

  /** Получить список корзины */
  get getList(): HTMLElement 

  /** Очистить лист товаров корзины */
  clearBasketList(): void
}

export interface IBasket extends IBasketElement {
  /** Отображение полной стоимости корзины */
  convertToPriceString(value: number): string
}

export interface IBasketData extends Model<IProduct> {
  /** Массив продуктов */
  basketItems: IProduct[]

  /** Добавления продукта в корзину */
  set addProductBasket(product: IProduct)

  /** Удалить все продукты с корзины */
  deleteAllProducts(): void

  /** Получить количество товара в корзине */
  get ProductsQuantity(): number

  /** Получить полный список покупок */
  get AllProducts(): IProduct[]

  /** Получить полную сумму корзины */
  get TotalPrice(): number

  /** Удаление продукта с корзины */
  deleteProduct(product: IProduct): void

  /** Получение полного списка ID товара для отправки на сервер */
  get allIdProducts(): string[]
}