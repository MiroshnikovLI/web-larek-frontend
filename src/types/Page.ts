export interface IBodyHtmlElement {
  /** Body */
  body: HTMLElement;

  /** Модальное окно */
  modal: HTMLElement;

  /** Контент модального окна */
  modalContent: HTMLElement;

  /** Элемент галерее страницы */
  gallery: HTMLElement;
  
  /** Кнопка корзины */
  buttonBasket: HTMLElement;

  /** Счетчик корзины */
  basketCounter: HTMLElement;

  /** Темплейт каталога карточек на главной страницы */
  cardCatalogTemplate: HTMLTemplateElement;

  /** Темплейт каталога товара */
  cardPreviewTemplate: HTMLTemplateElement;

  /** Темплейт товара в корзине */
  cardBasketTemplate: HTMLTemplateElement;

  /** Таплейт корзины */
  basketTemplate: HTMLTemplateElement;

  /** Теплейт формы оплаты */
  orderTemplate: HTMLTemplateElement;

  /** Темлейт формы контакт */
  contactsTemplate: HTMLTemplateElement;

  /** Темплейт уведомление о завершение покупки */
  successTemplate: HTMLTemplateElement;

}

export interface IPage extends IBodyHtmlElement {
  /** Body */
  body: HTMLElement;

  /** Заблокировать прокрутку страницы */
  disablePageScroll(): void

  /** Установить прокутку страницы */
  enablePageScroll(): void
}

