import { Component } from "../components/base/Component";
import { EventEmitter } from "../components/base/events";

export interface IModalElement extends Component<IModalElement> {
  /** Контейнер модального окна */
  _modal: HTMLElement;

  /** Контейнер для вставки контента */
  _modalContent: HTMLElement;

  /** Класс открытия модального окна */
  _class: string;

  /** Класс емитера */
  events: EventEmitter;

  /** Кнопка закрытия модального окна */
  _buttonClose: HTMLButtonElement;

  /** Открые модального окна */
  setClassOpenModal(): void

  /** Фиксирование модального окна по центру экрана */
  setFixedModalWindows(): void

  /** Удаление абсолютного позицианирования */
  deleteFixedModalWindows(): void

  /** Закрытие модального окна */
  setClassCloseModal(): void


  /** Элемент контента модального окна */
  get ModalContent(): HTMLElement 

  /** Кнопка закрытия модального окна */
  get ButtonClose(): HTMLButtonElement

  /** Модальное окно */
  get Modal(): HTMLElement

  /** Очистка модального окна */
  clearModalContent(): void
}

export interface IModalWindows extends IModalElement {

  openModal(): void 

  closeModal(): void

}

export interface ISuccess  {
  /** Контейнер окна оповещия о заверщение покупки */
  container: HTMLElement;

  /** Описание успешного выполнения заказа */
  orderSuccessDescription: HTMLElement;

  /** Кнопка закрытия окна */
  orderSuccessClose: HTMLButtonElement;

  /** Контейнер окна оповещия о заверщение покупки */
  getSuccess(): void

  /** Установить стоимость заказа */
  set price(value: number)
}
