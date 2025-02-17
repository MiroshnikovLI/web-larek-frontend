import { IProduct } from "./Product"

/**
 * Класс котегории товара
 */
export interface ICotegoreCards {
  /**
   * Установить класс товара в соответствии с категорией
   */
  setClassCards(product: IProduct): string
}

/**
 * Класс Элементов карточки
 */
export interface ICardsElements extends ICotegoreCards {

  /**
   * Отображение на главное странице
   * Устонавливает данные товара в карточку на главной странице
   */
  renderCatologCards(product: IProduct): HTMLElement

  /**
   * Отображение отдельной карточки
   * Устонавливает данные товара в карточку в одиночном товара
   */
  renderCards(product: IProduct): HTMLElement

  /**
   * Возвращает HTMLElement карточки товара
   */
  getCard(): HTMLElement 

  /**
   *  Возвращает кнопку карточки
   */
  getButtonCard(): HTMLButtonElement
}

/**
 * Класс Элементов корзины
 */
export interface ICardsBasket extends ICardsElements {
  /**
   * Возвращает карточку товара корзины
   */
  getCardsBasketView(product: IProduct): HTMLElement

  /**
   * Возвращает Элемент индекса корзины
   */
  getIndexBasket(): HTMLElement
}

export interface ICard {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  addBasket: true | false;
}