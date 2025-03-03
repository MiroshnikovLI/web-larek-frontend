import { Component } from "../components/base/Component";

export interface IModalElement extends Component<IModalElement> {

  /** Фиксирование модального окна по центру экрана */
  setFixedModalWindows(): void

  /** Удаление абсолютного позицианирования */
  deleteFixedModalWindows(): void

  /** Вставить информацию в модальное окно */
  set modalContent(items: HTMLElement)

  /** Кнопка закрытия модального окна */
  get buttonClose(): HTMLButtonElement

  /** Очистка модального окна */
  clearModalContent(): void
}

export interface IModalWindows extends IModalElement {
  
  /** Открыть модальное окно */
  openModal(): void

  /** Закрыть модальное окно */
  closeModal(): void
}

/** Класс оповещия о заверщение покупки */
export interface ISuccess extends Component<ISuccess> {
  /** Установить стоимость заказа */
  set price(value: number)
}
