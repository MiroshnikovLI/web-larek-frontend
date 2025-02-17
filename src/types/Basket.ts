import { IProduct } from "./Product"

/**
 * Класс корзины
 */
export interface IBasket {
  /**
   * Добавления продукта в корзину
   */
  setProductBasket(product: IProduct): void

  /**
   * Удаление продукта из корзины
   */
  deleteProduct(product: IProduct): void

  /**
   * Удалить все продукты с корзины
   */
  deleteAllProduct(): void

  /**
   * Получить количество товара в корзине
   */
  getLengthProduct(): number

  /**
   * Получить полный список покупок
   */
  getAllProduct(): IProduct[]

  /**
   * Получить полную сумму корзины
   */
  getPriceAll(): string

  /**
   * Получить лист корзины
   */
  getBasketList(): HTMLElement

  /**
   * Получить кнопку корзины
   */
  getBasketButton(): HTMLButtonElement

  /**
   * Получить Элемент цены корзины 
   */
  getPriceBasket(): HTMLElement

  /**
   * Получить корзину
   */
  getBasket(): HTMLElement

  /**
   * Очиста листа покупок
   */
  clearBasketList(): void
}
