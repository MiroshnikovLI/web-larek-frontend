import { Component } from "../components/base/Component";

export interface IForm extends Component<IForm> {
  /** Форма */
  _forms: HTMLFormElement;

  /** Кнопка отправки формы */
  _buttonSubmit: HTMLButtonElement;

  /** Контейнер ошибок формы */
  _errorContainer: HTMLElement;

  /** Массив валидации формы */
  formValid: IFormValid;

  /** Установить сообщение ошибки */
  set showErrorMessage(values: string[])

  /** Получить все инпуты формы */
  get InputForm(): NodeListOf<HTMLInputElement> 

  /** Валидация инпутов */
  ValidationInput(el: boolean, mass: string): boolean

  /** Отключение кнопки формы */
  getDisablesButton(bool1: boolean, bool2: boolean): void

  /** Валидация кнопак оплаты */
  get buttonPayment(): NodeListOf<Element>

  /** Форма */
  getForm(): HTMLFormElement

  /** Кнопка */
  getButtonSubmit(): HTMLButtonElement

  /** Очистка валидации вормы */
  deleteInfoFormValid(): void
}

/** Класс формы ордер */
export interface IFormOrder extends IForm {
  /** Массив данных формы */
  OrderInfo: IOrderInfo

  /** Валидация кнопок оплаты */
  validButtonPayment(): void

  /** Валидация инпутов формы */
  validInput(): void

  /** Получение информации формы */
  get InfoOrder(): IOrderInfo 

  /** Очистка информации формы */
  clearValidForm(): void
}

/** Класс формы контактов */
export interface IFormContact extends IForm {
  /** Массив данных формы */
  FormsInfo: IFormsInfo

 /** Валидация инпутов формы */
  validInput(): void

  /** Установка информации в массив формы */
  setInfo(info: string, value: string): void

  /** Получить массив формы */
  get InfoContacts(): IFormsInfo

  /** Очистить массив формы */
  clearValidForm(): void
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

export interface IOrderInfo {
  'formOfPayment': string;
  'address': string;
}

export interface IFormsInfo {
  'phone': string;
  'email': string;
}