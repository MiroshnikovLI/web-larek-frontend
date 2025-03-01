import { IMouseClick } from "../types";
import { IBasket, IBasketData, IBasketElement } from "../types/Basket";
import { IProduct } from "../types/Product";
import { createElement, ensureElement } from "../utils/utils";
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

  /** Кнопка корзины на главном экране */
  basketButtonBody: HTMLButtonElement;

  /** Элемент цены корзины */
  basketPrice: HTMLElement;

  constructor(
    container: HTMLElement,
    basketButtonBody: HTMLButtonElement
  ) {
    super(container)

    this.basket = container;
  
    this.basketList = ensureElement('.basket__list', this.basket);
    this.basketPrice = ensureElement('.basket__price', this.basket);
    this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.basket);
    this.basketButtonBody = basketButtonBody;
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
    basketButtonBody: HTMLButtonElement,
    click: IMouseClick,
  ) {
    super(container, basketButtonBody);

    this.basketButtonBody.addEventListener('click', click.onClick)
    this.basketButton.addEventListener('click', () => {
      events.emit('click:form:order');
    })
  }

  /** Показать список корзины */
  set items(items: HTMLElement[]) { 
    if (items.length) { 
        this.basketList.replaceChildren(...items);
        this.basketButton.disabled = false;
    } else { 
        this.basketButton.disabled = true;
        this.basketList.replaceChildren( 
            createElement<HTMLParagraphElement>('p', {
                textContent: 'В корзине нет товаров',
                style: 'display: grid; place-items: center; height: 88%;'
            }) 
        ); 
    } 
  } 

  /** Получить общую стоимость корзины  */
  convertToPriceString(value: number): string {
    return value === 0 ? '' : `${value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")} синапсов`
  }
}

export class BasketData extends Model<IProduct> implements IBasketData {
  /** Массив продуктов */
  basketItems: IProduct[] = [];

  /** Добавления продукта в корзину */
  set addProductBasket(product: IProduct) {
    if (!this.basketItems.includes(product)) {
      this.basketItems.push(product);
    }
    super.emitChanges('counter:basket');
    super.emitChanges('render:basket:list');
  }

  /** Удалить все продукты с корзины */
  deleteAllProducts() {
    this.basketItems.length = 0;
    super.emitChanges('counter:basket');
  }

  /** Получить количество товара в корзине */
  get productsQuantity(): number {
    return this.basketItems.length;
  }

  /** Получить полный список покупок */
  get allProducts(): IProduct[] {
    return this.basketItems;
  }

  /** Получить полную сумму корзины */
  get totalPrice(): number {
    const item = this.basketItems
    return this.basketItems.reduce((acc, item) => acc + (item.price || 0), 0)
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
    this.allProducts.forEach(el => (
      allIdProducts.push(el.id)
    ))
    return allIdProducts;
  }
}