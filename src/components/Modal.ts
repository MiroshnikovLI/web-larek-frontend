import { IMouseClick } from "../types";
import { IModalElement, IModalWindows, ISuccess, } from "../types/Modal";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/events";

abstract class ModalElement extends Component<IModalElement> implements IModalElement {
  /** Контейнер модального окна */
  _modal: HTMLElement;

  /** Контейнер для вставки контента */
  _modalContent: HTMLElement;

  /** Класс открытия модального окна */
  _class: string;

  /** Кнопка закрытия модального окна */
  _buttonClose: HTMLButtonElement;

  constructor(
    _modal: HTMLElement,
    _class: string,
  ) {
    super(_modal);

    this._modal = _modal;
    this._class = _class;
    this._modalContent = this._modal.querySelector('.modal__content');
    this._buttonClose = this._modal.querySelector('.modal__close');
  }
  
  /** Фиксирование модального окна по центру экрана */
  setFixedModalWindows() {
    this._modal.style.position = 'fixed';
  }

  /** Удаление абсолютного позицианирования */
  deleteFixedModalWindows() {
    this._modal.style.removeProperty('position');
  }

  /** Элемент контента модального окна */
  get modalContent(): HTMLElement {
    return this._modalContent;
  }

  /** Кнопка закрытия модального окна */
  get buttonClose(): HTMLButtonElement {
    return this._buttonClose;
  }

  /** Модальное окно */
  get modal(): HTMLElement {
    return this._modal;
  }

  /** Очистка модального окна */
  clearModalContent() {
    this._modalContent.innerHTML = '';
  }
}

export class ModalWindows extends ModalElement implements IModalWindows {
  /** Емитор */
  events: EventEmitter;

  constructor(
    _modal: HTMLElement,
    _class: string,
    events: EventEmitter,
  ) {
    super(_modal, _class);

    this.events = events;
    this.buttonClose.addEventListener('click', () => this.closeModal());
    this.modal.addEventListener('click', (evt) => {
      const el = evt.target as HTMLElement;
      if (el.id === 'modal-container') {
        this.closeModal();
      }
    })
  }
  
  /** Открыть модальное окно */
  openModal(): void {
    this.modal.classList.add(this._class);
    this.events.emit('open:modal')
  }

  /** Закрыть модальное окно */
  closeModal(): void {
    this.modal.classList.remove(this._class);
    this.events.emit('close:modal');
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

  /** Емитер */
  events: EventEmitter;

  constructor(
    container: HTMLElement,
    click: IMouseClick,
  ) {
    this.container = container;

    this.events = this.events;

    this.orderSuccessDescription = this.container.querySelector('.order-success__description');
    this.orderSuccessClose = this.container.querySelector('.order-success__close');

    this.orderSuccessClose.addEventListener('click', click.onClick);
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
