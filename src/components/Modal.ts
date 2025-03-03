import { IEvents, IKeydown, IMouseClick } from "../types";
import { IModalElement, IModalWindows, ISuccess, } from "../types/Modal";
import { Component } from "./base/Component";

abstract class ModalElement extends Component<ModalElement> implements IModalElement {
  /** Контейнер модального окна */
  protected _modal: HTMLElement;

  /** Контейнер для вставки контента */
  protected _modalContent: HTMLElement;

  /** Класс открытия модального окна */
  protected _class: string;

  /** Кнопка закрытия модального окна */
  protected _buttonClose: HTMLButtonElement;

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

  /** Вставить информацию в модальное окно */
  set modalContent(items: HTMLElement) {
    this._modalContent.replaceChildren(items);
  }

  /** Кнопка закрытия модального окна */
  get buttonClose(): HTMLButtonElement {
    return this._buttonClose;
  }

  /** Очистка модального окна */
  clearModalContent() {
    this._modalContent.innerHTML = '';
  }
}

export class ModalWindows extends ModalElement implements IModalWindows {
  /** Емитор */
  protected events: IEvents;

  constructor(
    _modal: HTMLElement,
    _class: string,
    events: IEvents,
  ) {
    super(_modal, _class);

    this.events = events;
    this.buttonClose.addEventListener('click', () => this.closeModal());
    this._modal.addEventListener('click', (evt) => {
      const el = evt.target as HTMLElement;
      if (el.id === 'modal-container') {
        this.closeModal();
      }
    })
  }
  
  /** Открыть модальное окно */
  openModal(): void {
    this._modal.classList.add(this._class);
    this.events.emit('open:modal')
  }

  /** Закрыть модальное окно */
  closeModal(): void {
    this._modal.classList.remove(this._class);
    this.events.emit('close:modal');
  }
}

/** Класс оповещия о заверщение покупки */
export class Success extends Component<ISuccess> implements ISuccess{
  
  /** Контейнер окна оповещия о заверщение покупки */
  protected container: HTMLElement;

  /** Описание успешного выполнения заказа */
  protected orderSuccessDescription: HTMLElement;

  /** Кнопка закрытия окна */
  protected orderSuccessClose: HTMLButtonElement;

  /** Емитер */
  protected events: IEvents;

  constructor(
    container: HTMLElement,
    click: IMouseClick,
  ) {
    super(container)
    this.container = container;

    this.events = this.events;

    this.orderSuccessDescription = this.container.querySelector('.order-success__description');
    this.orderSuccessClose = this.container.querySelector('.order-success__close');

    this.orderSuccessClose.addEventListener('click', click.onClick);
  }

  /** Установить стоимость заказа */
  set price(value: number) {
    this.orderSuccessDescription.textContent = `${value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")} синапсов`;
  }
}
