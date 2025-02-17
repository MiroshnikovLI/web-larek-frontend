import { ICustomerInformation } from "./Data";

/**
 * Класс формы
 */
export interface IForm {
  /**
   * Массив валидации формы
   */
  formValid: IFormValid;

  /**
   * Массив ошибок формы
   */
  readonly _errorMessage: IErrorMessage

  /**
   * Вывод ошибок формы
   */
  getErrorMessage(value1: string, value2: string): string

  /**
   * Получить все инпуты формы
   */
  getInputForm(): NodeListOf<HTMLInputElement>

  /**
   * Валидация инпутов
   */
  getValidationInput(el: boolean, mass: string): boolean
  

  /**
   * Отключение кнопки формы
   */
  getDisablesButton(bool1: boolean, bool2: boolean): boolean

  /**
   * Валидация кнопак оплаты
   */
  validButtonPayment(info: ICustomerInformation): void

  /**
   * Форма
   */
  getForm(): HTMLElement

  /**
   * Кнопка
   */
  getButtonSubmit(): HTMLButtonElement
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
}

