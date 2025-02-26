import { IModalElement, IModalWindows, ISuccess, } from "../types/Modal";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/events";

abstract class ModalElement extends Component<IModalElement> implements IModalElement {
  /** Контейнер модального окна */
  _modal: HTMLElement;

  /** Контейнер страницы */
  _body: HTMLElement;

  /** Контейнер для вставки контента */
  _modalContent: HTMLElement;

  /** Класс открытия модального окна */
  _class: string;

  /** Класс емитера */
  events: EventEmitter;

  /** Кнопка закрытия модального окна */
  _buttonClose: HTMLButtonElement;

  constructor(
    _modal: HTMLElement,
    _class: string,
    events: EventEmitter,
  ) {
    super(_modal);

    this._modal = _modal;
    this._class = _class;
    this.events = events;
    this._modalContent = this._modal.querySelector('.modal__content');
    this._buttonClose = this._modal.querySelector('.modal__close');
  }

  /** Открые модального окна */
  setClassOpenModal() {
    super.toggleClass(this.Modal, this._class)
  }

  /** Фиксирование модального окна по центру экрана */
  setFixedModalWindows() {
    this._modal.style.position = 'fixed';
  }

  /** Удаление абсолютного позицианирования */
  deleteFixedModalWindows() {
    this._modal.style.removeProperty('position');
  }

  /** Закрытие модального окна */
  setClassCloseModal() {
    super.toggleClass(this.Modal, this._class);
  }

  /** Элемент контента модального окна */
  get ModalContent(): HTMLElement {
    return this._modalContent;
  }

  /** Кнопка закрытия модального окна */
  get ButtonClose(): HTMLButtonElement {
    return this._buttonClose;
  }

  /** Модальное окно */
  get Modal(): HTMLElement {
    return this._modal;
  }

  /** Очистка модального окна */
  clearModalContent() {
    this._modalContent.innerHTML = '';
  }
}

export class ModalWindows extends ModalElement implements IModalWindows {
  constructor(
    _modal: HTMLElement,
    _class: string,
    events: EventEmitter,
  ) {
    super(_modal, _class, events);
  }

  openModal(): void {
    this.events.emit('open:modal')
  }

  closeModal(): void {
    this.events.emit('close:modal')
  }

}

/** Класс оповещия о заверщение покупки */
export class Success implements ISuccess {
  /** Контейнер окна оповещия о заверщение покупки */
  container: HTMLElement;

  /** Описание успешного выполнения заказа */
  orderSuccessDescription: HTMLElement;

  /** Кнопка закрытия окна */
  orderSuccessClose: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    modal: IModalWindows,
  ) {
    this.container = container;

    this.orderSuccessDescription = this.container.querySelector('.order-success__description');
    this.orderSuccessClose = this.container.querySelector('.order-success__close');

    this.orderSuccessClose.addEventListener('click', () => modal.closeModal());
  }

  /** Контейнер окна оповещия о заверщение покупки */
  getSuccess() {
    return this.container;
  }

  /** Установить стоимость заказа */
  set price(value: number) {
    this.orderSuccessDescription.textContent = `${value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")} синапсов`;
  }
}
