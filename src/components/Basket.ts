import { IBasket, IBasketData, IBasketElement } from "../types/Basket";
import { IProduct } from "../types/Product";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/events";
import { Model } from "./base/model";

abstract class BasketElement extends Component<IBasketElement> implements IBasketElement {
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

  constructor(
    container: HTMLElement,
    events: EventEmitter,
  ) {
    super(container)

    this.basket = container;
  
    this.basketList = ensureElement('.basket__list', this.basket);
    this.basketPrice = ensureElement('.basket__price', this.basket);
    this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.basket);

  }

  /** Получить список корзины */
  get getList(): HTMLElement {
    return this.basketList;
  }

  /** Очистить лист товаров корзины */
  clearBasketList() {
    this.basketList.innerHTML = '';
  }
}

export class Basket extends BasketElement implements IBasket {
  constructor(
    container: HTMLElement,
    events: EventEmitter,
  ) {
    super(container, events);

    this.basketButton.addEventListener('click', () => {
      events.emit('click:form:order');
    })
  }

  convertToPriceString(value: number): string {
    return `${value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")} синапсов`;
  }
}

export class BasketData extends Model<IProduct> implements IBasketData {
  /** Массив продуктов */
  basketItems: IProduct[] = []; // Переименовать

  /** Добавления продукта в корзину */
  set addProductBasket(product: IProduct) {
    if (!this.basketItems.includes(product)) {
      this.basketItems.push(product);
    }
    super.emitChanges('counter:basket');
  }

  /** Удалить все продукты с корзины */
  deleteAllProducts() {
    this.basketItems.length = 0;
  }

  /** Получить количество товара в корзине */
  get ProductsQuantity(): number {
    return this.basketItems.length;
  }

  /** Получить полный список покупок */
  get AllProducts(): IProduct[] {
    return this.basketItems;
  }

  /** Получить полную сумму корзины */
  get TotalPrice(): number {
    let sum = 0;
    const red = this.basketItems.map(g => g.price += sum);
    const numbers = red;
    const sumOfNumbers = numbers.reduce((acc, number) => acc + number, 0);
    return sumOfNumbers
  }

  /** Удаление продукта с корзины */
  deleteProduct(product: IProduct) {
    this.basketItems = this.basketItems.filter(x => { return x.id != product.id });
    super.emitChanges('counter:basket');
    super.emitChanges('click:basket')
    super.emitChanges('render:basket:list')
  }

  /** Получение полного списка ID товара для отправки на сервер */
  get allIdProducts(): string[] {
    const allIdProducts: string [] = [];
    this.AllProducts.forEach(el => (
      allIdProducts.push(el.id)
    ))
    return allIdProducts;
  }
}