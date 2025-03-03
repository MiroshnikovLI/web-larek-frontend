import { Component } from "../components/base/Component";
import { IContactField, IOrderField } from "./AppData";

export interface IForm<T> extends Component<IFormState> {
  /** Состояние кнопки отправки формы */
  set valid(value: boolean)

  /** Установить текс ошибок в форму */
  set errors(value: string)

  /** Рендеринга формы */
  render(state: Partial<T> & IFormState): HTMLFormElement

}

export interface ContactsForm extends IForm<IContactField> {

  /** Установить значения поля ввода телефон */
  set phone(value: string)

  /** Установить значения поля ввода email */
  set email(value: string)
}

export interface DeliveryForm extends IForm<IOrderField> {

  /** Удалить активный класс с кнопок */
  disableButtons(): void

  /** Установить активный класс на кнопку */
  set payment(value: string)

  /** Установить значения поля ввода адрес */
  set address(value: string)
}

export interface IFormContact {
  /** Очистить поля формы */
  clearInputValue(): void
}

export interface IFormState {
  valid: boolean;
  errors: string[];
}

export interface IOrderForm {
  payment: string;
  address: string;
  email: string;
  phone: string;
}