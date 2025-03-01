import { IMouseClick } from "../types";
import { IForm, IFormContact, IFormOrder, IFormValid, IInputValue } from "../types/Form";
import { settings } from "../utils/constants"
import { ensureAllElements, ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { EventEmitter } from "./base/events";

/** Класс формы */
abstract class Form extends Component<IForm> implements IForm {
  /** Форма */
  forms: HTMLFormElement;

  /** Кнопка отправки формы */
  buttonSubmit: HTMLButtonElement;

  /** Контейнер ошибок формы */
  errorContainer: HTMLElement;

  /** Инпуты формы */
  inputsForms: HTMLInputElement[];

  constructor(
    forms: HTMLFormElement,
  ) {
    super(forms)

    this.forms = forms;

    this.errorContainer = ensureElement('.form__errors', this.forms);
    this.buttonSubmit = ensureElement<HTMLButtonElement>('button[type=submit]', this.forms);
    this.inputsForms = ensureAllElements<HTMLInputElement>('.form__input', this.forms);
    this.buttonSubmit.addEventListener('click', evt => {
      evt.preventDefault();
    });
  }

  /** Установить сообщение ошибки */
  set showErrorMessage(values: string) {
    super.setText(this.errorContainer, values);
  }

  /** Отключение кнопки формы */
  set getDisablesButton(bool: boolean) {
    bool ? super.setDisabled(this.buttonSubmit, false) : super.setDisabled(this.buttonSubmit, true)
  }
}

/** Класс формы ордер */
export class FormOrder extends Form implements IFormOrder {
  /** Класс активной кнопки */
  className: string;

  /** Кнопки оплаты */
  paymentsButton: HTMLButtonElement[];

  constructor(
    form: HTMLFormElement,
    className: string,
    click: IMouseClick,
  ) {
    super(form)

    this.className = className;
    this.paymentsButton = ensureAllElements('.button_alt', this.forms);
    this.buttonSubmit.addEventListener('click', click.onClick);

  }

  /** Получить информацию об оплате */
  get paymentInfo(): string {
    let pay: string;
    this.paymentsButton.forEach(ele => {
      ele.getAttribute('class').includes(this.className) ? pay = ele.getAttribute('name') : ''
    })
    return pay;
  }

  /** Получить адресс доставки */
  get addressInfo(): string {
    let address: string
    this.inputsForms.forEach(ele => {
      address = ele.value;
    })
    return address;
  }

  /** Очистить поля ввода формы */
  clearInputValue() {
    this.inputsForms.forEach(ele => {
      ele.value = '';
    })
  }

  /** Очистить информацию об оплате */
  clearPayment() {
    this.paymentsButton.forEach(le => {
      le.classList.remove(this.className);
    })
  }
}

/** Класс формы контактов */
export class FormContact extends Form implements IFormContact {
  constructor(
    form: HTMLFormElement,
    click: IMouseClick,
  ) {
    super(form);

    this.buttonSubmit.addEventListener('click', click.onClick);
  }

  /** Получить информацию полей Email и Phone */
  get inputInfo(): IInputValue {
    let inputValue: IInputValue = {
      email: '',
      phone: ''
    }
    this.inputsForms.forEach(ele => {
      ele.name === 'email' ? inputValue.email = ele.value : '';
      ele.name === 'phone' ? inputValue.phone = ele.value : '';
    })
    return inputValue;
  }

  /** Очистить поля формы */
  clearInputValue() {
    this.inputsForms.forEach(ele => {
      ele.value = '';
    })
  }
}

export class ValidForm {

  /** Емитер */
  events: EventEmitter;

  /** Массив валидации формы */
  formValid: IFormValid;

  constructor(evens: EventEmitter) {
    this.events = evens;
    this.formValid = {
      'formOfPayment': false,
      'address': false,
      'email': false,
      'phone': false,
    };
  }

  /** Валидация кнопок оплаты */
  validButtonPayment(button: HTMLButtonElement[], className: string) {
    button.forEach(ele => {
      ele.addEventListener('click', () => {
        button.forEach(le => {
          le.classList.remove(className);
        })
        ele.classList.add(className);
        this.formValid.formOfPayment = true;
        this.events.emit('payment:valid')
      })
    })
  }

  /** Валидация инпутов формы order */
  validInputsOrder(inputs: HTMLInputElement[]) {
    inputs.forEach(ele => {
      ele.addEventListener('input', () => {
        ele.value.length > 0 ? this.formValid[ele.name as keyof typeof this.formValid] = true : this.formValid[ele.name as keyof typeof this.formValid] = false;
        this.events.emit('input:valid:order')
      })
    })
  }

  /** Валидация инпутов формы contacts */
  validInputsContact(inputs: HTMLInputElement[]) {
    inputs.forEach(ele => {
      ele.addEventListener('input', () => {
        ele.value.length > 0 ? this.formValid[ele.name as keyof typeof this.formValid] = true : this.formValid[ele.name as keyof typeof this.formValid] = false;
        this.events.emit('input:valid:contact')
      })
    })
  }


  /** Установить сообщение ошибки */
  showErrorMessage(values: string[]) {
    const errors: string[] = [];
    values.forEach(value => {
      if (!(this.formValid[value as keyof typeof this.formValid])) {
        errors.push(settings.errorMessage[value as keyof typeof settings.errorMessage])
      }
    })
    return errors.join(' ');
  }

  /** Очистить массив валидации */
  clearFormValid() {
    this.formValid = {
      'formOfPayment': false,
      'address': false,
      'email': false,
      'phone': false,
    }
  }
}