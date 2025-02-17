/**
 * Класс информации о закахе
 */
export interface ICustomerInformation {
  /**
   * Получить массив заказа
   */
  getMassInfo(): IMassInfo

  /**
   * Установить информацию по строке
   */
  setInfo(info: string, value: string): void

  /**
   * Получить информацию по строке
   */
  getInfo(info: string): string

  /**
   * Очистить массив информации заказа
   */
  deleteInfo(): void
}

export interface IMassInfo {
  formOfPayment: string;
  address: string;
  email: string;
  phone: string;
}