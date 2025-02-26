import { IForm, IFormContact, IFormOrder, IFormsInfo, IFormValid, IOrderInfo } from "../types/Form";
import { IPage } from "../types/Page";
import { settings } from "../utils/constants"
import { Component } from "./base/Component";
import { EventEmitter } from "./base/events";

/** Класс формы */
abstract class Form extends Component<IForm> implements IForm{
  /** Форма */
  _forms: HTMLFormElement;

  /** Кнопка отправки формы */
  _buttonSubmit: HTMLButtonElement;

  /** Контейнер ошибок формы */
  _errorContainer: HTMLElement;

  /** Массив валидации формы */
  formValid: IFormValid;

  constructor(forms: HTMLFormElement) {
    super(forms)

    this._forms = forms;

    this.formValid = {
      'formOfPayment': false,
      'address': false,
      'email': false,
      'phone': false,
    };

    this._errorContainer = this._forms.querySelector('.form__errors');
    this._buttonSubmit = this._forms.querySelector('button[type=submit]');
    this._buttonSubmit.addEventListener('click', evt => {
      evt.preventDefault();
    });
  }

  /** Установить сообщение ошибки */
  set showErrorMessage(values: string[]) {
    const errors: string[] = [];
    values.forEach(value => {
      if (!(this.formValid[value as keyof typeof this.formValid])) {
        errors.push(settings.errorMessage[value as keyof typeof settings.errorMessage])
      }
    })
    this._errorContainer.textContent = errors.join(' ');
  }

  /** Получить все инпуты формы */
  get InputForm(): NodeListOf<HTMLInputElement> {
    const input = this._forms.querySelectorAll<HTMLInputElement>('.form__input');
    return input;
  }

  /** Валидация инпутов */
  ValidationInput(el: boolean, mass: string) {
    if (el) {
      this.formValid[mass as keyof typeof this.formValid] = true;
      return true;
    } else {
      this.formValid[mass as keyof typeof this.formValid] = false;
      return false;
    }
  }

  /** Отключение кнопки формы */
  getDisablesButton(bool1: boolean, bool2: boolean) {
    if (bool1 && bool2) {
      return this._buttonSubmit.disabled = false;
    } else {
      return this._buttonSubmit.disabled = true;
    }
  }

  /** Валидация кнопак оплаты */
  get buttonPayment(): NodeListOf<Element> {
    const buttonCard = this._forms.querySelectorAll('.button_alt');
    return buttonCard;
  }

  /** Форма */
  getForm() {
    return this._forms;
  }

  /** Кнопка */
  getButtonSubmit() {
    return this._buttonSubmit;
  }

  /** Очистка валидации вормы */
  deleteInfoFormValid() {
    this.formValid = {
      'formOfPayment': false,
      'address': false,
      'email': false,
      'phone': false,
    };
  }
}

/** Класс формы ордер */
export class FormOrder extends Form implements IFormOrder {
  /** Массив данных формы */
  OrderInfo: IOrderInfo = {
    'formOfPayment': '',
    'address': '',
  }

  constructor(
    form: HTMLFormElement,
    events: EventEmitter,
  ) {
    super(form)

    this.getButtonSubmit().addEventListener('click', () => {
      events.emit('click:form:content');
    })
  }

  /** Валидация кнопок оплаты */
  validButtonPayment() {
    this.buttonPayment.forEach(ele => {
      ele.addEventListener('click', () => {
        this.buttonPayment.forEach(le => {
          le.classList.remove('button_alt-active');
        })
        ele.classList.add('button_alt-active');
        this.formValid.formOfPayment = true;
        this.showErrorMessage = (['formOfPayment', 'address']);
        this.getDisablesButton(this.formValid.address, this.formValid.formOfPayment);
        this.OrderInfo.formOfPayment = ele.getAttribute('name');
      })
    })
  }

  /** Валидация инпутов формы */
  validInput() {
    this.InputForm.forEach(ele => {
      ele.addEventListener('input', () => {
        this.ValidationInput((ele.value.length > 0), ele.name);
        this.showErrorMessage = (['formOfPayment', 'address']);
        this.getDisablesButton(this.formValid.address, this.formValid.formOfPayment);
        this.OrderInfo.address = ele.value;
      })
    })
  }

  /** Получение информации формы */
  get InfoOrder(): IOrderInfo {
    return this.OrderInfo
  }

  /** Очистка информации формы */
  clearValidForm() {
    this.InputForm.forEach(ele => {
      ele.value = '';
    })

    this.buttonPayment.forEach(le => {
      le.classList.remove('button_alt-active');
    })
    this.OrderInfo = {
      'formOfPayment': '',
      'address': '',
    }
    this.setDisabled(this.getButtonSubmit(), true)
  }
}

/** Класс формы контактов */
export class FormContact extends Form implements IFormContact {
  /** Массив данных формы */
  FormsInfo: IFormsInfo = {
    'phone': '',
    'email': ''
  }

  constructor(
    form: HTMLFormElement,
    events: EventEmitter
  ) {
    super(form);

    this.validInput();
    this.getButtonSubmit().addEventListener('click', () => {
      events.emit('send:info:server');
    })
  }

 /** Валидация инпутов формы */
  validInput() {
    this.InputForm.forEach(element => {
      element.addEventListener('input', () => {
        this.ValidationInput((element.value.length > 0), element.name);
        this.showErrorMessage = (['phone', 'email']);
        this.getDisablesButton(this.formValid.phone, this.formValid.email);
        this.setInfo(element.name, element.value);
      })
    });
  }

  /** Установка информации в массив формы */
  setInfo(info: string, value: string): void {
    if (info) {
      this.FormsInfo[info as keyof typeof this.FormsInfo] = value;
    }
  }

  /** Получить массив формы */
  get InfoContacts(): IFormsInfo {
    return this.FormsInfo;
  }

  /** Очистить массив формы */
  clearValidForm() {
    this.InputForm.forEach(ele => {
      ele.value = '';
    })
    this.FormsInfo = {
      'phone': '',
      'email': ''
    }
    this.setDisabled(this.getButtonSubmit(), true)
  }
}
