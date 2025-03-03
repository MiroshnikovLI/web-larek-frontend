import { Model } from "../components/base/model";
import { IOrderForm } from "./Form";
import { IProduct } from "./Product";

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export interface IContactField {
  email: string;
  phone: string;
}

export interface IOrderField {
  payment: string;
  address: string;
}

export interface IAppState extends Model<IAppState> {

  /** Установить данные формы контакты */
  setContactField(field: keyof IContactField, value: string): void

  /** Установить данные формы ордер */
  setOrderField(field: keyof IOrderField, value: string): void

  /** Валидация данных формы контакты */
  validateContacts(): boolean

  /** Валидация данных формы ордер */
  validateOrder(): boolean

  /** Добавления продукта в корзину */
  set addProductBasket(product: IProduct)

  /** Удалить все продукты с корзины */
  deleteAllProducts(): void

  /** Получить количество товара в корзине */
  get productsQuantity(): number

  /** Получить полный список покупок */
  get allProducts(): IProduct[]

  /** Получить полную сумму корзины */
  get totalPrice(): number

  /** Удаление продукта с корзины */
  deleteProduct(product: IProduct): void

  /** Получение полного списка ID товара для отправки на сервер */
  get allIdProducts(): string[]

  /** Записать массив продуктов */
  setMassProduct(product: IProduct[]): void

  /** Получить массив продуктов */
  getMassProduct(): IProduct[]

  /** Получить обьект информации о заказе */
  get оrderArray(): IOrderArray;

  /** Очистить данные приложения */
  clearAllData(): void
}

export interface IOrderArray {
  items: string[],
  payment: string,
  total: number | null,
  address: string,
  email: string,
  phone: string,
};