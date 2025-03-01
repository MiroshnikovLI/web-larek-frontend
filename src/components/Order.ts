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
  set addres(shippingAddress: string) {
    this.order.address = shippingAddress;
  }

  /** Установить Email */
  set email(email: string) {
    this.order.email = email;
  }

  /** Установить номер телефона */
  set phone(phone: string) {
    this.order.phone = phone;
  }

  /** Получить обьект информации о заказе */
  get оrderArray() {
    return this.order
  }

  /** Очистить обьект информации о заказе */
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