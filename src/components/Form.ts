import { CustomerInformation } from "./Data";
import { Pattern } from "./Pattern";

export class Form {
  protected _forms: HTMLFormElement;
  protected _buttonSubmit: HTMLButtonElement;
  protected _errorContainer: HTMLElement;
  formValid: IFormValid;

  readonly _errorMessage: IErrorMessage =  {
    'formOfPayment': 'Выберите способ оплаты',
    'address': 'Введите адрес доставки',
    'email': 'Введите Email',
    'phone': 'Введите телефон',
  }
  
  constructor(forms: HTMLFormElement) {
    this._forms = forms;

    this.formValid = {
      'formOfPayment': false,
      'address': false,
      'email': false,
      'phone': false,
    };

    this._errorContainer = this._forms.querySelector('.form__errors');
    this._buttonSubmit = this._forms.querySelector('button[type=submit]');
    this._buttonSubmit.addEventListener('click', el => {
      el.preventDefault();
    });
  }

  getErrorMessage(value1: string, value2: string) {
    let errorMass1 = '';
    let errorMass2 = '';

    if(!(this.formValid[value1 as keyof typeof this.formValid])) {
      errorMass1 = this._errorMessage[value1 as keyof typeof this._errorMessage];
    } 
    if(!(this.formValid[value2 as keyof typeof this.formValid])) {
      errorMass2 = this._errorMessage[value2 as keyof typeof this._errorMessage];
    }

    return this._errorContainer.textContent = errorMass1 + ' ' + errorMass2;

  }

  // Получить все инпуты формы
  getInputForm() {
    const input = this._forms.querySelectorAll<HTMLInputElement>('.form__input');
    return input;
  }

  getValidationInput(el: boolean, mass: string) {
    if(el) {
      this.formValid[mass as keyof typeof this.formValid] = true;
      return true;
    } else {
      this.formValid[mass as keyof typeof this.formValid] = false;
      return false;
    }
  }

  getDisablesButton(bool1: boolean, bool2: boolean) {
    if(bool1 && bool2) {
      return this._buttonSubmit.disabled = false;
    } else {
      return this._buttonSubmit.disabled = true;
    }
  }

  validButtonPayment(info: CustomerInformation) {
    const buttonCard = this._forms.querySelectorAll('.button_alt');
      buttonCard.forEach(ele => {
        ele.addEventListener('click', () => {
          buttonCard.forEach(le => {
            le.classList.remove('button_alt-active');
          })
        ele.classList.add('button_alt-active');
        this.formValid.formOfPayment = true;
        info.setInfo('formOfPayment', ele.textContent);
        this.getErrorMessage('formOfPayment', 'address');
        this.getDisablesButton(this.formValid.address, this.formValid.formOfPayment);
      })
    })
  }

  getForm(){
    return this._forms;
  }

  getButtonSubmit() {
    return this._buttonSubmit;
  }
}

interface IFormValid  {
  'formOfPayment': boolean;
  'address': boolean;
  'email': boolean;
  'phone': boolean;
}

interface IErrorMessage  {
  'formOfPayment': string;
  'address': string;
  'email': string;
  'phone': string;
}

