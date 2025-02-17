// import { IModalWindows, ISuccess } from "../types/Modal";
// import { EventEmitter } from "./base/events";
// import { Basket } from "./Basket";

// export class ModalWindows implements IModalWindows {
//   /**
//    * Контейнер модального окна
//    */
//   protected _modal: HTMLElement;

//   /**
//    * Контейнер страницы
//    */
//   protected _body: HTMLElement;

//   /**
//    * Контейнер для вставки контента
//    */
//   protected _modalContent: HTMLElement;

//   /**
//    * Класс открытия модального окна
//    */
//   protected _data: string;

//   /**
//    * Класс емитера
//    */
//   protected events: EventEmitter;

//   /**
//    * Кнопка закрытия модального окна
//    */
//   protected _buttonClose: HTMLButtonElement;

//   constructor(
//     _body: HTMLElement,
//     _modal: HTMLElement,
//     _data: string,
//     events: EventEmitter,
//   ) {
//     this._body = _body;
//     this._modal = _modal;
//     this._data = _data;
//     this.events = events;
//     this._modalContent = this._modal.querySelector('.modal__content');
//     this._buttonClose = this._modal.querySelector('.modal__close');
//   }

//   /**
//    * Открые модального окна
//    */
//   openModal() {
//     this._modalContent.innerHTML = '';

//     this._modal.classList.add(`${this._data}`);
//     this._modal.style.position = 'fixed';
//     this._body.style.overflow = 'hidden';
//     this.events.emit('close:modal:keydown:esc:set');
//     this.events.emit('close:modal:click:set');
//   }

//   /**
//    * Закрытие модального окна
//    */
//   closeModal() {
//     this._modal.classList.remove(`${this._data}`);
//     this._modal.style.removeProperty('position');
//     this._body.style.overflow = 'auto';
//     this.events.emit('close:modal:keydown:esc:remove');
//     this.events.emit('close:modal:click:remove');
//   }

//   /**
//    * Элемент контента модального окна 
//    */
//   getModalContent(): HTMLElement {
//     return this._modalContent;
//   }

//   /**
//    * Кнопка закрытия модального окна
//    */
//   getButtonClose(): HTMLButtonElement {
//     return this._buttonClose;
//   }

//   /**
//    * Модальное окно
//    */
//   getModal(): HTMLElement {
//     return this._modal;
//   }

//   /**
//    * Очистка модального окна
//    */
//   clearModalContent() {
//     this._modalContent.innerHTML = '';
//   }
// }

// /**
//  * Класс оповещия о заверщение покупки 
//  */
// export class Success implements ISuccess {
//   /**
//    * Контейнер окна оповещия о заверщение покупки 
//    */
//   protected _container: HTMLElement;
//   /**
//    * Описание успешного выполнения заказа
//    */
//   protected _orderSuccessDescription: HTMLElement;
//   /**
//    * Кнопка закрытия окна
//    */
//   protected orderSuccessClose: HTMLButtonElement;

//   constructor(
//     container: HTMLElement,
//     basket: Basket,
//     modal: ModalWindows
//   ) {
//     this._container = container;
    
//     this._orderSuccessDescription = this._container.querySelector('.order-success__description');
//     this.orderSuccessClose = this._container.querySelector('.order-success__close');

//     this._orderSuccessDescription.textContent = `${basket.getPriceAll()} синапсов`;
//     this.orderSuccessClose.addEventListener('click', () => modal.closeModal());
//   }

//   /**
//    * Контейнер окна оповещия о заверщение покупки
//    */
//   getSuccess() {
//     return this._container;
//   }
// }
