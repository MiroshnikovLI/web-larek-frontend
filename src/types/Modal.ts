import { EventEmitter } from "../components/base/events";

export interface IModalElement {
  /** Контейнер модального окна */
  _modal: HTMLElement;

  /** Контейнер для вставки контента */
  _modalContent: HTMLElement;

  /** Класс открытия модального окна */
  _class: string;

  /** Кнопка закрытия модального окна */
  _buttonClose: HTMLButtonElement;
  
  /** Фиксирование модального окна по центру экрана */
  setFixedModalWindows(): void

  /** Удаление абсолютного позицианирования */
  deleteFixedModalWindows(): void

  /** Элемент контента модального окна */
  get modalContent(): HTMLElement

  /** Кнопка закрытия модального окна */
  get buttonClose(): HTMLButtonElement

  /** Модальное окно */
  get modal(): HTMLElement

  /** Очистка модального окна */
  clearModalContent(): void
}

export interface IModalWindows {
  /** Емитор */
  events: EventEmitter;
  
  /** Открыть модальное окно */
  openModal(): void

  /** Закрыть модальное окно */
  closeModal(): void
}

export interface ISuccess {
  /** Контейнер окна оповещия о заверщение покупки */
  container: HTMLElement;

  /** Описание успешного выполнения заказа */
  orderSuccessDescription: HTMLElement;

  /** Кнопка закрытия окна */
  orderSuccessClose: HTMLButtonElement;

  /** Емитер */
  events: EventEmitter;

  /** Контейнер окна оповещия о заверщение покупки */
  getSuccess(): HTMLElement

  /** Установить стоимость заказа */
  set price(value: number)
}
