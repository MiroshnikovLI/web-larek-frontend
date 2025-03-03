import { IEvents } from "../types";
import { IContactField, IOrderField } from "../types/AppData";
import { IFormState } from "../types/Form";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export class Form<T> extends Component<IFormState> {
  /** Кнопки отправки формы */
  protected _submit: HTMLButtonElement;

  /** Контейнер ошибок формы */
  protected _errors: HTMLElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {

    super(container);

    this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
    this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

    this.container.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.onInputChange(field, value);
    });

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.events.emit(`${this.container.name}:submit`);
    });

  }

  /** Вызов события при изменение введенных данных */
  protected onInputChange(field: keyof T, value: string) {
    this.events.emit(`${this.container.name}.${String(field)}:change`, {
      field,
      value
    });
  }

  /** Состояние кнопки отправки формы */
  set valid(value: boolean) {
    this._submit.disabled = !value;
  }

  /** Установить текс ошибок в форму */
  set errors(value: string) {
    this.setText(this._errors, value);
  }

  /** Рендеринга формы */
  render(state: Partial<T> & IFormState) {
    const { valid, errors, ...inputs } = state;
    super.render({ valid, errors });
    Object.assign(this, inputs);
    return this.container;
  }

}

export class ContactsForm extends Form<IContactField> {

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }

  /** Установить значения поля ввода телефон */
  set phone(value: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
  }

  /** Установить значения поля ввода email */
  set email(value: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
  }
}

export class OrderForm extends Form<IOrderField> {

  protected _cardButton: HTMLButtonElement;

  protected _cashButton: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
    this._cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);

    this._cardButton.classList.add('button_alt-active');

    this._cashButton.addEventListener('click', () => {
      this.onInputChange('payment', 'cash');
    });

    this._cardButton.addEventListener('click', () => {
      this.onInputChange('payment', 'card');
    });
  }

  /** Удалить активный класс с кнопок */
  disableButtons() {
    this._cardButton.classList.remove('button_alt-active');
    this._cashButton.classList.remove('button_alt-active');
  }

  /** Установить активный класс на кнопку */
  set payment(value: string) {
    this._cashButton.classList.toggle('button_alt-active', value === 'cash');
    this._cardButton.classList.toggle('button_alt-active', value === 'card');
  }

  /** Установить значения поля ввода адрес */
  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
  }
}