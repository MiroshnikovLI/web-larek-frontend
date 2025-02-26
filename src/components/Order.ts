import { IOrder, IOrderArray } from "../types/Order";

export class Order implements IOrder {
  /** Массив информации */
  order: IOrderArray = {
    items: [],
    payment: '',
    total: null,
    address: '',
    email: '',
    phone: '',
  }

  /** Установить список ID продуктов */
  set items(product: string[]) {
    this.order.items = product;
  }

  /** Установить информацию об оплате */
  set payment(value: string) {
    this.order.payment = value;
  }

  /** Утановить общую сумму */
  set total(count: number) {
    this.order.total = count;
  }

  /** Установить адрес */
  set addres(ShippingAddress: string) {
    this.order.address = ShippingAddress;
  }

  /** Установить Email */
  set email(email: string) {
    this.order.email = email;
  }

  /** Установить номер телефона */
  set phone(phone: string) {
    this.order.phone = phone;
  }

  /** Получить массив информации */
  get оrderArray() {
    return this.order
  }

  /** Очистить массив информации */
  clearOrderArray() {
    this.order = {
      items: [],
      payment: '',
      total: null,
      address: '',
      email: '',
      phone: '',
    }
  }
}