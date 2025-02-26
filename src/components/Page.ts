import { IBodyHtmlElement, IPage } from "../types/Page";
import { ensureElement } from "../utils/utils";

/** Класс Элементов страницы */
export class BodyHtmlElement implements IBodyHtmlElement {
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

  constructor(
    body: HTMLElement
  ) { 
    this.body = body;
    this.modal = ensureElement<HTMLElement>('#modal-container', this.body);
    this.modalContent = ensureElement<HTMLElement>('.modal__content', this.modal);
    this.gallery = ensureElement<HTMLElement>('.gallery', this.body);
    this.buttonBasket = ensureElement<HTMLElement>('.header__basket', this.body);
    this.basketCounter = ensureElement<HTMLElement>('.header__basket-counter', this.body);
    this.cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog', this.body);
    this.cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview', this.body);
    this.cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket', this.body);
    this.basketTemplate = ensureElement<HTMLTemplateElement>('#basket', this.body);
    this.orderTemplate = ensureElement<HTMLTemplateElement>('#order', this.body);
    this.contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts', this.body);
    this.successTemplate = ensureElement<HTMLTemplateElement>('#success', this.body);
  }
}

/** Классс страницы */
export class Page extends BodyHtmlElement implements IPage {
  /** Body */
  body: HTMLElement;

  constructor(
    body: HTMLElement, 
  ) {
    super(body)
    this.body = document.body;
  }

  /** Заблокировать прокрутку страницы */
  disablePageScroll() {
    this.body.style.overflow = 'hidden';
  }

  /** Установить прокутку страницы */
  enablePageScroll() {
    this.body.style.overflow = 'auto';
  }
}

