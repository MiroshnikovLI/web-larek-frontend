import { IErrorMessage } from "../types/Form";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings: Isettings = {
  errorMessage: {
    'formOfPayment': 'Выберите способ оплаты',
    'address': 'Введите адрес доставки',
    'email': 'Введите Email',
    'phone': 'Введите телефон',
    'NotFound': 'Ошибка соединение с сервером, попробуйте перезагрузить страницу',
  },
  array: {
    payment: '',
    address: '',
    email: '',
    phone: '',
  } 
};

interface Isettings {
  errorMessage: IErrorMessage;
  array: IArray;
}

interface IArray {
  payment: string,
  address: string,
  email: string,
  phone: string,
}