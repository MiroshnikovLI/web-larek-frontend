import { EventEmitter } from "../components/base/events";

export interface IForm {
  /** Форма */
  forms: HTMLFormElement;

  /** Кнопка отправки формы */
  buttonSubmit: HTMLButtonElement;

  /** Контейнер ошибок формы */
  errorContainer: HTMLElement;

  /** Инпуты формы */
  inputsForms: HTMLInputElement[];

  /** Установить сообщение ошибки */
  set showErrorMessage(values: string)

  /** Отключение кнопки формы */
  set getDisablesButton(bool: boolean)
}

export interface IFormOrder {
  /** Класс активной кнопки */
  className: string;

  /** Кнопки оплаты */
  paymentsButton: HTMLButtonElement[];

  /** Получить информацию об оплате */
  get paymentInfo(): string

  /** Получить адресс доставки */
  get addressInfo(): string

  /** Очистить поля ввода формы */
  clearInputValue(): void

  /** Очистить информацию об оплате */
  clearPayment(): void
}

export interface IFormContact {

  /** Получить информацию полей Email и Phone */
  get inputInfo(): IInputValue

  /** Очистить поля формы */
  clearInputValue(): void
}

export interface IValidForm {

  /** Емитер */
  events: EventEmitter;

  /** Массив валидации формы */
  formValid: IFormValid;

  /** Валидация кнопок оплаты */
  validButtonPayment(button: HTMLButtonElement[], className: string): void

  /** Валидация инпутов формы order */
  validInputsOrder(inputs: HTMLInputElement[]): void

  /** Валидация инпутов формы contacts */
  validInputsContact(inputs: HTMLInputElement[]): void


  /** Установить сообщение ошибки */
  showErrorMessage(values: string[]): void

  /** Очистить массив валидации */
  clearFormValid(): void
}

export interface IFormValid  {
  'formOfPayment': boolean;
  'address': boolean;
  'email': boolean;
  'phone': boolean;
}

export interface IErrorMessage  {
  'formOfPayment': string;
  'address': string;
  'email': string;
  'phone': string;
  'NotFound': string;
}

export interface IInputValue {
  email: string;
  phone: string;
}