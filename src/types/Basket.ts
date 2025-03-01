import { EventEmitter } from "../components/base/events";
import { IProduct } from "./Product";

export interface IBasketElement {
  /** Корзина */
  basket: HTMLElement;

  /** Элемент списка корзины */
  basketList: HTMLElement;

  /** Кнопка в корзине */
  basketButton: HTMLButtonElement;

  /** Кнопка корзины на главном экране */
  basketButtonBody: HTMLButtonElement;

  /** Элемент цены корзины */
  basketPrice: HTMLElement;

  /** Получить список корзины */
  get getList(): HTMLElement

  /** Очистить лист товаров корзины */
  clearBasketList(): void
}

export interface IBasket {
  /** Показать список корзины */
  set items(items: HTMLElement[])

  /** Получить общую стоимость корзины  */
  convertToPriceString(value: number): string 
}

export interface IBasketData  {
  /** Массив продуктов */
  basketItems: IProduct[]

  /** Добавления продукта в корзину */
  set addProductBasket(product: IProduct)

  /** Удалить все продукты с корзины */
  deleteAllProducts(): void

  /** Получить количество товара в корзине */
  get productsQuantity(): number

  /** Получить полный список покупок */
  get allProducts(): IProduct[]

  /** Получить полную сумму корзины */
  get totalPrice(): number

  /** Удаление продукта с корзины */
  deleteProduct(product: IProduct): void

  /** Получение полного списка ID товара для отправки на сервер */
  get allIdProducts(): string[]
}