import { IEvents, IMouseClick } from "../types";
import { IBasket } from "../types/Basket";
import { createElement, ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export class Basket extends Component<IBasket> implements IBasket {
  /** Корзина */
  protected basket: HTMLElement;

  /** Элемент списка корзины */
  protected basketList: HTMLElement;

  /** Кнопка в корзине */
  protected basketButton: HTMLButtonElement;

  /** Кнопка корзины на главном экране */
  protected basketButtonBody: HTMLButtonElement;

  /** Элемент цены корзины */
  protected _basketPrice: HTMLElement;

  constructor(
    container: HTMLElement,
    events: IEvents,
    basketButtonBody: HTMLButtonElement,
    click: IMouseClick,
  ) {
    super(container)

    this.basket = container;

    this.basketList = ensureElement('.basket__list', this.basket);
    this._basketPrice = ensureElement('.basket__price', this.basket);
    this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.basket);
    this.basketButtonBody = basketButtonBody;
    this.basketButtonBody.addEventListener('click', click.onClick)
    this.basketButton.addEventListener('click', () => {
      events.emit('click:form:order');
    })
  }

  /** Установить стоимость корзины */
  set basketPrice(value: number) {
    value === 0 ? this._basketPrice.textContent = '' : this._basketPrice.textContent = `${value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")} синапсов`
  }

  /** Получить список корзины */
  get getList(): HTMLElement {
    return this.basketList;
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

  /** Очистить лист товаров корзины */
  clearBasketList() {
    this.basketList.innerHTML = '';
  }
}