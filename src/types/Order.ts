export interface IOrderArray {
  items: string[],
  payment: string,
  total: number,
  address: string,
  email: string,
  phone: string,
}

export interface IOrder {
  /** Массив информации */
  order: IOrderArray 

  /** Установить список ID продуктов */
  set items(product: string[])

  /** Установить информацию об оплате */
  set payment(value: string)

  /** Утановить общую сумму */
  set total(count: number)

  /** Установить адрес */
  set addres(ShippingAddress: string)

  /** Установить Email */
  set email(email: string)
  /** Установить номер телефона */
  set phone(phone: string)

  /** Получить массив информации */
  get оrderArray(): IOrderArray

  /** Очистить массив информации */
  clearOrderArray(): void
}